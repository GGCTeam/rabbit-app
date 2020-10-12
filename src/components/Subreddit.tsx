import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';
import useStyles from '../utils/useStyles';

type SubredditProps = {
  item: string;
  onPress: () => void;
  onDelete: () => void;
}

const Subreddit: React.FC<SubredditProps> = ({
  item,
  onPress,
  onDelete,
}) => {
  const { styles, theme } = useStyles(_styles);

  return (
    <AppleStyleSwipeableRow
      title={'Delete'}
      backgroundColor={theme.colors.red}
      onPress={onDelete}
    >
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>{ item }</Text>
        </View>
      </TouchableOpacity>
    </AppleStyleSwipeableRow>
  )
}

const _styles = (theme: ThemeType) => StyleSheet.create({
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

export default Subreddit;