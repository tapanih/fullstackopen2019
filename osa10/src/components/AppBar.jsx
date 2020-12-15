import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.colors.dark,
    flexGrow: 0,
    paddingBottom: 10,
    paddingLeft: 10
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab to="/" text="Repositories" />
      <AppBarTab to="/login" text="Sign in" />
    </ScrollView>
  </View>;
};

export default AppBar;