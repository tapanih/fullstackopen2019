import React from 'react';
import {render, screen} from '@testing-library/react';
import Todo from './Todo';

const mock = () => {};

test('displays Todo that is done correctly', async () => {
  const todo = { text: "Testing React components", done: true }
  render(<Todo todo={todo} deleteTodo={mock} completeTodo={mock}/>);

  screen.getByText("This todo is done");
  screen.getByText("Testing React components");
});

test('displays Todo that is not done correctly', async () => {
  const todo = { text: "Testing React components", done: false }
  render(<Todo todo={todo} deleteTodo={mock} completeTodo={mock}/>);

  screen.getByText("This todo is not done");
  screen.getByText("Testing React components");
});
