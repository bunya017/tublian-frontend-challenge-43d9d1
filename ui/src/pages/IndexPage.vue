<template>
  <q-stepper
    flat
    animated
    ref="stepper"
    v-model="step"
    color="primary"
    header-class="hidden"
    style="background-color: #121212;"
  >
    <q-step
      :name="1"
      icon="none"
      done-icon="none"
      :done="step > 1"
      title="Get Started"
    >
      <get-started
        :step="step"
        :data="payload"
        @data:ready="toStep2"
        @step:changed="setStep"
      />
    </q-step>
    <q-step
      :name="2"
      icon="none"
      done-icon="none"
      :done="step > 2"
      title="Create Account"
    >
      <create-account
        :step="step"
        :data="payload"
        @data:ready="toStep3"
        @step:changed="setStep"
        :lastname="payload.lastname"
        :firstname="payload.firstname"
      />
    </q-step>

    <q-step
      :name="3"
      icon="none"
      done-icon="none"
      :done="step > 3"
      title="Account Setup"
    >
      <account-setup
        :step="step"
        :data="payload"
        @step:changed="setStep"
      />
    </q-step>

    <q-step
      :name="4"
      icon="none"
      title="Payment"
      done-icon="none"
    >
      <payment-step
        :step="step"
        :data="payload"
        @step:changed="setStep"
      />
    </q-step>
  </q-stepper>
</template>

<script>
import { defineComponent } from 'vue'

import CreateAccount from 'components/steps/CreateAccount.vue'
import AccountSetup from 'components/steps/AccountSetup.vue'
import PaymentStep from 'components/steps/PaymentStep.vue'
import GetStarted from 'components/steps/GetStarted.vue'


export default defineComponent({
  name: 'IndexPage',
  components: { AccountSetup, CreateAccount, GetStarted, PaymentStep },
  data () {
    return {
      step: 1,
      shape: false,
      plan: 'business',
      payment: 'monthly',
      payload: {
        email: '',
        password: '',
        lastname: '',
        firstname: '',
      }
    }
  },
  methods: {
    setStep (step) {
      this.step = step
    },
    toStep2 (payload) {
      this.payload.firstname = payload.firstname
      this.payload.lastname = payload.lastname
      this.$refs.stepper.next()
    },
    toStep3 (payload) {
      this.payload.email = payload.email
      this.payload.password = payload.password
      this.$refs.stepper.next()
    }
  },
  created () {
    this.$q.iconSet.field.error = 'mdi-alert-circle-outline'
  }
})
</script>
