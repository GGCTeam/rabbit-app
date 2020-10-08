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
          icon={'close-outline'}
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
    backgroundColor: theme.colors.bg,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg,
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
    fontSize: 32,
    color: theme.colors.text,
  },
  inputPretext: {
    fontSize: 32,
    marginRight: theme.sizes.s,
    color: theme.colors.text
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