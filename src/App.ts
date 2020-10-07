import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Constants from './utils/constants';

import SubredditsScreen from './screens/SubredditsScreen';
import SavedScreen from './screens/SavedScreen';
import SettingsScreen from './screens/SettingsScreen';
import SubredditPostsScreen from './screens/SubredditPostsScreen';
import Alert from './screens/Alert';

import { withStoresProvider, hydrateStores } from './stores';
import { withServicesProvider, initServices } from './services';
import { setOptionsForUseStyles } from './utils/useStyles';

const Screens = new Map<string, React.FC<any>>();

Screens.set(Constants.ScreenNames.SubredditsScreen, SubredditsScreen);
Screens.set(Constants.ScreenNames.SavedScreen, SavedScreen);
Screens.set(Constants.ScreenNames.SettingsScreen, SettingsScreen);
Screens.set(Constants.ScreenNames.SubredditPostsScreen, SubredditPostsScreen);
Screens.set('alert', Alert);

// Register screens
Screens.forEach((C, key) => {
  Navigation.registerComponent(
    key,
    () =>
      gestureHandlerRootHOC(
        withStoresProvider(
          withServicesProvider(C))),
    () => C,
  );
});

// Here some global listeners could be placed
// ...

export const startApp = async () => {
  // rehydrate stores
  await hydrateStores();

  // init services
  await initServices();

  // getting icons for tabs as they have to be as image sources
  const [tab1, tab2, tab3] = await Promise.all([
    Ionicons.getImageSource('layers-outline', 25),
    Ionicons.getImageSource('bookmarks-outline', 25),
    Ionicons.getImageSource('settings-outline', 25),
  ]);
  const [tab1Selected, tab2Selected, tab3Selected] = await Promise.all([
    Ionicons.getImageSource('layers', 25),
    Ionicons.getImageSource('bookmarks', 25),
    Ionicons.getImageSource('settings', 25),
  ]);

  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [{
          stack: {
            children: [{
              component: {
                name: Constants.ScreenNames.SubredditsScreen,
              },
            }],
            options: {
              bottomTab: {
                text: Constants.BottomTabsTitles.tab1,
                icon: tab1,
                selectedIcon: tab1Selected,
                iconColor: Constants.colors.blue,
                textColor: Constants.colors.blue,
                selectedIconColor: Constants.colors.blue,
                selectedTextColor: Constants.colors.blue,
              },
            },
          },
        }, {
          stack: {
            children: [{
              component: {
                name: Constants.ScreenNames.SavedScreen,
              },
            }],
            options: {
              bottomTab: {
                text: Constants.BottomTabsTitles.tab2,
                icon: tab2,
                selectedIcon: tab2Selected,
                iconColor: Constants.colors.blue,
                textColor: Constants.colors.blue,
                selectedIconColor: Constants.colors.blue,
                selectedTextColor: Constants.colors.blue,
              },
            },
          },
        }, {
          stack: {
            children: [{
              component: {
                name: Constants.ScreenNames.SettingsScreen,
              },
            }],
            options: {
              bottomTab: {
                text: Constants.BottomTabsTitles.tab3,
                icon: tab3,
                selectedIcon: tab3Selected,
                iconColor: Constants.colors.blue,
                textColor: Constants.colors.blue,
                selectedIconColor: Constants.colors.blue,
                selectedTextColor: Constants.colors.blue,
              },
            },
          },
        }],
      },
    },
  });
};
