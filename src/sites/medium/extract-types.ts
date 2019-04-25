export interface User {
    userId: string
    username: string
    name: string
    bio: string
    createdAt: number
    imageId: string
}

export interface Post {
    id: string
    creatorId: string
    title: string
    slug: string
    createdAt: number
    content: string
}