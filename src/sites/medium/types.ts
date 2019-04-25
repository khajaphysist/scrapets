// Generated by https://quicktype.io

export interface Root {
    references: References;
    paging: Paging;
    activeTab: string;
    tag: Tag;
    hasTopWriters: boolean;
    relatedTags: Tag[];
    parentTags: any[];
    archiveIndex: ArchiveIndex;
    streamItems: StreamItem[];
}

export interface ArchiveIndex {
    timeBucket: Bucket;
    yearlyBuckets: Bucket[];
    monthlyBuckets: Bucket[];
    dailyBuckets: Bucket[];
}

export interface Bucket {
    year: string;
    month: string;
    day: string;
    hasStories: boolean;
}

export interface Paging {
}

export interface References {
    Collection: { [key: string]: Collection };
    User: { [key: string]: User };
    Post: { [key: string]: Post };
}

export interface Collection {
    id: string;
    name: string;
    slug: string;
    tags: string[];
    creatorId: string;
    description: string;
    shortDescription: string;
    image: AmpLogo;
    metadata: CollectionMetadata;
    virtuals: CollectionVirtuals;
    logo: AmpLogo;
    twitterUsername: string;
    facebookPageName: string;
    publicEmail: string;
    sections: CollectionSections[];
    tintColor: string;
    lightText: boolean;
    favicon: AmpLogo;
    colorPalette: CollectionColorPalette;
    navItems: any[];
    colorBehavior: number;
    instantArticlesState: number;
    acceleratedMobilePagesState: number;
    ampLogo: AmpLogo;
    header: CollectionHeader;
    type: string;
}

export interface AmpLogo {
    imageId: string;
    filter: string;
    backgroundSize: string;
    originalWidth: number;
    originalHeight: number;
    strategy: Strategy;
    height: number;
    width: number;
}

export enum Strategy {
    Resample = "resample",
}

export interface CollectionColorPalette {
    defaultBackgroundSpectrum: Spectrum;
    tintBackgroundSpectrum: Spectrum;
    highlightSpectrum: Spectrum;
}

export interface Spectrum {
    colorPoints: ColorPoint[];
    backgroundColor: string;
}

export interface ColorPoint {
    color: string;
    point: number;
}

export interface CollectionHeader {
    title: string;
    description: string;
    backgroundImage: Image;
    logoImage: Paging;
    alignment: number;
    layout: number;
}

export interface Image {
    id: string;
    originalWidth: number;
    originalHeight: number;
    focusPercentX?: number;
    focusPercentY?: number;
    isFeatured?: boolean;
}

export interface CollectionMetadata {
    followerCount: number;
    activeAt: number;
}

export interface CollectionSections {
    type: number;
    collectionHeaderMetadata?: CollectionHeader;
    postListMetadata?: PostListMetadata;
}

export interface PostListMetadata {
    source: number;
    layout: number;
    number: number;
    postIds: string[];
    sectionHeader?: string;
    tagSlug?: string;
}

export interface CollectionVirtuals {
    permissions: { [key: string]: boolean };
    isSubscribed: boolean;
    isNewsletterSubscribed: boolean;
    isEnrolledInHightower: boolean;
    isEligibleForHightower: boolean;
}

export interface CoverImage {
    id: string;
    originalWidth?: number;
    originalHeight?: number;
    alt?: string;
    isFeatured?: boolean;
    unsplashPhotoId?: string;
}

export interface PromoMetadata {
    sectionHeader: string;
    promoId: string;
}

export interface Post {
    id: string;
    versionId: string;
    creatorId: string;
    homeCollectionId: string;
    title: string;
    detectedLanguage: string;
    latestVersion: string;
    latestPublishedVersion: string;
    hasUnpublishedEdits: boolean;
    latestRev: number;
    createdAt: number;
    updatedAt: number;
    acceptedAt: number;
    firstPublishedAt: number;
    latestPublishedAt: number;
    vote: boolean;
    experimentalCss: string;
    displayAuthor: string;
    content: PostContent;
    virtuals: PostVirtuals;
    coverless: boolean;
    slug: string;
    translationSourcePostId: string;
    translationSourceCreatorId: string;
    isApprovedTranslation: boolean;
    inResponseToPostId: string;
    inResponseToRemovedAt: number;
    isTitleSynthesized: boolean;
    allowResponses: boolean;
    importedUrl: string;
    importedPublishedAt: number;
    visibility: number;
    uniqueSlug: string;
    previewContent: PostPreviewContent;
    license: number;
    inResponseToMediaResourceId: string;
    canonicalUrl: string;
    approvedHomeCollectionId: string;
    newsletterId: string;
    webCanonicalUrl: string;
    mediumUrl: string;
    migrationId: string;
    notifyFollowers: boolean;
    notifyTwitter: boolean;
    notifyFacebook: boolean;
    responseHiddenOnParentPostAt: number;
    isSeries: boolean;
    isSubscriptionLocked: boolean;
    seriesLastAppendedAt: number;
    audioVersionDurationSec: number;
    sequenceId: string;
    isNsfw: boolean;
    isEligibleForRevenue: boolean;
    isBlockedFromHightower: boolean;
    deletedAt: number;
    lockedPostSource: number;
    hightowerMinimumGuaranteeStartsAt: number;
    hightowerMinimumGuaranteeEndsAt: number;
    featureLockRequestAcceptedAt: number;
    mongerRequestType: number;
    layerCake: number;
    socialTitle: string;
    socialDek: string;
    editorialPreviewTitle: string;
    editorialPreviewDek: string;
    curationEligibleAt: number;
    primaryTopicId: string;
    type: string;
}

