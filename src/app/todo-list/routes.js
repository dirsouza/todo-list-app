import i18n from 'Plugin/i18n';

export default [
  {
    path: '',
    name: 'TodoList',
    component: () => import(/* webpackChunkName: "todo-list" */ 'App/todo-list/TasksList.vue'),
  },
  {
    path: '/task/create',
    name: 'TaskCreate',
    component: () => import(/* webpackChunkName: "todo-list" */ 'App/todo-list/TaskForm.vue'),
    props: {
      type: 'create',
      title: i18n.t('app.todoList.form.createTitle'),
    },
  },
  {
    path: '/task/update/:id',
    name: 'TaskUpdate',
    component: () => import(/* webpackChunkName: "todo-list" */ 'App/todo-list/TaskForm.vue'),
    props: {
      type: 'update',
      title: i18n.t('app.todoList.form.updateTitle'),
    },
  },
];
