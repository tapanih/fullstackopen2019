import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import theme from '../theme';

const ThemedButton = ({ onPress, testID, text }) => {

  const styles = StyleSheet.create({
    button: {
      textAlign: 'center',
      color: theme.colors.light,
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      margin: 6,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderWidth: 4,
      borderRadius: 5,
      padding: 8,
    }
  });

  return (
    <TouchableOpacity testID={testID} onPress={onPress} activeOpacity={0.4}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.button}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;