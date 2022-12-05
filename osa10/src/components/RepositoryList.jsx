import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce/lib';
import ItemSeparator from './ItemSeparator';

export const RepositoryListContainer = ({ repositories, variables, setVariables, searchQuery, setSearchQuery, onEndReach }) => {
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
          onValueChange={(value) => setVariables({ ...variables, orderBy: value.orderBy, orderDirection: value.orderDirection })}
          items={[
              { label: 'Latest Repositories', value: { orderBy: "CREATED_AT", orderDirection: "DESC" }},
              { label: 'Highest rated repositories', value: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" }},
              { label: 'Lowest rated repositories', value: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" }},
          ]}
        />
      </View>
    }
    onEndReached={onEndReach}
    onEndReachedThreshold={0.5}
  />
);
};

const RepositoryList = () => {
  const [variables, setVariables] = useState({ first: 8, orderBy: "CREATED_AT", orderDirection: "DESC", searchKeyword: "" });
  const { repositories, fetchMore } = useRepositories(variables);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);

  useEffect(() => setVariables({ ...variables, searchKeyword }), [searchKeyword]);

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer
            repositories={repositories}
            variables={variables}
            setVariables={setVariables}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onEndReach={onEndReach}
        />;
};

export default RepositoryList;