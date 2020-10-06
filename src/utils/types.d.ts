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