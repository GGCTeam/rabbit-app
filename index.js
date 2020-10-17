import 'expo-asset';
import 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { registerRootComponent } from 'expo';

import { startApp } from './src/App';
import ExpoApp from './src/screens/ExpoApp';

registerRootComponent(ExpoApp); // to make it work with Expo and RNN
Navigation.events().registerAppLaunchedListener(() => {
    startApp();
});