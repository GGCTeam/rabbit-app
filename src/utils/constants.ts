const prefix = 'rabbitapp';
class Contants {
  ScreenNames = {
    SubredditsScreen: `${prefix}.SubredditsScreen`,
    SavedScreen: `${prefix}.SavedScreen`,
    SettingsScreen: `${prefix}.SettingsScreen`,
    SubredditPostsScreen: `${prefix}.SubredditPostsScreen`,
    PostScreen: `${prefix}.PostScreen`,

    TextInputPrompt: `${prefix}.TextInputPrompt`,
  }

  BottomTabsTitles = {
    tab1: 'Subreddits',
    tab2: 'Saved',
    tab3: 'Settings',
  }

  ScreenTitles = {
    SubredditsScreen: 'Subreddits',
    SavedScreen: 'Saved',
    SettingsScreen: 'Settings',
  }

  // Styles
  colors = {
    main: '#4d7198',
    black: '#000',
    white: '#fff',
    lightGrey: '#b2bec3',
    grey: '#636e72',
    blue: '#4d7198',
    yellow: '#fbc531',
  }
  sizes = {
    s: 8,
    m: 16,
    l: 32,
    xl: 40,
  }
}

export default new Contants();