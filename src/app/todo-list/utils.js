/* eslint-disable */
import i18n from 'Plugin/i18n';

/**
 * @type {string} dateFormat
 */
export const dateFormat = process.env.VUE_APP_DATE_FORMAT;

/**
 * @type {{text: string, value: string}[]}
 */
export const headers = [
  { text: i18n.t('app.todoList.table.headers.title'), value: 'title' },
  { text: i18n.t('app.todoList.table.headers.actions'), value: 'actions', align: 'center', sortable: false, width: '15%' },
];

/**
 * @type {{text: string, value: string}[]}
 */
export const order = [
  { text: i18n.t('commons.ascendant'), value: 'asc' },
  { text: i18n.t('commons.descendant'), value: 'desc' },
];
