import React from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import useDeleteReview from '../hooks/useDeleteReview';
import theme from '../theme';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';
import ThemedButton from './ThemedButton';

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: theme.colors.light,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  alertButton: {
    backgroundColor: theme.colors.alert,
    borderColor: theme.colors.alert,
  }
});

const MyReviewsContainer = ({ authorizedUser, openRepositoryView, handleDeleteReview }) => {

  const createDeleteReviewAlert = (item) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => handleDeleteReview(item) }
      ],
      { cancelable: true }
  );

  const reviews = authorizedUser
  ? authorizedUser.reviews.edges.map(edge => edge.node)
  : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => 
        <View style={styles.reviewContainer}>
          <ReviewItem review={item} showRepositoryName />
          <View style={styles.buttonContainer}>
            <ThemedButton onPress={() => openRepositoryView(item)} text="View repository" />
            <ThemedButton onPress={() => createDeleteReviewAlert(item)} style={styles.alertButton} text="Delete review" />
          </View>
        </View>
      }
    />
  );
};

const MyReviews = () => {
  const history = useHistory();
  const deleteReview = useDeleteReview();
  const { authorizedUser, refetch } = useAuthorizedUser({ includeReviews: true });

  const openRepositoryView = (item) => {
    history.push(`/${item.repository.id}`);
  };

  const handleDeleteReview = async (item) => {
    await deleteReview(item.id);
    refetch();
  };

  return (
    <MyReviewsContainer 
      authorizedUser={authorizedUser} 
      openRepositoryView={openRepositoryView}
      handleDeleteReview={handleDeleteReview}
    />
  );
};

export default MyReviews;