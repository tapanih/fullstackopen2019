import React from 'react';
import { Link } from 'react-router-native';
import { TouchableOpacity } from 'react-native';
import Text from './Text';

const AppBarTab = ({ to, text }) => {
  return (
    <Link to={to} component={TouchableOpacity}>
      <Text fontWeight='bold' fontSize='heading' color='light'>
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;