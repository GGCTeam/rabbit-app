const prefix = 'rabbitapp';
class Contants {
  ScreenNames = {
    SubredditsScreen: `${prefix}.SubredditsScreen`,
    SavedScreen: `${prefix}.SavedScreen`,
    SettingsScreen: `${prefix}.SettingsScreen`,
    PostsScreen: `${prefix}.PostsScreen`,
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

  SubredditsScreen = {
    addButton: {
      id: 'add_button',
      text: 'Add',
    },
  }

  PostScreen = {
    saveButton: {
      id: 'save_button',
      text: 'Save',
    },
    removeButton: {
      id: 'remove_button',
      text: 'Remove',
    },
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
    red: '#dd2c00',
  }
  sizes = {
    s: 8,
    m: 16,
    l: 32,
    xl: 40,
  }
}

export default new Contants();