import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useApolloClient } from '@apollo/react-hooks';
import AuthStorageContext from '../contexts/AuthStorageContext';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import Text from './Text';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

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
  const { data } = useQuery(GET_AUTHORIZED_USER);
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const handleLogout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/" text="Repositories" />
        {data && data.authorizedUser !== null ?
          <>
            <AppBarTab to="/review" text="Create a review" />
            <View style={{ marginRight: 10 }}>
              <TouchableOpacity onPress={handleLogout}>
                <Text fontWeight='bold' fontSize='subheading' color='light'>
                  Sign out
                </Text>
              </TouchableOpacity>
            </View>
          </>
        :
        <> 
          <AppBarTab to="/login" text="Sign in" />
          <AppBarTab to="/signup" text="Sign up" />
        </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;