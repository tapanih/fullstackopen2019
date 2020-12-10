import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 2,
    backgroundColor: theme.colors.light
  },
  infoContainer: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  descContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  statContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  logo: {
    width: 60,
    height: 60,
  },
  language: {
    textAlign: 'center',
    color: theme.colors.light,
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    margin: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderWidth: 4,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  text: {
    margin: 4,
  },
});

const Stat = ({ value, description }) => {
  value = value >= 1000 ? Math.round(value / 100) / 10 + "k" : value;
  return (
    <View style={{ flexGrow: 0 }}>
      <Text style={{textAlign: 'center'}} fontWeight='bold'>{value}</Text>
      <Text>{description}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: item.ownerAvatarUrl}}
            style={styles.logo}
          />
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.text} fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
          <Text style={styles.text} color="textSecondary">{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statContainer}>
        <Stat value={item.stargazersCount} description='Stars' />
        <Stat value={item.forksCount} description='Forks'/>
        <Stat value={item.reviewCount} description='Reviews'/>
        <Stat value={item.ratingAverage} description='Rating'/>
      </View>
    </View>
  );
};

export default RepositoryItem;