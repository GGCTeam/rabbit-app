import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'mobx-persist';

export const hydrateMobX = create({ storage: AsyncStorage, debounce: 500, });

export const generateRedditUserString = (user: string) => `u/${user}`;

export const generateSubredditString = (sub: string) => `r/${sub}`;

export const generateRedditPostUrl = (permalink: string) => `https://reddit.com${permalink}`;

export const generateCommentsString = (comments: number) => `${comments} comment${comments !== 1 ? 's' : ''}`;

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const kFormatter = (num: number) => Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);