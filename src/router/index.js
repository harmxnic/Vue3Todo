import { createRouter, createWebHistory } from 'vue-router';
import AppTodos from '../views/AppTodos';
import AppTodo from '../views/AppTodo';

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppTodos
  },
  {
    path: '/todo/:id',
    name: 'todo',
    component: AppTodo
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
