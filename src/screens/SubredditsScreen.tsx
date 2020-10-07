import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist/hooks';

import { useStores } from '../stores';
import { useServices } from '../services';
import Constants from '../utils/constants';
import useStyles from '../utils/useStyles';
import { ButtonTitle } from '../components/Button';
import AppleStyleSwipeableRow from '../components/AppleStyleSwipeableRow';

const SubredditsScreen: NavigationFunctionComponent = observer(({
  componentId,
}) => {
  const { subreddits } = useStores();
  const { navigation } = useServices();
  const styles = useStyles(_styles);

  useNavigationButtonPress(async () => {
    navigation.showTextInputPrompt();
  }, componentId, 'add_button');

  const onSubredditPressed = (subreddit: string) => () =>
    navigation.pushSubredditPosts<SubredditPostsScreenProps>(componentId, { subreddit });

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
            <>
              <AppleStyleSwipeableRow
                title={'Delete'}
                backgroundColor={'#dd2c00'}
                onPress={deleteSubreddit(item)}
              >
                <TouchableOpacity onPress={onSubredditPressed(item)}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.text}>{ item }</Text>
                  </View>
                </TouchableOpacity>
              </AppleStyleSwipeableRow>
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
    backgroundColor: theme.colors.bg,
    padding: theme.sizes.s,
  },
  text: {
    fontSize: 24,
    margin: theme.sizes.s,
    color: theme.colors.text,
  }
});

SubredditsScreen.options = props => ({
  topBar: {
    title: {
      text: Constants.ScreenTitles.SubredditsScreen,
    },
    rightButtons: [{
      id: 'add_button',
      text: 'Add',
    }]
  },
});

export default SubredditsScreen;
