import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories, setVariables }) => {
  const history = useHistory();
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

return (
  <FlatList
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) =>
      <TouchableOpacity onPress={() => history.push(`/${item.id}`)} activeOpacity={0.4}>
        <RepositoryItem item={item} />
      </TouchableOpacity>
    }
    ListHeaderComponent={
      <RNPickerSelect
        onValueChange={(value) => setVariables(value)}
        items={[
            { label: 'Latest Repositories', value: { orderBy: "CREATED_AT", orderDirection: "DESC" }},
            { label: 'Highest rated repositories', value: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" }},
            { label: 'Lowest rated repositories', value: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" }},
        ]}
      />
    }
  />
);
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [variables, setVariables] = useState({ orderBy: "CREATED_AT", orderDirection: "DESC" });
  const { repositories } = useRepositories(variables);

  return <RepositoryListContainer repositories={repositories} setVariables={setVariables} />;
};

export default RepositoryList;