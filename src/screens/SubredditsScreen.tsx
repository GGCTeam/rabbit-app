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

import { useStores } from '../stores';
import { useServices } from '../services';
import Constants from '../utils/constants';
import useStyles from '../utils/useStyles';
import { ButtonTitle } from '../components/Button';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist/hooks';

const SubredditsScreen: NavigationFunctionComponent = observer(({
  componentId,
}) => {
  const { subreddits } = useStores();
  const { navigation } = useServices();
  const styles = useStyles(_styles);

  useNavigationButtonPress(async () => {
    await Navigation.showModal({
      component: {
        name: 'alert'
      }
    })
  }, componentId, 'add_button');

  const onSubredditPressed = (subreddit: string) => () =>
    navigation.pushSubredditPosts<SubredditPostsScreenProps>(componentId, { subreddit });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={subreddits.all.slice()}
        keyExtractor={it => it}
        style={styles.list}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                onPress={onSubredditPressed(item)}
                // onLongPress={}
              >
                <View style={styles.buttonContainer}>
                  <Text style={styles.text}>{ item }</Text>
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
