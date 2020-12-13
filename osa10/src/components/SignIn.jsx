import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const initialValues = {
  username: "",
  password: "",
};

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

const SignInForm = ({ onSubmit }) => {
  return (
  <View style={{ backgroundColor: theme.colors.light }}>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="password" placeholder="Password" secureTextEntry />
    <TouchableWithoutFeedback onPress={onSubmit}>
      <Text fontSize="subheading" style={styles.button}>Sign in</Text>
    </TouchableWithoutFeedback>
  </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;