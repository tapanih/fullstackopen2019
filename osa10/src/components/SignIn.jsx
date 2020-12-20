import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

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
    <FormikTextInput testID='usernameField' name="username" placeholder="Username" />
    <FormikTextInput testID='passwordField' name="password" placeholder="Password" secureTextEntry />
    <TouchableOpacity testID='submitButton' onPress={onSubmit} activeOpacity={0.4}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.button}>Sign in</Text>
    </TouchableOpacity>
  </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
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

const SignIn = () => {
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;