
export const generateRedditUserString = (user: string) => `u/${user}`;

export const generateSubredditString = (sub: string) => `r/${sub}`;

export const generateRedditPostUrl = (permalink: string) => `https://reddit.com${permalink}`;

export const generateCommentsString = (comments: number) => `${comments} comment${comments !== 1 ? 's' : ''}`;

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));