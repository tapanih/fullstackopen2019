import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce/lib';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories, variables, setVariables, searchQuery, setSearchQuery }) => {
  const history = useHistory();

  const onChangeSearch = query => setSearchQuery(query);

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
      <View>
        <Searchbar
          style={{ margin: 10 }}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <RNPickerSelect
          onValueChange={(value) => setVariables({ ...value, searchKeyword: variables.searchKeyword })}
          items={[
              { label: 'Latest Repositories', value: { orderBy: "CREATED_AT", orderDirection: "DESC" }},
              { label: 'Highest rated repositories', value: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" }},
              { label: 'Lowest rated repositories', value: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" }},
          ]}
        />
      </View>
    }
  />
);
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [variables, setVariables] = useState({ orderBy: "CREATED_AT", orderDirection: "DESC", searchKeyword: "" });
  const { repositories } = useRepositories(variables);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);

  useEffect(() => setVariables({ ...variables, searchKeyword }), [searchKeyword]);

  return <RepositoryListContainer
            repositories={repositories}
            variables={variables}
            setVariables={setVariables}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />;
};

export default RepositoryList;