import React from 'react';
import {
  ListRenderItemInfo,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { FlatList } from 'react-native-gesture-handler';

import { useStores } from '../stores';
import Constants from '../utils/constants';
import useStyles from '../utils/useStyles';
import { useServices } from '../services';
import Post from '../components/Post';
import AppleStyleSwipeableRow from '../components/AppleStyleSwipeableRow';
import EmptyListComponent from '../components/EmptyListComponent';

const SavedScreen: NavigationFunctionComponent = observer(({
  componentId,
}) => {
  const { subreddits } = useStores();
  const { navigation } = useServices();
  const { styles } = useStyles(_styles);

  const openPost = (post: RedditPost) => () =>
    navigation.pushPost(componentId, { post })

  const removePost = (post: RedditPost) => () =>
    subreddits.removeSaved(post);

  const renderItem = ({ item }: ListRenderItemInfo<RedditPost>) => (
    <Post
      withSub
      item={item}
      onPress={openPost(item)}
      onDelete={removePost(item)}
    />
  );

  if (subreddits.saved.length === 0) {
    return <EmptyListComponent text={Constants.SavedScreen.EmptyListText} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={subreddits.saved.slice()}
        keyExtractor={it => it.id}
        style={styles.list}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
});

const _styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  list: {
    flex: 1,
  },
});

SavedScreen.options = props => ({
  topBar: {
    title: {
      text: Constants.ScreenTitles.SavedScreen,
    },
  },
});

export default SavedScreen;
