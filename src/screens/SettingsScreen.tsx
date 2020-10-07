import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { useStores } from '../stores';
import Constants from '../utils/constants';
import useStyles from '../utils/useStyles';

const SettingsScreen: NavigationFunctionComponent = observer(({
  componentId,
}) => {
  const { } = useStores();
  const { styles } = useStyles(_styles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.counterContainer}>
        <Text style={styles.text}>
          { 'About' }
        </Text>
      </View>
    </SafeAreaView>
  );
});

const _styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bg,
  },
  counterContainer: {
    padding: theme.sizes.s,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 64,
    margin: theme.sizes.s,
    textAlign: 'center',
    color: theme.colors.text,
  },
});

SettingsScreen.options = props => ({
  topBar: {
    title: {
      text: Constants.ScreenTitles.SettingsScreen,
    },
  },
});

export default SettingsScreen;
