import TodoListRoutes from 'App/todo-list/routes';

export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ 'Support/layout/Layout.vue'),
    children: [
      ...TodoListRoutes,
    ],
  },
];
