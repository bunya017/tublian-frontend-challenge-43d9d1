<template>
  <div class="row" style="padding-top: 22px;">
    <div class="col-12 q-pa-md q-px-md-xl">
      <top-bar :stacked="$q.screen.lt.md" :step="step" @step:change="emitStepChange" />
      <div class="row justify-center" style="padding-top: 40px;">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 text-center">
          <div class="text-h4 text-weight-bold">Payment Plan</div>
          <div class="text-grey-3 q-pt-sm" style="font-size: 16px;">
            We will customize your experience based on your option.
          </div>
        </div>
      </div>
      <div class="row justify-center q-gutter-x-md q-py-lg">
        <q-card flat bordered class="row q-pa-xs" style="width: 360px; border-radius: 8px;">
          <q-btn
            no-caps
            unelevated
            label="Monthly"
            @click="payment = 'monthly'"
            class="col text-body1 text-weight-bold"
            :color="payment === 'monthly' ? 'brand-primary' : 'dark'"
          />
          <div class="col-auto">
            <div style="width: 4px !important;"></div>
          </div>
          <q-btn
            no-caps
            unelevated
            @click="payment = 'annually'"
            class="col text-body1 text-weight-bold"
            :color="payment === 'annually' ? 'brand-primary' : 'dark'"
          >
            <div class="row justify-center items-center text-weight-bold">
              Annually
              <q-chip size="sm" label="20% Off" text-color="brand-green" color="brand-green-1" />
            </div>
          </q-btn>
        </q-card>
      </div>
      <div class="row justify-center q-gutter-lg">
        <q-card
          flat
          @click="plan = 'pro'"
          :class="[
            'card-xy q-pa-md cursor-pointer',
            plan === 'pro' ? 'card-selected' : ''
          ]"
        >
          <div class="row q-pb-sm">
            <q-btn
              glossy
              unelevated
              label="Pro"
              class="rad-10"
              padding="xs lg"
              color="deep-purple"
            />
          </div>
          <div class="row" style="padding-top: 17px;">
            <div>
              <span class="t-30 text-weight-bold">$19.99</span><span class="text-body1">/Month</span>
            </div>
          </div>
          <div class="row q-pb-sm" style="padding-top: 20px;">
            <div class="text-h6">
              Features:
            </div>
          </div>
          <div class="full-width q-gutter-y-sm">
            <div class="row q-gutter-x-md">
              <div class="col-auto">
                <q-icon name="mdi-check-circle" size="sm" color="brand-green" />
              </div>
              <div class="col">
                Advanced search for developer profiles with filters.
              </div>
            </div>
            <div class="row q-gutter-x-md">
              <div class="col-auto">
                <q-icon name="mdi-check-circle" size="sm" color="brand-green" />
              </div>
              <div class="col">
                Increased monthly messages to developers.
              </div>
            </div>
            <div class="row q-gutter-x-md">
              <div class="col-auto">
                <q-icon name="mdi-check-circle" size="sm" color="brand-green" />
              </div>
              <div class="col">
                Priority support.
              </div>
            </div>
          </div>
          <div class="q-pb-md text-center absolute-bottom">
            <q-btn
              no-caps
              rounded
              unelevated
              color="primary"
              label="Subscribe"
              text-color="dark"
              style="width: 261px;"
            />
          </div>
        </q-card>
        <q-card
          flat
          @click="plan = 'business'"
          :class="[
            'card-xy q-pa-md cursor-pointer',
            plan === 'business' ? 'card-selected' : ''
          ]"
        >
          <div class="row q-pb-sm">
            <q-btn
              glossy
              unelevated
              color="blue"
              class="rad-10"
              padding="xs lg"
              label="Business Plan"
            />
          </div>
          <div class="row" style="padding-top: 17px;">
            <div>
              <span class="t-30 text-weight-bold">$49.99</span><span class="text-body1">/Month</span>
            </div>
          </div>
          <div class="row q-pb-sm" style="padding-top: 20px;">
            <div class="text-h6">
              Features:
            </div>
          </div>
          <div class="full-width q-gutter-y-sm">
            <div class="row q-gutter-x-md">
              <div class="col-auto">
                <q-icon name="mdi-check-circle" size="sm" color="brand-green" />
              </div>
              <div class="col">
                Premium access to developer profiles and advanced search filters.
              </div>
            </div>
            <div class="row q-gutter-x-md">
              <div class="col-auto">
                <q-icon name="mdi-check-circle" size="sm" color="brand-green" />
              </div>
              <div class="col">
                Increased monthly messages to developers.
              </div>
            </div>
            <div class="row q-gutter-x-md">
              <div class="col-auto">
                <q-icon name="mdi-check-circle" size="sm" color="brand-green" />
              </div>
              <div class="col">
                Dedicated account manager for personalized support.
              </div>
            </div>
            <div class="row q-gutter-x-md">
              <div class="col-auto">
                <q-icon name="mdi-check-circle" size="sm" color="brand-green" />
              </div>
              <div class="col">
                Early access to new features and updates.
              </div>
            </div>
          </div>
          <div class="q-pb-md text-center absolute-bottom">
            <q-btn
              no-caps
              rounded
              unelevated
              color="primary"
              label="Subscribe"
              text-color="dark"
              style="width: 261px;"
            />
          </div>
        </q-card>
        <q-card
          flat
          @click="plan = 'enterprise'"
          :class="[
            'card-xy q-pa-md cursor-pointer',
            plan === 'enterprise' ? 'card-selected' : ''
          ]"
        >
          <div class="row q-pb-sm">
            <q-btn
              glossy
              unelevated
              class="rad-10"
              padding="xs lg"
              color="cyan-10"
              label="Enterprise Plan"
            />
          </div>
          <div class="row" style="padding-top: 17px;">
            <div class="t-30 text-weight-bold">
              Custom Pricing
            </div>
          </div>
          <div class="row q-pb-sm" style="padding-top: 20px;">
            <div class="text-h6">
              Features:
            </div>
          </div>
          <div class="full-width q-gutter-y-sm">
            <div class="row q-gutter-x-md">
              <div class="col-auto">
                <q-icon name="mdi-check-circle" size="sm" color="brand-green" />
              </div>
              <div class="col">
                Tailored solutions for large enterprises or agencies.
              </div>
            </div>
            <div class="row q-gutter-x-md">
              <div class="col-auto">
                <q-icon name="mdi-check-circle" size="sm" color="brand-green" />
              </div>
              <div class="col">
                Full access to all platform features, including custom integrations.
              </div>
            </div>
            <div class="row q-gutter-x-md">
              <div class="col-auto">
                <q-icon name="mdi-check-circle" size="sm" color="brand-green" />
              </div>
              <div class="col">
                Unlimited monthly messages to developers.
              </div>
            </div>
            <div class="row q-gutter-x-md">
              <div class="col-auto">
                <q-icon name="mdi-check-circle" size="sm" color="brand-green" />
              </div>
              <div class="col">
                Priority support with 24/7 availability.
              </div>
            </div>
            <div class="q-pb-md text-center absolute-bottom">
              <q-btn
                no-caps
                rounded
                unelevated
                color="primary"
                label="Subscribe"
                text-color="dark"
                style="width: 261px;"
              />
            </div>
          </div>
          <div class="q-pb-md text-center absolute-bottom">
            <q-btn
              no-caps
              rounded
              unelevated
              text-color="white"
              label="Contact Us"
              style="width: 261px;"
              color="brand-primary"
            />
          </div>
        </q-card>
      </div>
      <div class="row justify-center text-body1 q-gutter-x-md q-pt-xl q-pb-lg q-pb-md-none q-mt-xl">
        <a href="" class="text-grey-6" style="text-decoration: none;">Privacy Policy</a>
        <a href="" class="text-grey-6" style="text-decoration: none;">Terms</a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import TopBar from 'components/TopBar.vue'


export default defineComponent({
  name: 'PaymentStep',
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
      plan: '',
      payment: 'monthly',
      payload: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    emitStepChange (step) {
      this.$emit('step:changed', step)
    },
    emitFormData () {
      this.$emit('data:ready', this.payload)
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
.card-xy {
  width: 301px;
  height: 464px;
  border-radius: 20px;
}
.card-xy:hover {
  background: #292929;
}
.card-selected {
  background: linear-gradient(#1e1e1e, #1e1e1e) padding-box,
               linear-gradient(109deg, #FBDA61 0%, rgba(255, 90, 205, 0.84) 86.08%);
  border-radius: 20px;
  border: 1px solid transparent;
}
.card-selected:hover {
  background: #292929;
  background: linear-gradient(#292929, #292929) padding-box,
               linear-gradient(109deg, #FBDA61 0%, rgba(255, 90, 205, 0.84) 86.08%);
  border-radius: 20px;
  border: 1px solid transparent;
}
</style>