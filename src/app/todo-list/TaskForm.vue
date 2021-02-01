<template>
  <v-form
    ref="form"
    lazy-validation
  >
    <v-card flat>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="payload.title"
                :label="$t('app.todoList.form.inputTitle')"
                :rules="titleRules"
                autofocus
                outlined
                dense
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="payload.description"
                :label="$t('app.todoList.form.inputDescription')"
                :rules="descriptionRules"
                rows="3"
                auto-grow
                outlined
                dense
              />
            </v-col>

            <v-col cols="2">
              <v-switch
                v-model="payload.archived"
                :label="$t('app.todoList.form.switchArchived')"
                hide-details
                inset
              />
            </v-col>

            <v-col cols="2">
              <v-switch
                v-model="payload.completed"
                :label="$t('app.todoList.form.switchCompleted')"
                hide-details
                inset
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="warning"
          text
          @click="onCancel()"
        >
          {{ $t('app.todoList.form.btnCancel') }}
        </v-btn>

        <v-btn
          color="primary"
          @click="formIsValid()"
        >
          {{ $t('app.todoList.form.btnSave') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import NotificationMixin from 'Support/mixins/NotificationMixin';

import TasksRequest from 'Domain/todo-list/TasksRequest';

export default {
  name: 'TaskForm',

  mixins: [NotificationMixin],

  props: {
    type: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },
  },

  data: (vm) => ({
    taskId: undefined,
    payload: {
      title: '',
      description: '',
      archived: false,
      completed: false,
    },
    titleRules: [
      (v) => !!v || vm.$t('rulesMessage.required', { field: vm.$t('app.todoList.form.inputTitle') }),
      (v) => (v && v.length >= 5) || vm.$t('rulesMessage.min', {
        field: vm.$t('app.todoList.form.inputTitle'),
        min: 5,
      }),
      (v) => (v && v.length <= 100) || vm.$t('rulesMessage.max', {
        field: vm.$t('app.todoList.form.inputTitle'),
        max: 100,
      }),
    ],
    descriptionRules: [
      (v) => (v.length === 0 || v.length >= 5) || vm.$t('rulesMessage.min', {
        field: vm.$t('app.todoList.form.inputDescription'),
        min: 5,
      }),
    ],
  }),

  watch: {
    'payload.archived': {
      deep: true,
      handler(value) {
        if (value) {
          this.payload.completed = false;
        }
      },
    },

    'payload.completed': {
      deep: true,
      handler(value) {
        if (value) {
          this.payload.archived = false;
        }
      },
    },
  },

  mounted() {
    if (Object.keys(this.$route.params).length) {
      this.taskId = this.$route.params.id;

      this.getTask();
    }
  },

  methods: {
    formIsValid() {
      if (!this.$refs.form.validate()) return;

      if (this.type === 'create') {
        this.registerTask();
      } else {
        this.updateTask();
      }
    },

    async getTask() {
      let loading;

      try {
        loading = this.$loading.show();

        const {
          title, description, completed, archived,
        } = (await TasksRequest.task(this.taskId)).data.data;

        this.payload = {
          title,
          description: description || '',
          completed: !!completed,
          archived: !!archived,
        };
      } catch (e) {
        this.showErrorToast({
          text: e.response.data.message,
        });
      } finally {
        if (loading) loading.hide();
      }
    },

    async registerTask() {
      let loading;

      try {
        loading = this.$loading.show();

        const payload = {
          ...this.payload,
          archived: this.payload.archived ? 1 : 0,
          completed: this.payload.completed ? 1 : 0,
        };

        const { message } = (await TasksRequest.create(payload)).data;

        this.showSuccessToast({
          text: message,
        });

        await this.$router.push({ name: 'TodoList' });
      } catch (e) {
        this.showErrorToast({
          text: e.response.data.message,
        });
      } finally {
        if (loading) loading.hide();
      }
    },

    async updateTask() {
      let loading;

      try {
        loading = this.$loading.show();

        const payload = {
          ...this.payload,
          archived: this.payload.archived ? 1 : 0,
          completed: this.payload.completed ? 1 : 0,
        };

        const { message } = (await TasksRequest.update(this.taskId, payload)).data;

        this.showSuccessToast({
          text: message,
        });

        await this.$router.push({ name: 'TodoList' });
      } catch (e) {
        this.showErrorToast({
          text: e.response.data.message,
        });
      } finally {
        if (loading) loading.hide();
      }
    },

    async onCancel() {
      this.$refs.form.reset();

      await this.$router.push({
        name: 'TodoList',
      });
    },
  },
};
</script>

<style scoped>

</style>
