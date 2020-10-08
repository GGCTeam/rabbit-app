import React, { useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet, ActivityIndicator, Share, Linking
} from 'react-native';
import { observer, useLocalObservable } from 'mobx-react';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { WebView } from 'react-native-webview';

import { stores, useStores } from '../stores';
import Constants from '../utils/constants';
import useStyles from '../utils/useStyles';
import { generateRedditPostUrl, generateRedditUserString } from '../utils/helpMethods';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist/hooks';
import { ButtonToolbar } from '../components/Button';

const PostScreen: NavigationFunctionComponent<PostScreenProps> = observer(({
  componentId,
  post,
}) => {
  const { subreddits } = useStores();
  const { styles, theme } = useStyles(_styles);
  const postUrl = generateRedditPostUrl(post.permalink);

  const store = useLocalObservable(() => ({
    loading: true,
    finishLoading() {
      store.loading = false;
    },
  }));

  useNavigationButtonPress(() => { savePost() }, componentId, Constants.PostScreen.saveButton.id);
  useNavigationButtonPress(() => { removePost() }, componentId, Constants.PostScreen.removeButton.id);

  const savePost = async () => {
    subreddits.addSaved(post);

    Navigation.mergeOptions(componentId, { topBar: { rightButtons: [Constants.PostScreen.removeButton] } });
  }

  const removePost = async () => {
    subreddits.removeSaved(post);

    Navigation.mergeOptions(componentId, { topBar: { rightButtons: [Constants.PostScreen.saveButton] } });
  }

  const shareUrl = () =>
    Share.share({ url: postUrl });

  const openUrl = () =>
    Linking.openURL(postUrl);

  const generateIndicator = () => (
    <ActivityIndicator
      size={'small'}
      style={styles.indicator}
      color={theme.colors.main}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webviewAndActionsContainer}>
        <WebView
          source={{ uri: postUrl }}
          onLoadEnd={store.finishLoading}
          androidHardwareAccelerationDisabled={true}
        />
        <View style={styles.toolbar}>
          <ButtonToolbar
            title={'Share'}
            onPress={shareUrl}
          />
          { store.loading ? generateIndicator() : undefined }
          <ButtonToolbar
            title={'Open in browser'}
            onPress={openUrl}
          />
        </View>
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
  webviewAndActionsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.bg,
  },
  indicator: {
    margin: 8,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    color: theme.colors.main,
    margin: 12,
    fontSize: 18,
  }
});

PostScreen.options = props => ({
  topBar: {
    title: {
      text: props.post.title,
    },
    subtitle: {
      text: generateRedditUserString(props.post.author),
    },
    rightButtons: [
      stores.subreddits.isPostInSaved(props.post)
        ? Constants.PostScreen.removeButton
        : Constants.PostScreen.saveButton
    ]
  },
});

export default PostScreen;
