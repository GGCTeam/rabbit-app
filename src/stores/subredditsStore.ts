import { observable, action, makeObservable, runInAction } from 'mobx';
import { persist } from 'mobx-persist';
import { services } from '../services';

class RedditPost {
  @persist @observable id = '';
  @persist @observable title = '';
  @persist @observable url = '';
  @persist @observable permalink = '';
  @persist @observable author = '';
  @persist @observable ups = 0;
  @persist @observable num_comments = 0;
  @persist @observable subreddit = '';
  @persist @observable created_utc = 0;
}

// tslint:disable-next-line: max-classes-per-file
class SubredditData {
  @persist('list', RedditPost) @observable posts = [];
}

// tslint:disable-next-line: max-classes-per-file
class SubredditsStore {
  STORAGE_ID = 'SubredditsStore';
  constructor() {
    makeObservable(this, {
      all: observable,
      saved: observable,
      dict: observable,
      loading: observable,
      addSubreddit: action,
      removeSubreddit: action,
      getPostsForSubreddit: action,
      addSaved: action,
      removeSaved: action,
    });
  }

  @persist('list') all: string[] = [];
  @persist('list', RedditPost) saved: RedditPost[] = [];
  @persist('map', SubredditData) dict = {};
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
      delete this.dict[subreddit];
    }
  }

  getPostsForSubreddit = async (subreddit: string) => {
    this.loading = true

    let posts: RedditPost[] = [];
    try {
      const jsonResponse = await services.api.getSubredditPosts(subreddit);
      posts = jsonResponse.data.children.map(it => it.data);
    } catch (e) {
      console.log(e);
    }

    runInAction(() => {
      this.dict = {
        ...this.dict,
        [subreddit]: {
          ...this.dict[subreddit],
          posts,
        }
      };
    });

    this.loading = false
  }

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