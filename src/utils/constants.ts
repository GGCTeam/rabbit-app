import { MailComposerOptions } from 'expo-mail-composer';
import { IConfig } from 'react-native-rate';

const prefix = 'rabbitapp';
class Contants {
  // Navigation
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

  // Global
  AppleAppId = '----'; // put app id after create the app at appstoreconnect.apple.com
  GooglePackageName = 'io.batyr.rabbitapp';
  AppEmail = 'say_hi@batyr.io';
  BaseUrl = 'https://rabbitapp.batyr.io';
  AppUrl = this.BaseUrl + '/app';
  ArticleUrl = this.BaseUrl + '/article';
  GithubUrl = this.BaseUrl + '/github'
  RateAppConfig: IConfig = {
    AppleAppID: this.AppleAppId,
    GooglePackageName: this.GooglePackageName,
    preferInApp: true,
    openAppStoreIfInAppFails: true,
  };
  MailComposerOptions: MailComposerOptions = {
    recipients: [this.AppEmail],
    subject: '[RABBIT APP] Question/Request/Other',
    body: 'Please, describe your question/request/something else? 🙂\n\n',
  }

  // Screens' contants
  SubredditsScreen = {
    addButton: {
      id: 'add_button',
      text: 'Add',
    },
    EmptyListText: `It seems like you haven't added any subreddits yet.\n\nTo do so, click on the button in the top right corner.`,
  }

  SavedScreen = {
    EmptyListText: `It seems like you don't have any saved posts.`,
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