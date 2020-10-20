import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet, Share, Linking
} from 'react-native';
import { observer } from 'mobx-react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import Rate from 'react-native-rate';
import * as MailComposer from 'expo-mail-composer';
import { getReadableVersion } from 'react-native-device-info';

import { useStores } from '../stores';
import Constants from '../utils/constants';
import useStyles from '../utils/useStyles';
import { ButtonAction, ButtonTitle } from '../components/Button';
import { Section } from '../components/Section';

const SettingsScreen: NavigationFunctionComponent = observer(({
  componentId,
}) => {
  const { } = useStores();
  const { styles } = useStyles(_styles);

  const shareApp = () =>
    Share.share({ url: Constants.AppUrl });

  const rateApp = () =>
    Rate.rate(Constants.RateAppConfig, s => {});

  const openSupport = async () =>
    (await MailComposer.isAvailableAsync())
      ? MailComposer.composeAsync(Constants.MailComposerOptions)
      : console.log('MailComposer is not available');

  const openGithub = () =>
    Linking.openURL(Constants.GithubUrl);

  const openArticle = () =>
    Linking.openURL(Constants.ArticleUrl);

  const openWebsite = () =>
    Linking.openURL(Constants.BaseUrl);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Section header={'General'}>
          <ButtonAction
            title={'Share'}
            icon={'ios-share-outline'}
            onPress={shareApp}
          />
          <ButtonAction
            title={'Rate'}
            icon={'star-outline'}
            onPress={rateApp}
          />
          <ButtonAction
            title={'Support'}
            icon={'mail-unread-outline'}
            onPress={openSupport}
          />
        </Section>

        <Section header={'Links'}>
          <ButtonAction
            title={'Repository'}
            icon={'logo-github'}
            onPress={openGithub}
          />
          {/* <ButtonAction
            title={'Article'}
            icon={'newspaper-outline'}
            onPress={openArticle}
          /> */}
          <ButtonAction
            title={'Website'}
            icon={'ios-earth-outline'}
            onPress={openWebsite}
          />
        </Section>

        <Section header={'About'}>
          <ButtonAction
            disabled
            title={`Version: ${getReadableVersion()}`}
            icon={'information-circle-outline'}
          />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
});

const _styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
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
