import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router-native';

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

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: theme.colors.light }}>
      <FormikTextInput testID='ownerNameField' name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput testID='repositoryNameField' name="repositoryName" placeholder="Repository name" />
      <FormikTextInput testID='ratingField' name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput testID='reviewField' name="text" placeholder="Review" multiline />
      <TouchableOpacity testID='submitButton' onPress={onSubmit} activeOpacity={0.4}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.button}>Create a review</Text>
      </TouchableOpacity>
    </View>
  );
};

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().typeError("Rating should be a number")
                      .required("Rating is required")
                      .min(0, "Rating should be between 0 and 100")
                      .max(100, "Rating should be between 0 and 100")
                      .integer("Rating should be a whole number"),
  text: yup.string(),
});

const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (fields) => {
    try {
      const review = {  ...fields, rating: parseInt(fields.rating) };
      const repositoryId = await createReview(review);
      history.push(`/${repositoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;