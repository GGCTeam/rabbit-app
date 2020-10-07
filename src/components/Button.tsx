import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useStyles from '../utils/useStyles';

type ButtonTitleProps = {
  title: string;
  centered?: boolean;
  onPress: () => void;
}

type ButtonIconProps = {
  icon: string;
  onPress: () => void;
}

export const ButtonTitle: React.FC<ButtonTitleProps> = ({
  title,
  centered = false,
  onPress,
}) => {
  const { styles } = useStyles(_styles);

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          <Text style={[styles.text, centered ? { textAlign: 'center' } : {}]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </>
  )
}

export const ButtonToolbar: React.FC<ButtonTitleProps> = ({
  title,
  onPress,
}) => {
  const { styles } = useStyles(_styles);

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonToolbarContainer}>
          <Text style={styles.textMain}>{title}</Text>
        </View>
      </TouchableOpacity>
    </>
  )
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  onPress,
}) => {
  const { styles } = useStyles(_styles);

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          <AntIcon name={icon} style={styles.buttonIcon} />
        </View>
      </TouchableOpacity>
    </>
  )
}

const _styles = (theme: ThemeType) => StyleSheet.create({
  buttonContainer: {
    margin: theme.sizes.s,
  },
  buttonToolbarContainer: {
    margin: 10,
  },
  buttonIcon: {
    fontSize: 28,
    color: theme.colors.text,
  },
  text: {
    fontSize: 18,
    margin: theme.sizes.s,
    color: theme.colors.text,
  },
  textMain: {
    fontSize: 18,
    color: theme.colors.main,
  }
});