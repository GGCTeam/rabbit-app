import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
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

type ButtonToolbarProps = {
  title: string;
  onPress: () => void;
}

type ButtonActionProps = {
  title: string;
  icon: string;
  disabled?: boolean;
  onPress?: () => void;
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

export const ButtonToolbar: React.FC<ButtonToolbarProps> = ({
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

export const ButtonAction: React.FC<ButtonActionProps> = ({
  title,
  icon,
  disabled = false,
  onPress = () => {},
}) => {
  const { styles } = useStyles(_styles);

  return (
    <>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={styles.buttonActionContainer}>
          <IonIcon name={icon} style={styles.actionButtonIcon} />
          <Text style={styles.actionButtonText}>{title}</Text>
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
          <IonIcon name={icon} style={styles.buttonIcon} />
        </View>
      </TouchableOpacity>
    </>
  )
}

const _styles = (theme: ThemeType) => StyleSheet.create({
  buttonContainer: {
    margin: theme.sizes.s,
  },
  buttonActionContainer: {
    margin: theme.sizes.s,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonToolbarContainer: {
    margin: 10,
  },
  buttonIcon: {
    fontSize: 40,
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
  },
  actionButtonIcon: {
    fontSize: 24,
    color: theme.colors.text,
  },
  actionButtonText: {
    fontSize: 20,
    margin: theme.sizes.s,
    marginLeft: theme.sizes.m,
    color: theme.colors.text,
  },
});