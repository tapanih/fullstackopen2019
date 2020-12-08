import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.dark,
    flexGrow: 0,
    paddingBottom: 10,
    paddingLeft: 10
  },
});

const AppBar = () => {
  return <View style={styles.container}>
    <AppBarTab text="Repositories" />
  </View>;
};

export default AppBar;