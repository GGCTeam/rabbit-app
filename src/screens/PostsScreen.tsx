import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import { observer } from 'mobx-react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { FlatList } from 'react-native-gesture-handler';

import { useStores } from '../stores';
import useStyles from '../utils/useStyles';
import { useServices } from '../services';
import Post from '../components/Post';
import { generateSubredditString } from '../utils/helpMethods';


const PostsScreen: NavigationFunctionComponent<PostsScreenProps> = observer(({
  componentId,
  subreddit,
}) => {
  const { subreddits } = useStores();
  const { navigation } = useServices();
  const { styles } = useStyles(_styles);

  const { posts } = subreddits.dict[subreddit] as SubredditData || [];

  useEffect(() => {
    loadPosts();
  }, [componentId]);

  const loadPosts = async () =>
    await subreddits.getPostsForSubreddit(subreddit);

  const openPost = (post: RedditPost) => async () =>
    navigation.pushPost(componentId, { post })

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={it => it.id}
        style={styles.list}
        refreshing={subreddits.loading}
        onRefresh={loadPosts}
        refreshControl={<RefreshControl refreshing={subreddits.loading} />}
        renderItem={({ item }) => <Post item={item} onPress={openPost(item)} /> }
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

PostsScreen.options = props => ({
  topBar: {
    title: {
      text: generateSubredditString(props.subreddit),
    },
  },
});

export default PostsScreen;
