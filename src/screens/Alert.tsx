import { TextInput } from "react-native-gesture-handler";

const React = require('react');
const { Text, Button, View } = require('react-native');
const { Navigation } = require('react-native-navigation');

const Alert = ({ componentId, title, message }) => {
  const dismiss = () => Navigation.dismissOverlay(componentId);

  return (
    <View style={styles.root}>
      <View style={styles.alert}>
        {/* <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text> */}
        {/* <Button title="OK" onPress={dismiss} /> */}
        <TextInput
          style={styles.input}
          autoFocus
          placeholder={'Add new subreddit'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
      </View>
    </View>
  );
}
// https://storage.googleapis.com/global-radio-bdc6b.appspot.com/russia/RussianRadios.json

const styles = {
  root: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000020',
    // backgroundColor: 'transparent',
  },
  alert: {
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    width: '100%',
    // elevation: 4,
    padding: 16,
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
    textAlign: 'center',
    fontSize: 40,
  },
};

Alert.options = (props) => {
  return {
    
  };
};

export default Alert;