export interface PostContent {
    postDisplay: PostDisplay;
    metaDescription: string;
}

export interface PostDisplay {
    coverless: boolean;
}

export interface PostPreviewContent {
    bodyModel: BodyModel;
    isFullContent: boolean;
    subtitle: string;
}

export interface BodyModel {
    paragraphs: Paragraph[];
    sections: BodyModelSection[];
}

export interface Paragraph {
    name: string;
    type: number;
    text: string;
    markups?: Markup[];
    alignment?: number;
    layout?: number;
    metadata?: CoverImage;
}

export interface Markup {
    type: number;
    start: number;
    end: number;
    anchorType?: number;
    userId?: string;
    href?: string;
    title?: string;
    rel?: string;
}

export interface BodyModelSection {
    startIndex: number;
}

export interface PostVirtuals {
    statusForCollection?: string;
    allowNotes: boolean;
    previewImage: AmpLogo;
    wordCount: number;
    imageCount: number;
    readingTime: number;
    subtitle: string;
    userPostRelation?: UserPostRelation;
    publishedInCount?: number;
    usersBySocialRecommends: any[];
    noIndex: boolean;
    recommends: number;
    isBookmarked: boolean;
    tags: Tag[];
    socialRecommendsCount: number;
    responsesCreatedCount: number;
    links: PostLinks;
    isLockedPreviewOnly: boolean;
    takeoverId: string;
    metaDescription: string;
    totalClapCount: number;
    sectionCount: number;
    readingList: number;
    topics: Topic[];
}

export interface PostLinks {
    entries: LinkEntry[];
    version: string;
    generatedAt: number;
}

export interface LinkEntry {
    url: string;
    alts: Alt[];
    httpStatus?: number;
}

export interface Alt {
    type: number;
    url: string;
}

export interface Tag {
    slug: string;
    name: string;
    postCount: number;
    metadata: TagMetaData;
    type: TagType;
}

export interface TagMetaData {
    postCount: number;
    coverImage: CoverImage;
}

export enum TagType {
    Tag = "Tag",
}

export interface Topic {
    topicId: string;
    slug: string;
    createdAt: number;
    deletedAt: number;
    image: CoverImage;
    name: string;
    description: string;
    relatedTopics: any[];
    visibility: number;
    relatedTags: any[];
    type: TopicType;
}

export enum TopicType {
    Topic = "Topic",
}

export interface UserPostRelation {
    userId: string;
    postId: string;
    readAt: number;
    readLaterAddedAt: number;
    votedAt: number;
    collaboratorAddedAt: number;
    notesAddedAt: number;
    subscribedAt: number;
    lastReadSectionName: string;
    lastReadVersionId: string;
    lastReadAt: number;
    lastReadParagraphName: string;
    lastReadPercentage: number;
    viewedAt: number;
    presentedCountInResponseManagement: number;
    clapCount: number;
    seriesUpdateNotifsOptedInAt: number;
    queuedAt: number;
    seriesFirstViewedAt: number;
    presentedCountInStream: number;
    seriesLastViewedAt: number;
    audioProgressSec: number;
}

export interface User {
    userId: string;
    name: string;
    username: string;
    createdAt: number;
    imageId: string;
    backgroundImageId: string;
    bio: string;
    twitterScreenName: string;
    facebookAccountId: string;
    allowNotes: number;
    mediumMemberAt: number;
    isNsfw: boolean;
    isWriterProgramEnrolled: boolean;
    isQuarantined: boolean;
    type: UserType;
}

export enum UserType {
    User = "User",
}

export interface StreamItem {
    createdAt: number;
    postPreview: PostPreview;
    randomId: string;
    itemType: ItemType;
    type: StreamItemType;
}

export enum ItemType {
    PostPreview = "postPreview",
}

export interface PostPreview {
    postId: string;
}

export enum StreamItemType {
    StreamItem = "StreamItem",
}