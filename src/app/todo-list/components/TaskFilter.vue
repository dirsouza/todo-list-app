<template>
  <dialog-filter
    v-model="getValue"
    :title="$t('app.todoList.table.filter.title')"
    :payload.sync="payload"
    @filter="onConfirme($event)"
  >
    <template #content="{ payload }">
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="payload.sortBy"
            :label="$t('app.todoList.table.filter.sortBy')"
            :items="headers"
            item-text="text"
            item-value="value"
            hide-details
            outlined
            dense
          />
        </v-col>

        <v-col cols="6">
          <v-select
            v-model="payload.orderBy"
            :label="$t('app.todoList.table.filter.orderBy')"
            :items="order"
            item-text="text"
            item-value="value"
            hide-details
            outlined
            dense
          />
        </v-col>

        <v-col cols="12">
          <v-menu
            v-model="showDate"
            :nudge-right="2"
            :close-on-content-click="false"
            transition="scale-transition"
            min-width="auto"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateVisible"
                :label="$t('app.todoList.table.filter.creationDate')"
                outlined
                dense
                readonly
                hide-details
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="payload.creationDate"
              locale="pt-br"
              no-title
              scrollable
            />
          </v-menu>
        </v-col>

        <v-col cols="6">
          <v-checkbox
            v-model="payload.archived"
            :label="$t('app.todoList.table.filter.archived')"
            hide-details
            class="mt-0 pt-0"
          />
        </v-col>

        <v-col cols="6">
          <v-checkbox
            v-model="payload.completed"
            :label="$t('app.todoList.table.filter.completed')"
            hide-details
            class="mt-0 pt-0"
          />
        </v-col>
      </v-row>
    </template>
  </dialog-filter>
</template>

<script>
import { parseISO, format } from 'date-fns';

import DialogFilter from 'Support/components/DialogFilter.vue';

import { dateFormat, headers, order } from 'App/todo-list/utils';

export default {
  name: 'TaskFilter',

  components: {
    DialogFilter,
  },

  props: {
    value: {
      type: Boolean,
    },
  },

  data: () => ({
    headers,
    order,
    showDate: false,
    dateVisible: '',
    payload: {
      sortBy: 'id',
      orderBy: 'asc',
      creationDate: null,
      archived: false,
      completed: false,
    },
  }),

  computed: {
    getValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

  watch: {
    'payload.creationDate': {
      deep: true,
      handler(value) {
        const date = parseISO(value);
        this.dateVisible = format(date, dateFormat);
      },
    },
  },

  methods: {
    onConfirme(payload) {
      this.$emit('filter', payload);
    },
  },
};
</script>

<style scoped>

</style>
