import { observable } from 'mobx';
import { persist } from 'mobx-persist';

import { hydrateMobX } from './helpMethods';

export class HydratedStore implements IHydratedStore {
  STORAGE_ID: string = '';
  hydrate = async () => this.STORAGE_ID && await hydrateMobX(this.STORAGE_ID, this);

  constructor(storageId: string) {
    this.STORAGE_ID = storageId;
  }
}

// tslint:disable-next-line: max-classes-per-file
export class RedditPostClass {
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
export class SubredditDataClass {
  @persist('list', RedditPostClass) @observable posts = [];
}