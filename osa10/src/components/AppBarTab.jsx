import React from 'react';
import { Link } from 'react-router-native';
import { TouchableOpacity, View } from 'react-native';
import Text from './Text';

const AppBarTab = ({ to, text }) => {
  return (
    <View style={{ marginRight: 10 }}>
    <Link to={to} component={TouchableOpacity}>
      <Text fontWeight='bold' fontSize='subheading' color='light'>
        {text}
      </Text>
    </Link>
    </View>
  );
};

export default AppBarTab;