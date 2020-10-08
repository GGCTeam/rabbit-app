import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist/hooks';

import { useStores } from '../stores';
import { useServices } from '../services';
import Constants from '../utils/constants';
import useStyles from '../utils/useStyles';
import AppleStyleSwipeableRow from '../components/AppleStyleSwipeableRow';
import Subreddit from '../components/Subreddit';

const SubredditsScreen: NavigationFunctionComponent = observer(({
  componentId,
}) => {
  const { subreddits } = useStores();
  const { navigation } = useServices();
  const { styles, theme } = useStyles(_styles);

  useNavigationButtonPress(navigation.showTextInputPrompt, componentId, Constants.SubredditsScreen.addButton.id);

  const onSubredditPressed = (subreddit: string) => () =>
    navigation.pushSubredditPosts<PostsScreenProps>(componentId, { subreddit });

  const deleteSubreddit = (subreddit: string) => () =>
    subreddits.removeSubreddit(subreddit);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={subreddits.all.slice()}
        keyExtractor={it => it}
        style={styles.list}
        renderItem={({ item }) => {
          return (
            <AppleStyleSwipeableRow
              title={'Delete'}
              backgroundColor={theme.colors.red}
              onPress={deleteSubreddit(item)}
            >
              <Subreddit item={item} onPress={onSubredditPressed(item)} />
            </AppleStyleSwipeableRow>
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
  }
});

SubredditsScreen.options = props => ({
  topBar: {
    title: {
      text: Constants.ScreenTitles.SubredditsScreen,
    },
    rightButtons: [Constants.SubredditsScreen.addButton]
  },
});

export default SubredditsScreen;
