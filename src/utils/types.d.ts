interface IStore {
  STORAGE_ID: string;
}

interface IService {
  init: () => Promise<void>;
}

type ThemeNameType = 'dark' | 'light';

type ThemeType = {
  colors: any;
  sizes: any;
}

type ThemesType = {
  [key in ThemeNameType]: ThemeType;
};

type ThemedStylesFuncType<T> = (theme: ThemeType) => T;

type UseStylesOptionsType = {
  normalize?: boolean;
  darkmode?: boolean;
}

type RedditJsonResponse = {
  kind: string;
  data: RedditJsonResponseData;
}

type RedditJsonResponseData = {
  modhash: string;
  before: string;
  after: string;
  dist: number;
  children: RedditJsonResponseDataChild[];
}

type RedditJsonResponseDataChild = {
  kind: string;
  data: RedditPost;
}

type RedditPost = {
  id: string;
  title: string;
  url: string;
  permalink: string;
  author: string;
  ups: number;
  created_utc: number;
}

type SubredditData = {
  posts: RedditPost[];
}

type SubredditPostsScreenProps = {
  subreddit: string;
}

type PostScreenProps = {
  post: RedditPost;
}