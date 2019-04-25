import { Scrape } from './scrape';
import { Post, User } from './sites/medium/extract-types';
import { Root } from './sites/medium/types';

type URLTypes = "tag" | "year" | "month" | "day";
type DataTypes = "post_summary" | "user" | "tag";

const getCDataJson = (body: string): Root => {
    const cDataContent = body.substring(body.lastIndexOf("<![CDATA[") + 9, body.lastIndexOf("]]"))
        .replace(/\\x../gi, (match) => String.fromCharCode(parseInt(match.substr(2, 2), 16)));
    return JSON.parse(cDataContent.substring(cDataContent.indexOf("{"), cDataContent.lastIndexOf("}") + 1));
}

const scrape = new Scrape<URLTypes, DataTypes, Post | User>(
    {
        tag: (url, body) => {
            const data = getCDataJson(body)
            const urls = data.archiveIndex.yearlyBuckets.filter(b => b.hasStories)
                .map(b => ({ type: "year" as const, url: url + b.year + "/" }))

            return { data: [], urls };
        },
        year: (url, body) => {
            const data = getCDataJson(body)
            const urls = data.archiveIndex.monthlyBuckets.filter(b => b.hasStories)
                .map(b => ({ type: "month" as const, url: url + b.month + "/" }))
            return { data: [], urls };
        },
        month: (url, body) => {
            const data = getCDataJson(body)
            const urls = data.archiveIndex.dailyBuckets.filter(b => b.hasStories)
                .map(b => ({ type: "day" as const, url: url + b.day + "/" }))
            return { data: [], urls };
        },
        day: (url, body) => {
            const data: Root = getCDataJson(body)
            const users = Object.values(data.references.User).filter(u => u.type === "User").map(({ userId, username, name, bio, createdAt, imageId }) => ({ userId, username, name, bio, createdAt, imageId }))
            const posts = Object.values(data.references.Post).filter(p => p.type === "Post" && p.detectedLanguage === "en")
                .map(({ id, creatorId, title, slug, firstPublishedAt, previewContent }) =>
                    ({ id, creatorId, title, slug, createdAt: firstPublishedAt, content: previewContent.bodyModel.paragraphs.map(p => p.text).join(" ") }))
            return {
                data: [
                    ...users.map(u => ({ type: 'user' as const, data: u, key: u.userId })),
                    ...posts.map(p => ({ type: 'post_summary' as const, data: p, key: p.id }))
                ],
                urls: []
            };
        }
    },
    10
);

scrape.startScraping({ type: 'tag', url: "https://medium.com/tag/javascript/archive/" })