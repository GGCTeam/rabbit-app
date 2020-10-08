import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import useStyles from '../utils/useStyles';

type EmptyListComponentProps = {
  text: string;
}

const EmptyListComponent: React.FC<EmptyListComponentProps> = ({
  text
}) => {
  const { styles } = useStyles(_styles);

  return (
    <SafeAreaView style={styles.emptyScreenContainer}>
        <Text style={styles.emptyScreenText}>
          {text}
        </Text>
      </SafeAreaView>
  )
}

const _styles = (theme: ThemeType) => StyleSheet.create({
  emptyScreenContainer: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyScreenText: {
    fontSize: 24,
    textAlign: 'center',
    width: '80%',
    color: theme.colors.grey
  },
});

export default EmptyListComponent;