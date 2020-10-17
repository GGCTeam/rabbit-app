import React from 'react';
import {
  ListRenderItemInfo,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { observer } from 'mobx-react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist/hooks';

import { useStores } from '../stores';
import { useServices } from '../services';
import Constants from '../utils/constants';
import useStyles from '../utils/useStyles';
import Subreddit from '../components/Subreddit';
import EmptyListComponent from '../components/EmptyListComponent';

const SubredditsScreen: NavigationFunctionComponent = observer(({
  componentId,
}) => {
  const { subreddits } = useStores();
  const { navigation } = useServices();
  const { styles } = useStyles(_styles);

  useNavigationButtonPress(navigation.showTextInputPrompt, componentId, Constants.SubredditsScreen.addButton.id);

  const pushSubredditPosts = (subreddit: string) => () =>
    navigation.pushSubredditPosts(componentId, { subreddit });

  const deleteSubreddit = (subreddit: string) => () =>
    subreddits.removeSubreddit(subreddit);

  const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <Subreddit
      item={item}
      onPress={pushSubredditPosts(item)}
      onDelete={deleteSubreddit(item)}
    />
  );

  if (subreddits.all.length === 0) {
    return <EmptyListComponent text={Constants.SubredditsScreen.EmptyListText} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={subreddits.all.slice()}
        keyExtractor={it => it}
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

SubredditsScreen.options = props => ({
  topBar: {
    title: {
      text: Constants.ScreenTitles.SubredditsScreen,
    },
    rightButtons: [Constants.SubredditsScreen.addButton]
  },
});

export default SubredditsScreen;
