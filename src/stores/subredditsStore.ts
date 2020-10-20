import { observable, action, makeObservable, runInAction } from 'mobx';
import { persist } from 'mobx-persist';
import { HydratedStore, RedditPostClass, SubredditDataClass } from '../utils/classes';
import { services } from '../services';

class SubredditsStore extends HydratedStore {
  constructor() {
    super('SubredditsStore'); // Storage ID

    makeObservable(this, {
      all: observable,
      saved: observable,
      dict: observable,
      loading: observable,
      addSubreddit: action,
      removeSubreddit: action,
      getPostsForSubreddit: action,
      setLoading: action,
      addSaved: action,
      removeSaved: action,
    });
  }

  @persist('list') all: string[] = [];
  @persist('list', RedditPostClass) saved: RedditPost[] = [];
  @persist('map', SubredditDataClass) dict: Map<string, SubredditData> = new Map();
  loading = false;

  addSubreddit = async (subreddit: string) => {
    const ndx = this.all.findIndex(it => it === subreddit);

    if (ndx !== -1) {
      this.all.splice(ndx, 1);
    }

    this.all.unshift(subreddit);

    await this.getPostsForSubreddit(subreddit);
  }

  removeSubreddit = async (subreddit: string) => {
    const ndx = this.all.findIndex(it => it === subreddit);

    if (ndx !== -1) {
      this.all.splice(ndx, 1);
      this.dict.delete(subreddit);
    }
  }

  getPostsForSubreddit = async (subreddit: string) => {
    this.setLoading(true);

    let posts: RedditPost[] = [];
    try {
      const jsonResponse = await services.api.getSubredditPosts(subreddit);
      posts = jsonResponse.data.children.map(it => it.data);
    } catch (e) {
      console.log(e);
    }

    runInAction(() => this.dict.set(subreddit, { posts }));

    this.setLoading(false);
  }

  setLoading = (value: boolean) => this.loading = value;

  addSaved = async (s: RedditPost) => {
    this.saved.unshift(s);
  }

  removeSaved = async (p: RedditPost) => {
    const ndx = this.saved.findIndex(it => it.id === p.id);

    if (ndx !== -1) {
      this.saved.splice(ndx, 1);
    }
  }

  isPostInSaved = (p: RedditPost) => this.saved.findIndex(it => it.id === p.id) !== -1;
}

export default new SubredditsStore();