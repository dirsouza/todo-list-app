<template>
  <v-dialog
    v-model="getValue"
    :persistent="persistent"
    :max-width="maxWidth"
  >
    <v-form ref="formFilter">
      <v-card>
        <v-card-title>
          <span>{{ title }}</span>
        </v-card-title>

        <v-card-text class="pb-0">
          <slot
            name="content"
            :payload="getPayload"
          />
        </v-card-text>

        <v-card-actions class="pt-4">
          <v-spacer />

          <slot name="actions">
            <v-btn
              color="grey darken-1"
              text
              @click="onCancel()"
            >
              {{ $t('commons.cancel') }}
            </v-btn>

            <v-btn
              color="blue darken-3"
              text
              @click="onConfirme()"
            >
              {{ $t('commons.confirme') }}
            </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogFilter',

  props: {
    value: {
      type: Boolean,
    },

    persistent: {
      type: Boolean,
      default: true,
    },

    maxWidth: {
      type: String,
      default: '325px',
    },

    title: {
      type: String,
      required: true,
    },

    payload: {
      type: [String, Number, Boolean, Array, Object],
      default: () => ({}),
    },
  },

  computed: {
    getValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },

    getPayload: {
      get() {
        return this.payload;
      },
      set(value) {
        this.$emit('update:payload', value);
      },
    },
  },

  methods: {
    onCancel() {
      this.$refs.formFilter.reset();
      this.$emit('filter', {});
      this.getValue = false;
    },

    onConfirme() {
      this.$emit('filter', this.payload);
      this.getValue = false;
    },
  },
};
</script>

<style scoped>

</style>
