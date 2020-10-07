import React from 'react';
import { View, StyleSheet, Text, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import { useStores } from '../stores';
import { ButtonIcon } from '../components/Button';
import useStyles from '../utils/useStyles';

const TextInputPrompt: NavigationFunctionComponent = ({
  componentId
}) => {
  const { subreddits } = useStores();
  const { styles } = useStyles(_styles);
  const dismiss = () => Navigation.dismissModal(componentId);

  const addSubreddit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const { text } = e.nativeEvent;

    subreddits.addSubreddit(text.toLocaleLowerCase());
    dismiss();
  }

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputPretext}>r/</Text>
        <TextInput
          style={styles.input}
          autoFocus
          placeholder={'add new subreddit'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          autoCorrect={false}
          returnKeyType={'done'}
          onSubmitEditing={addSubreddit}
        />
      </View>

      <View style={styles.closeButtonContainer}>
        <ButtonIcon
          icon={'closecircleo'}
          onPress={dismiss}
        />
      </View>
    </View>
  );
}

const _styles = (theme: ThemeType) => StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00000010',
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    width: '100%',
    padding: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
  },
  message: {
    marginVertical: 8,
  },
  input: {
    height: 120,
    width: '100%',
    // textAlign: 'center',
    fontSize: 32,
  },
  inputPretext: {
    fontSize: 32,
    marginRight: theme.sizes.s,
  },
  closeButtonContainer: {
    marginTop: theme.sizes.s
  }
});

TextInputPrompt.options = (props) => ({
  topBar: {
    visible: false,
  }
})

export default TextInputPrompt;