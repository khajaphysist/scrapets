import fetch from 'isomorphic-unfetch';
import { Collection, MongoClient } from 'mongodb';

const defaultUri = "mongodb://localhost:27017/crawlts";

interface Url<T extends string> {
    type: T,
    url: string
}

interface Data<T extends string, D> {
    type: T,
    data: D,
    key: string
}

interface Page<T extends string> {
    content: string, state: "fetching" | "fetched" | "not_fetched", url: Url<T>, createdAt: number
}

type Extractors<UT extends string, DT extends string, D> = { [key in UT]: (url: string, body: string) => { urls: Url<UT>[], data: Data<DT, D>[] } }

export class Scrape<UT extends string, DT extends string, D> {
    private extractors: Extractors<UT, DT, D>;
    private concurrency: number;

    constructor(extractors: Extractors<UT, DT, D>, concurrency: number) {
        this.extractors = extractors;
        this.concurrency = concurrency;
    }

    private scrape = async (url: Url<UT>, pageRepo: Collection<Page<UT>>, dataRepo: Collection<Data<DT, D>>) => {
        const page = await pageRepo.findOne({ url: { $eq: url } });
        const body = page && page.content && page.content.length > 0 && page.state === 'fetched' ?
            page.content
            :
            await (async () => {
                await pageRepo.updateOne({ url: { $eq: url } }, { $set: { url, content: '', state: "fetching" } }, { upsert: true })
                const data = await fetch(url.url).then(r => r.status === 200 ? r.text() : "").catch(e => console.log(e));
                console.log("accessed: " + url.url);
                if (data) {
                    await pageRepo.updateOne({ url: { $eq: url } }, { $set: { url, content: data, state: 'fetched' } }, { upsert: true })
                } else {
                    await pageRepo.updateOne({ url: { $eq: url } }, { $set: { url, content: '', state: "not_fetched" } }, { upsert: true })
                }
                return data
            })();

        if (body) {
            const { data, urls } = this.extractors[url.type](url.url, body)
            await Promise.all([
                ...urls.map(async (u) => {
                    const exist = await pageRepo.findOne({ url: { $eq: u } });
                    if (!exist) {
                        await pageRepo.updateOne({ url: { $eq: u } }, { $set: { url: u, content: '', state: "not_fetched", createdAt: Date.now() } }, { upsert: true })
                    }
                }),
                ...data.map(async (d) => {
                    const exist = await dataRepo.findOne({ key: d.key });
                    if (!exist) {
                        await dataRepo.updateOne({ key: d.key }, { $set: { data: d.data, key: d.key, type: d.type } }, { upsert: true })
                    }
                })
            ]);
        }
    }

    public async startScraping(url: Url<UT>) {
        const client = await MongoClient.connect(defaultUri, { useNewUrlParser: true });
        const pageRepo = client.db().collection("pages");
        const dataRepo = client.db().collection("data");
        await this.scrape(url, pageRepo, dataRepo)
        while (true) {
            const cursor = await pageRepo.find({ content: '' }, { sort: { createdAt: 1 }, limit: this.concurrency });
            const items: Page<UT>[] = [];
            while (await cursor.hasNext()) {
                const next = await cursor.next();
                if (next) {
                    items.push(next)
                }
            }
            if (items.length === 0) {
                break;
            }
            await Promise.all(items.map(i => this.scrape(i.url, pageRepo, dataRepo)));
        }
        await client.close();
    }
}