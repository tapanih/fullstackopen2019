import React from 'react';

const Todo = ({todo, deleteTodo, completeTodo}) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      <span>
        {todo.text}
      </span>
      {todo.done ? <span>This todo is done</span> : <span>This todo is not done</span>}
      <span>
        <button onClick={() => deleteTodo(todo)}> Delete </button>
        {todo.done || <button onClick={() => completeTodo(todo)}> Set as done </button>}
      </span>
    </div>
);

export default Todo;