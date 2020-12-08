import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Text from './Text';

const AppBarTab = ({ text }) => {
  return (
    <TouchableWithoutFeedback>
      <Text fontWeight='bold' fontSize='heading' color='light'>
        {text}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;