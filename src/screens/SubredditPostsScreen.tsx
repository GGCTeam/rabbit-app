import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import { observer } from 'mobx-react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist/hooks';

import { useStores } from '../stores';
import Constants from '../utils/constants';
import useStyles from '../utils/useStyles';

const SubredditPostsScreen: NavigationFunctionComponent<SubredditPostsScreenProps> = observer(({
  componentId,
  subreddit,
}) => {
  const { subreddits } = useStores();
  const styles = useStyles(_styles);

  const { posts } = subreddits.dict[subreddit] as SubredditData || [];

  useNavigationComponentDidAppear(() => {
    loadPosts();
  }, componentId);

  const loadPosts = async () => {
    await subreddits.getPostsForSubreddit(subreddit);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={it => it.url}
        style={styles.list}
        refreshing={subreddits.loading}
        onRefresh={loadPosts}
        refreshControl={<RefreshControl refreshing={subreddits.loading} />}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity onPress={() => { }}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.text}>{ item.title }</Text>
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
    margin: theme.sizes.s,
  },
  text: {
    fontSize: 18,
    margin: theme.sizes.s,
    color: theme.colors.text,
  },
});

SubredditPostsScreen.options = props => ({
  topBar: {
    title: {
      text: `r/${props.subreddit}`,
    },
  },
});

export default SubredditPostsScreen;
