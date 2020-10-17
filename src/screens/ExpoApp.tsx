import React from 'react';
import { StyleSheet, View } from 'react-native';

import useStyles from '../utils/useStyles';

const ExpoApp: React.FC = () => {
  const { styles } = useStyles(_styles);

  return <View style={styles.container} />;
}

const _styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  }
});

export default ExpoApp;