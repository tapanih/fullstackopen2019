import React from 'react';
import { StyleSheet, View } from 'react-native';
import format from 'date-fns/format';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 2,
    backgroundColor: theme.colors.light,
    flexDirection: "row",
    flexGrow: 1,
  },
  ratingContainer: {
    flexGrow: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    marginTop: 10,
  },
  ratingText: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    textAlign: "center",
  },
  reviewContainer: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
  text: {
    margin: 4,
  }
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text fontWeight="bold" style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.text} fontSize="subheading" fontWeight="bold">{review.user.username}</Text>
        <Text style={styles.text} color="textSecondary">{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;