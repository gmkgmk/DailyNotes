import {
  createStore
} from 'redux';
const store = createStore(fn);

const state = store.getState();

const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');