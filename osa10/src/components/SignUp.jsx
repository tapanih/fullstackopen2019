import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import { useHistory } from 'react-router-native';
import ThemedButton from './ThemedButton';
import useCreateUser from '../hooks/useCreateUser';


const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required")
                        .min(1, "Username length should be between 1 and 30")
                        .max(30, "Username length should be between 1 and 30"),
  password: yup.string().required("Password is required")
                        .min(5, "Password length should be between 5 and 50")
                        .max(50, "Password length should be between 5 and 50"),
  confirmation: yup.string().oneOf([yup.ref("password"), null], "Passwords do not match")
                            .required("Password confirmation is required"),
});

const initialValues = {
  username: "",
  password: "",
  confirmation: "",
};

const SignUpForm = ({ onSubmit }) => {
  return (
  <View style={{ backgroundColor: theme.colors.light }}>
    <FormikTextInput testID='usernameField' name="username" placeholder="Username" />
    <FormikTextInput testID='passwordField' name="password" placeholder="Password" secureTextEntry />
    <FormikTextInput testID='confirmationField' name="confirmation" placeholder="Password confirmation" secureTextEntry />
    <ThemedButton testID="submitButton" onPress={onSubmit} text="Sign up" />
  </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [createUser] = useCreateUser();

  const onSubmit = async ({ username, password }) => {
    try {
      await createUser(username, password);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;