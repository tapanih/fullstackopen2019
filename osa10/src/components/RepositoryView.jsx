import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ first: 3, id });

  const onEndReach = () => {
    fetchMore();
  };

  const item = repository ? repository : {};
  const reviews = item.reviews
    ? item.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => 
        <>
          <RepositoryItem item={item} showGithubButton />
          <ItemSeparator />
        </>
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryView;