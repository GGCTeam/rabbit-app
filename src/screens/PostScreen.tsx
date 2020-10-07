import React, { useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet, ActivityIndicator
} from 'react-native';
import { observer, useLocalObservable } from 'mobx-react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { WebView } from 'react-native-webview';

import { stores, useStores } from '../stores';
import Constants from '../utils/constants';
import useStyles from '../utils/useStyles';
import { generateRedditPostUrl, generateRedditUserString } from '../utils/helpMethods';

const PostScreen: NavigationFunctionComponent<PostScreenProps> = observer(({
  componentId,
  post,
}) => {
  const { } = useStores();
  const styles = useStyles(_styles);

  useEffect(() => {
    setTimeout(store.showContent, 250); // mostly problem on android
  }, [componentId]);

  const store = useLocalObservable(() => ({
    canShowcontent: false, // fix for android, to correctly show webview
    loading: true,
    finishLoading() {
      store.loading = false;
    },
    showContent() {
      store.canShowcontent = true;
    },
  }));

  return (
    <SafeAreaView style={styles.container}>
      {
        store.canShowcontent
          ? (
            <View style={styles.webViewContainer}>
              { store.loading ? <ActivityIndicator /> : undefined }
              <WebView
                source={{ uri: generateRedditPostUrl(post.permalink) }}
                onLoadEnd={store.finishLoading}
              />
            </View>
          )
          : undefined
      }
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
  webViewContainer: {
    width: '100%',
    height: '100%',
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
    backButton: {
      title: '',
    }
  },
});

export default PostScreen;
