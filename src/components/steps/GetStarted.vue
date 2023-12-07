<template>
  <q-form ref="step1DataForm" v-on:submit.prevent.stop="emitFormData" class="row">
    <div class="col-6 gt-sm" style="height: 100vh;">
      <q-img
        class="full-height"
        src="~assets/get-started.svg"
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
      <div class="row" style="padding-top: 20px;">
        <div class="col-12 text-h5 text-weight-bold">Get Started</div>
        <div class="col-12 text-grey-3" style="font-size: 16px;">
          Start recruiting streetcred developers, Today!!
        </div>
      </div>
      <div class="row q-col-gutter-y-sm q-pt-md">
        <div class="col-12">
          <q-input
            lazy-rules
            bottom-slots
            hide-bottom-space
            placeholder="First Name"
            v-model="payload.firstname"
            :class="[$q.screen.gt.sm ? 'w-405' : '']"
            :rules="[val => !!val || 'This field is required!']"
          >
            <template v-slot:append>
              <q-icon v-if="payload.firstname.length >= 3" name="mdi-check-circle-outline" color="positive" />
            </template>
          </q-input>
        </div>
        <div class="col-12">
          <q-input
            lazy-rules
            bottom-slots
            hide-bottom-space
            placeholder="Last Name"
            v-model="payload.lastname"
            :class="[$q.screen.gt.sm ? 'w-405' : '']"
            :rules="[val => !!val || 'This field is required!']"
          >
            <template v-slot:append>
              <q-icon v-if="payload.lastname.length >= 3" name="mdi-check-circle-outline" color="positive" />
            </template>
          </q-input>
        </div>
        <div class="col-12">
          <q-btn
            no-caps
            rounded
            type="submit"
            color="primary"
            label="Proceed"
            padding="sm md"
            text-color="dark"
            :class="['q-my-lg', $q.screen.gt.sm ? 'w-405' : 'full-width']"
          />
        </div>
      </div>
      <div class="row text-grey-6 text-body1">
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
import TopBar from 'components/TopBar.vue'


export default defineComponent({
  name: 'GetStarted',
  components: { TopBar },
  emits: ['step:changed', 'data:ready'],
  props: {
    data: {
      type: Object,
      default: null,
      required: false
    },
    step: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      payload: {
        firstname: '',
        lastname: ''
      }
    }
  },
  methods: {
    emitStepChange (step) {
      this.$emit('step:changed', step)
    },
    emitFormData () {
      this.$refs.step1DataForm.validate().then(success => {
        if (success) {
          this.$emit('data:ready', this.payload)
        }
      })
    },
    init () {
      if (!!this.$props.data) {
        this.payload.firstname = this.$props.data.firstname
        this.payload.lastname = this.$props.data.lastname
      }
    }
  },
  mounted () {
    this.init()
  }
})
</script>
