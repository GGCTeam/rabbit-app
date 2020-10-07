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
      dict: observable,
      loading: observable,
      addSubreddit: action,
      removeSubreddit: action,
      getPostsForSubreddit: action,
    });
  }

  @persist('list') @observable all: string[] = [];
  @persist('map', SubredditData) @observable dict = {};
  @observable loading = false;

  @action addSubreddit = async (subreddit: string) => {
    const ndx = this.all.findIndex(it => it === subreddit);

    if (ndx !== -1) {
      runInAction(() => this.all.splice(ndx, 1));
      // this.all.splice(ndx, 1);
    }

    runInAction(() => this.all.unshift(subreddit));
    // this.all.unshift(subreddit);

    await this.getPostsForSubreddit(subreddit);
  }

  @action removeSubreddit = async (subreddit: string) => {
    const ndx = this.all.findIndex(it => it === subreddit);

    if (ndx !== -1) {
      this.all.splice(ndx, 1);
      delete this.dict[subreddit];
    }
  }

  @action getPostsForSubreddit = async (subreddit: string) => {
    runInAction(() => this.loading = true);

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

    runInAction(() => this.loading = false);
  }
}

export default new SubredditsStore();