import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  logo: {
    width: 50,
    height: 50,
  },
  language: {
    backgroundColor: theme.colors.primary
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
  },
});

const RepositoryItemHeader = ({ item }) => {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.avatarContainer}>
        <Image
          source={{uri: item.ownerAvatarUrl}}
          style={headerStyles.logo}
        />
      </View>
      <View style={headerStyles.infoContainer}>
        <Text>{item.fullName}</Text>
        <Text>{item.description}</Text>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.light
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderWidth: 5,
    borderRadius: 20,
    alignSelf: 'flex-start'
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <RepositoryItemHeader item={item} />
      <Text style={styles.language}>
        Ketan
      </Text>
    </View>
  );
};

export default RepositoryItem;