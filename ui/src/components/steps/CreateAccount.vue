<template>
  <q-form ref="step2DataForm" v-on:submit.prevent.stop="emitFormData" class="row">
    <div class="col-6 gt-sm" style="height: 100vh;">
      <q-img
        class="full-height"
        src="~assets/create-accout.svg"
      />
    </div>
    <div
      style="height: calc(100vh);"
      :class="[
        'col-12 col-md-6 q-px-md-xl relative-position',
        $q.screen.gt.sm ? 'pt-40' : 'q-pa-md'
      ]"
    >
      <top-bar stacked :step="step" @step:change="emitStepChange" />
      <div class="row q-pb-xs" style="padding-top: 20px;">
        <div class="col-12 text-h5 text-weight-bold">Create Account</div>
        <div class="col-12 text-grey-3" style="font-size: 16px;">
          Creating Account for <span class="text-blue">@{{ $props.data.firstname }} {{ $props.data.lastname }}</span>
        </div>
      </div>
      <div class="row q-col-gutter-y-sm q-pt-md">
        <div class="col-12">
          <q-input
            lazy-rules
            bottom-slots
            hide-bottom-space
            placeholder="Email"
            v-model="payload.email"
            :class="[$q.screen.gt.sm ? 'w-405' : '']"
            :rules="[
              val => !!val || 'This field is required!',
              val => isValidEmail(val) || 'This email is invalid!'
            ]"
          >
            <template v-slot:append>
              <q-icon
                v-if="isValidEmail(payload.email)"
                name="mdi-check-circle-outline"
                color="positive"
              />
            </template>
          </q-input>
        </div>
        <div class="col-12">
          <q-input
            lazy-rules
            bottom-slots
            type="password"
            hide-bottom-space
            placeholder="Password"
            v-model="payload.password"
            :class="[$q.screen.gt.sm ? 'w-405' : '']"
            :rules="[val => !!val || 'This field is required!']"
          >
            <template v-slot:append>
              <q-icon
                v-if="isValidPassword(payload.password)"
                name="mdi-check-circle-outline"
                color="positive"
              />
            </template>
            <template v-slot:hint>
              <div class="row q-col-gutter-y-sm items-center">
                <div class="col-6">
                  <div
                    :class="[
                      'row items-center',
                      has8Chars(payload.password) ? 'text-positive' : 'text-grey'
                    ]"
                  >
                    <q-icon name="mdi-check-circle-outline" size="14px" />
                    <span class="q-pl-sm">8 Characters minimum</span>
                  </div>
                </div>
                <div class="col-6">
                  <div
                    :class="[
                      'row items-center',
                      hasUpperCase(payload.password) ? 'text-positive' : 'text-grey'
                    ]"
                  >
                    <q-icon name="mdi-check-circle-outline" size="14px" />
                    <span class="q-pl-sm">One uppercase character</span>
                  </div>
                </div>
                <div class="col-6">
                  <div
                    :class="[
                      'row items-center',
                      hasSymbol(payload.password) ? 'text-positive' : 'text-grey'
                    ]"
                  >
                    <q-icon name="mdi-check-circle-outline" size="14px" />
                    <span class="q-pl-sm">One symbol character</span>
                  </div>
                </div>
              </div>
            </template>
          </q-input>
        </div>
        <div class="col-12">
          <q-btn
            no-caps
            rounded
            type="submit"
            label="Proceed"
            padding="sm md"
            color="primary"
            text-color="dark"
            :class="['q-mt-lg', $q.screen.gt.sm ? 'w-405' : 'full-width']"
          />
          <div :class="['row items-center q-py-sm', $q.screen.gt.sm ? 'w-405' : 'full-width']">
            <div class="col">
              <q-separator />
            </div>
            <div class="col-auto q-px-sm">
              Or
            </div>
            <div class="col">
              <q-separator />
            </div>
          </div>
          <q-btn
            no-caps
            rounded
            unelevated
            padding="sm md"
            label="Sign up with Google"
            icon="img:icons/google.svg"
            :class="['card-selected', $q.screen.gt.sm ? 'w-405' : 'full-width']"
          />
        </div>
      </div>
      <div class="row text-grey-6 text-body1 q-pt-sm">
        Already have an account? <a href="" class="q-pl-sm text-white">Log in</a>
      </div>
      <div
        :class="['text-body1 absolute-bottom q-gutter-x-md q-pl-md-xl q-pb-md',
          $q.screen.gt.sm ? '' : 'text-center'
        ]"
      >
        <a href="" class="text-grey-6" style="text-decoration: none;">Privacy Policy</a>
        <a href="" class="text-grey-6" style="text-decoration: none;">Terms</a>
      </div>
    </div>
  </q-form>
</template>

<script>
import { defineComponent } from 'vue'
import { patterns } from 'quasar'

import TopBar from 'components/TopBar.vue'


export default defineComponent({
  name: 'CreateAccount',
  components: { TopBar },
  emits: ['step:changed', 'data:ready'],
  props: {
    step: {
      type: Number,
      required: true
    },
    data: {
      type: Object,
      default: null,
      required: true
    }
  },
  data () {
    return {
      payload: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    isValidEmail (payload) {
      const { testPattern } = patterns
      return testPattern.email(payload)
    },
    hasSymbol (payload) {
      return /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(payload)
    },
    hasUpperCase (payload) {
      return /[A-Z]/.test(payload)
    },
    has8Chars (payload) {
      return payload.length >= 8
    },
    isValidPassword (payload) {
      return /(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])^[^ ]+$/.test(payload)
    },
    emitStepChange (step) {
      this.$emit('step:changed', step)
    },
    emitFormData () {
      this.$refs.step2DataForm.validate().then(success => {
        if (success) {
          this.$emit('data:ready', this.payload)
        }
      })
    },
    init () {
      this.payload.email = !!this.$props.data.email ? this.$props.data.email : ''
      this.payload.password = !!this.$props.data.password ? this.$props.data.password : ''
    }
  },
  mounted () {
    this.init()
  }
})
</script>

<style scoped>
.my-btn, .q-btn__wrapper::before {
  border: 1px solid;
  background: linear-gradient(109deg, #FBDA61 0%, rgba(255, 90, 205, 0.84) 86.08%) !important;
  background-clip: text;
  -webkit-background-clip: text;
}
</style>