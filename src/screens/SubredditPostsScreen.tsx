import React, { useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    RefreshControl,
    Linking
} from 'react-native';
import { observer } from 'mobx-react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { useStores } from '../stores';
import Constants from '../utils/constants';
import useStyles from '../utils/useStyles';
import { generateRedditUserString } from '../utils/helpMethods';
import { useServices } from '../services';


const SubredditPostsScreen: NavigationFunctionComponent<SubredditPostsScreenProps> = observer(({
  componentId,
  subreddit,
}) => {
  const { subreddits } = useStores();
  const { navigation } = useServices();
  const styles = useStyles(_styles);

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
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity onPress={openPost(item)}>
                <View style={styles.buttonContainer}>
                <View style={styles.upsTextContainer}>
                    <Text style={styles.upsText}>{ item.ups }</Text>
                  </View>
                  <View style={styles.titlesContainer}>
                    <Text style={styles.subtitle}>Posted by { generateRedditUserString(item.author) } { dayjs(item.created_utc*1000).fromNow() }</Text>
                    <Text style={styles.title}>{ item.title }</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )
        }}
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
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  titlesContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    color: theme.colors.text,
  },
  subtitle: {
    flex: 1,
    marginVertical: 2,
    fontSize: 14,
    color: theme.colors.grey
  },
  upsTextContainer: {
    width: 30,
    margin: 2,
  },
  upsText: {
    fontSize: 14,
    textAlign: 'center',
    color: theme.colors.grey,
    // fontWeight: 'bold'
  }
});

SubredditPostsScreen.options = props => ({
  topBar: {
    title: {
      text: `r/${props.subreddit}`,
    },
  },
});

export default SubredditPostsScreen;
