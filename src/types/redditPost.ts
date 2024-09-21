export interface RedditPost {
    id: string;
    permalink: string;
    subreddit: string,
    thumbnail: string,
    thumbnail_height: number,
    thumbnail_width: number,
    title:  string,
    upvote: number
}