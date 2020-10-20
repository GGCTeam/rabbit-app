class ApiService implements IService {
  init = async () => { }

  getSubredditPosts = async (subreddit: string): Promise<RedditJsonResponse> => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    return response.json();
  }
}

export default new ApiService();