import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

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
    <TouchableOpacity onPress={onSubmit} activeOpacity={0.4}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.button}>Sign in</Text>
    </TouchableOpacity>
  </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;