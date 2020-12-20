import React from 'react';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';

const RepositoryView = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  const item = repository ? repository : {};

  return (<RepositoryItem item={item} showGithubButton />);
};

export default RepositoryView;