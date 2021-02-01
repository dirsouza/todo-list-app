<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tasks"
      :items-per-page="perPage"
      :loading="loadingTable"
      dense
      show-select
      hide-default-footer
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t('app.todoList.table.title') }}
          </v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="$t('app.todoList.table.inputSearch')"
            hide-details
            outlined
            dense
            @keydown.enter="setSearchInQueryString()"
          />

          <v-btn
            color="secondary"
            outlined
            class="ml-1"
            @click="onShowFilter()"
          >
            <v-icon
              dark
              left
            >
              mdi-filter-variant
            </v-icon>
            {{ $t('app.todoList.table.btnFilter') }}
          </v-btn>

          <v-spacer />

          <v-btn
            color="primary"
            dark
            :to="{ name: 'TaskCreate' }"
          >
            {{ $t('app.todoList.table.btnNewTask') }}
          </v-btn>
        </v-toolbar>
      </template>

      <template #item.data-table-select="{ item }">
        <v-switch
          v-if="!item.archived"
          v-model="item.completed"
          hide-details
          class="ma-0 pa-0"
          @click="onToggleTask(item)"
        />
      </template>

      <template #item.title="{ item: { title, completed, archived } }">
        <span
          :class="{
            'text-decoration-line-through text--secondary': completed,
            'text-decoration-underline text--secondary': archived,
          }"
        >
          {{ title }}
        </span>
      </template>

      <template #item.actions="{ item }">
        <v-tooltip
          v-if="!item.completed && !item.archived"
          top
        >
          <template #activator="{ on, attrs }">
            <v-icon
              small
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="onArchivedTask(item)"
            >
              mdi-archive-arrow-down
            </v-icon>
          </template>
          <span>{{ $t('commons.toFile') }}</span>
        </v-tooltip>

        <v-tooltip
          v-if="!item.completed && item.archived"
          top
        >
          <template #activator="{ on, attrs }">
            <v-icon
              small
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="onUnarchiveTask(item)"
            >
              mdi-archive-arrow-up
            </v-icon>
          </template>
          <span>{{ $t('commons.unarchive') }}</span>
        </v-tooltip>

        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-icon
              small
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="onEditTask(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>{{ $t('commons.edit') }}</span>
        </v-tooltip>

        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-icon
              small
              v-bind="attrs"
              v-on="on"
              @click="onDeleteTask(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>{{ $t('commons.delete') }}</span>
        </v-tooltip>
      </template>

      <template #footer>
        <div class="text-center">
          <v-container>
            <v-row justify="end">
              <v-col cols="2">
                <v-select
                  v-model="perPage"
                  :label="$t('app.todoList.table.perPage')"
                  :items="listPerPage"
                  hide-details
                  outlined
                  dense
                  @change="setPerPageInQueryString()"
                />
              </v-col>

              <v-col cols="4">
                <v-pagination
                  v-model="page"
                  :length="lastPage"
                  :total-visible="5"
                  circle
                  @input="setQueryStringPaginate()"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </template>
    </v-data-table>

    <task-filter
      v-model="showFilter"
      @filter="setFilterInQueryString($event)"
    />
  </div>
</template>

<script>
import TaskFilter from 'App/todo-list/components/TaskFilter.vue';

import NotificationMixin from 'Support/mixins/NotificationMixin';

import TasksRequest from 'Domain/todo-list/TasksRequest';

import { headers } from 'App/todo-list/utils';

export default {
  name: 'TasksList',

  components: {
    TaskFilter,
  },

  mixins: [NotificationMixin],

  data: () => ({
    showFilter: false,
    loadingTable: false,
    listPerPage: [5, 10, 15, 50, 100],
    page: 1,
    lastPage: 0,
    perPage: 15,
    sortBy: 'id',
    orderBy: 'desc',
    total: 0,
    search: '',
    headers,
    tasks: [],
  }),

  mounted() {
    this.setQueryStringPaginate();
  },

  methods: {
    async getTasks() {
      try {
        this.tasks = [];
        this.loadingTable = true;
        const query = this.getQueryStringPaginate();
        const result = (await TasksRequest.list(query)).data.data;

        const {
          data, current_page: currentPage, per_page: perPage, last_page: lastPage, total,
        } = result;

        this.tasks = Object.assign([], data);
        this.page = currentPage;
        this.perPage = Number(perPage) === total ? -1 : Number(perPage);
        this.lastPage = lastPage;
        this.total = total;
      } catch (e) {
        this.showErrorToast({
          text: e.response.data.message,
        });
      } finally {
        this.loadingTable = false;
      }
    },

    onShowFilter() {
      this.showFilter = true;
    },

    setQueryStringPaginate() {
      this.$router.replace({
        query: {
          ...this.$route.query,
          page: this.page,
          perPage: this.perPage,
          sortBy: this.sortBy,
          orderBy: this.orderBy,
        },
      });

      this.getTasks();
    },

    setSearchInQueryString() {
      let search;

      if (this.search) search = this.search;

      this.page = 1;

      this.$router.replace({
        query: {
          ...this.$route.query,
          page: this.page,
          search,
        },
      });

      this.getTasks();
    },

    setFilterInQueryString(filter) {
      let { archived, completed } = filter;

      if (archived) archived = archived ? 1 : 0;
      if (completed) completed = completed ? 1 : 0;

      this.page = 1;
      this.sortBy = filter.sortBy || this.sortBy;
      this.orderBy = filter.orderBy || this.orderBy;

      this.$router.replace({
        query: {
          ...this.$route.query,
          page: this.page,
          sortBy: this.sortBy,
          orderBy: this.orderBy,
          creationDate: filter.creationDate,
          archived,
          completed,
        },
      });

      this.getTasks();
    },

    setPerPageInQueryString() {
      this.page = 1;
      this.setQueryStringPaginate();
    },

    getQueryStringPaginate() {
      return this.$route.query;
    },

    async onToggleTask(task) {
      try {
        const payload = {
          title: task.title,
          description: task.description,
          completed: task.completed ? 1 : 0,
          archived: task.archived ? 1 : 0,
        };

        const { message } = (await TasksRequest.update(task.id, payload)).data;

        this.showSuccessToast({
          text: message,
        });
      } catch (e) {
        this.showErrorToast({
          text: e.response.data.message,
        });
      }
    },

    async onArchivedTask(task) {
      this.tasks = this.tasks.filter((tsk) => tsk.id !== task.id);

      const payloadTask = {
        ...task,
        archived: true,
      };

      await this.onToggleTask(payloadTask);
    },

    async onUnarchiveTask(task) {
      this.tasks = this.tasks.filter((tsk) => tsk.id !== task.id);

      const payloadTask = {
        ...task,
        archived: false,
      };

      await this.onToggleTask(payloadTask);
    },

    async onEditTask(task) {
      await this.$router.push({
        name: 'TaskUpdate',
        params: {
          id: task.id,
        },
      });
    },

    async onDeleteTask(task) {
      try {
        const { isConfirmed } = await this.showConfirmDeleteDialog({
          title: this.$t('app.todoList.table.actionDelete.title'),
          text: this.$t('app.todoList.table.actionDelete.message'),
        });

        if (!isConfirmed) return;

        this.tasks = this.tasks.filter((tsk) => tsk.id !== task.id);

        const { message } = (await TasksRequest.delete(task.id)).data;

        this.showSuccessToast({
          text: message,
        });
      } catch (e) {
        this.showErrorToast({
          text: e.response.data.message,
        });
      }
    },
  },
};
</script>

<style scoped>
>>> th > .v-data-table__checkbox {
  display: none;
}
</style>
