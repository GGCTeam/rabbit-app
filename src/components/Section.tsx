import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useStyles from 'src/utils/useStyles';

type SectionProps = {
  header: string;
}

export const Section: React.FC<SectionProps> = ({
  header,
  children,
}) => {
  const { styles } = useStyles(_styles);

  return (
    <View style={styles.section}>
      <Text style={styles.header}>
        { header }
      </Text>

      { children }
    </View>
  )
}

const _styles = (theme: ThemeType) => StyleSheet.create({
  section: {
    padding: theme.sizes.m,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.main,
  },
});