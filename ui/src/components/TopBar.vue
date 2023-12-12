<template>
  <div :class="['row', stacked ? '' : 'justify-between']">
    <div :class="[stacked ? 'col-12' : 'col']">
      <q-img width="112px" src="images/tublian-logo.svg" />
    </div>
    <div :class="[stacked ? 'col-12' : 'col text-right']">
      <div class="q-gutter-x-sm">
        <q-btn
          flat
          dense
          no-caps
          padding="0px xs"
          label="1: Get Started"
          @click="emitStepChange(1)"
          :color="step >= 1 ? 'brand-primary' : 'grey-8'"
        />
        <q-btn
          flat
          dense
          no-caps
          padding="0px xs"
          :disable="step < 2"
          label="2: Create Account"
          @click="emitStepChange(2)"
          :color="step >= 2 ? 'brand-primary' : 'grey-6'"
        />
        <q-btn
          flat
          dense
          no-caps
          padding="0px xs"
          :disable="step < 3"
          label="3: Account Setup"
          @click="emitStepChange(3)"
          :color="step >= 3 ? 'brand-primary' : 'grey-6'"
        />
        <q-btn
          flat
          dense
          no-caps
          padding="0px xs"
          label="4. Payment"
          :disable="step < 4"
          @click="emitStepChange(4)"
          :color="step == 4 ? 'brand-primary' : 'grey-6'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopBar',
  emits: ['step:change'],
  props: {
    stacked: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      required: true
    }
  },
  methods: {
    emitStepChange (step) {
      this.$emit('step:change', step)
    }
  }
})
</script>
