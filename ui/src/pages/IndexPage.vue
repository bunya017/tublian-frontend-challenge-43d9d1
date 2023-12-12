<template>
  <div>
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
          @data:ready="toStep4"
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
          @step:changed="setStep"
          :planProp="payload.plan"
          @data:ready="initPayment"
          :intervalProp="payload.interval"
        />
      </q-step>
    </q-stepper>

    <q-dialog persistent v-model="stripeDialog">
      <q-card flat class="hide-scrollbar" style="background-color: transparent !important;">
        <q-card flat class="w-580 rad-20">
          <q-card-section class="row items-center q-pb-sm">
            <div>
              <q-img width="100px" src="images/tublian-logo.svg" />
            </div>
            <q-space />
            <q-btn
              flat
              dense
              round
              size="16px"
              v-close-popup
              color="brand-primary"
              icon="img:images/close-circle-outline.svg"
            />
          </q-card-section>

          <q-card-section>
            <q-card flat bordered class="rad-20" style="background-color: #292929;">
              <q-card-section class="row items-center q-py-sm">
                <div class="text-h6 text-weight-bold">
                  {{ payload.interval === 'year' ? 'Annual' : 'Monthly' }} Plan
                </div>
                <q-space />
                <q-btn
                  flat
                  dense
                  no-caps
                  unelevated
                  color="primary"
                  label="Change Plan"
                >
                  <q-popup-proxy>
                    <q-card flat bordered class="row q-pa-xs" style="width: 360px; border-radius: 8px;">
                      <q-btn
                        dense
                        no-caps
                        unelevated
                        v-close-popup
                        label="Monthly"
                        @click="payload.interval = 'month'"
                        class="col text-body1 text-weight-bold"
                        :color="payload.interval === 'month' ? 'brand-primary' : 'dark'"
                      />
                      <div class="col-auto">
                        <div style="width: 4px !important;"></div>
                      </div>
                      <q-btn
                        dense
                        no-caps
                        unelevated
                        v-close-popup
                        @click="payload.interval = 'year'"
                        class="col text-body1 text-weight-bold"
                        :color="payload.interval === 'year' ? 'brand-primary' : 'dark'"
                      >
                        <div class="row justify-center items-center text-weight-bold">
                          Annually
                          <q-chip dense size="sm" label="20% Off" text-color="brand-green" color="brand-green-1" />
                        </div>
                      </q-btn>
                    </q-card>
                  </q-popup-proxy>
                </q-btn>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="row">
                  <q-btn
                    dense
                    glossy
                    no-caps
                    unelevated
                    :color="payload.plan === 'business' ? 'blue' : 'deep-purple'"
                    class="rad-10"
                    padding="none md"
                    :label="payload.plan === 'business' ? 'Business Plan' : 'Pro'"
                  />
                </div>
                <div class="row items-center q-pt-sm">
                  <div class="text-body1 text-weight-bold">Total:</div>
                  <q-space />
                  <div class="row items-center">
                    <span class="text-body1 text-grey-6">USD</span>
                    <div class="q-pl-sm">
                      <span class="t-30 text-weight-bold">${{ amountToBePaid }}</span>
                      <span class="text-body1 text-grey-6">/Month</span>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>

          <q-card-section>
            <div class="text-h6 text-weight-bold">Payment Method</div>
            <div class="text-grey-6">Choose how you'd like to pay.</div>
          </q-card-section>

          <q-card-section>
            <form id="payment-form">
              <div id="payment-element">
                <!-- Elements will create form elements here -->
              </div>

              <div class="q-pt-lg q-pb-md text-grey-4">
                By clicking below, you agree to our <span class="text-primary">Terms, Privacy Policy</span>
                and <span class="text-primary">Automatic Renewal</span>. Tublian will charge you
                ${{ amountToBePaid }} (plus Tax) each month until you cancel you subscription in account settings.
              </div>
              <q-btn
                no-caps
                rounded
                unelevated
                type="submit"
                color="primary"
                text-color="dark"
                class="full-width"
                @click="stripeDialog = true"
                :label="`Pay $${amountToBePaid}`"
              />
              <div id="error-message">
                <!-- Display error message to your customers here -->
              </div>
            </form>
          </q-card-section>

          <q-inner-loading
            :showing="loading"
            label="Please wait..."
            label-class="text-h6 text-white"
          />
        </q-card>
        <div class="row q-gutter-x-md q-pt-sm q-mb-lg q-pb-xl">
          <q-img fit width="280px" src="images/stripe-footer.svg" />
        </div>
      </q-card>
    </q-dialog>

    <q-dialog persistent v-model="successDialog">
      <q-card flat class="w-580 rad-20">
        <q-img class="rad-20" src="~assets/payment-success.svg">
          <div class="row" style="background-color: transparent;">
            <q-img width="100px" src="images/tublian-logo.svg" />
          </div>
          <div :class="['absolute-center', $q.screen.lt.sm ? 'q-mt-md' : '']" style="background-color: transparent;">
            <q-icon :size="$q.screen.lt.sm ? '120px' : '200px'" name="img:images/tick-success.svg" />
          </div>
        </q-img>

        <q-card-section class="text-center q-pa-lg">
          <div class="text-h5 text-weight-bold">Payment Successful</div>
          <div class="text-grey-3 text-body1 q-pt-sm q-pb-lg q-mb-md" style="font-size: 16px;">
            Your payment went through successfully.
          </div>
          <q-btn
            no-caps
            rounded
            unelevated
            v-close-popup
            color="primary"
            label="Proceed"
            text-color="dark"
            class="full-width"
            @click="clear()"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { createMetaMixin } from 'quasar'

import CreateAccount from 'components/steps/CreateAccount.vue'
import AccountSetup from 'components/steps/AccountSetup.vue'
import PaymentStep from 'components/steps/PaymentStep.vue'
import GetStarted from 'components/steps/GetStarted.vue'


const metaData = {
  script: {
    stripeScript: { src: 'https://js.stripe.com/v3/' }
  }
}

export default defineComponent({
  name: 'IndexPage',
  mixins: [createMetaMixin(metaData)],
  components: { AccountSetup, CreateAccount, GetStarted, PaymentStep },
  data () {
    return {
      step: 4,
      loading: false,
      stripeDialog: false,
      successDialog: false,
      payload: {
        email: 'gfg@vbnv.com',
        password: 'ghfghWW##$$$$%',
        lastname: 'gjfhgh',
        firstname: 'ghfghfg',
        plan: 'business',
        interval: 'month',
        purpose: 'personal',
        payment_amount: null
      }
    }
  },
  computed: {
    amountToBePaid () {
      return !!this.payload.payment_amount
        ? (this.payload.payment_amount / 100).toFixed(2)
        : 0
    }
  },
  watch: {
    'payload.interval' () {
      if (!!this.stripeDialog){
        this.payload.payment_amount = this.getPaymentAmount()
        return this.setupPayment()
      }
    }
  },
  methods: {
    clear () {
      this.step = 1
      this.loading = false
      this.stripeDialog = false
      this.payload = {
        plan: '',
        email: '',
        purpose: '',
        password: '',
        lastname: '',
        firstname: '',
        interval: 'month',
        payment_amount: null
      }
    },
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
    },
    toStep4 (payload) {
      if (!!payload.purpose) {
        this.payload.purpose = payload.purpose
        this.$refs.stepper.next()
      }
    },
    getPaymentAmount () {
      const COST = {
        pro: 1999,
        business: 4999
      }
      let amount = COST[this.payload.plan]
      if (this.payload.interval === 'year') {
        amount *= (12 * 0.8)
      }
      return Math.trunc(amount)
    },
    async setupPayment () {
      this.loading = true
      this.stripeDialog = true
      const stripe = Stripe(process.env.STRIPE_KEY)

      const response = await fetch(`${process.env.API}/subscriptions/create-checkout-session`, {
        method: 'POST',
        body: JSON.stringify(this.payload),
        headers: {'Content-Type': 'application/json'}
      })
      const { clientSecret } = await response.json()
      const options = {
      }
      const appearance = {
        theme: 'night',
        labels: 'floating',
        variables: {
          fontFamily: 'Space Grotesk, sans-serif',
          colorTextSecondary: 'white',
          colorBackground: '#121212',
          fontWeightNormal: '500',
          colorPrimary: '#E8C74F',
          borderRadius: '10px',
          colorText: 'white',
          logoColor: 'dark'
        },
        rules: {
          '.Input': {
          }
        }
      }

      // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in a previous step
      const elements = stripe.elements({
        clientSecret,
        appearance,
        fonts: [
          { cssSrc: 'https://fonts.googleapis.com/css2?family=Space+Grotesk' }
        ]
      })

      // Create and mount the Payment Element
      const paymentElement = elements.create('payment', options)
      paymentElement.mount('#payment-element')
      this.loading = false
      paymentElement.on('ready', () => {
        this.addPaymentSubmitEvent(elements, stripe)
      })
    },
    async initPayment (payload) {
      this.payload.plan = payload.plan
      this.payload.interval = payload.interval
      this.payload.payment_amount = payload.payment_amount
      await this.setupPayment()
    },
    async addPaymentSubmitEvent (elements, stripe) {
      const form = document.getElementById('payment-form')
      form.addEventListener('submit', async (event) => {
        event.preventDefault()
        this.loading = true
        const {error} = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          redirect: 'if_required'
        });

        if (error) {
          // This point will only be reached if there is an immediate error when
          // confirming the payment. Show error to your customer (for example, payment
          // details incomplete)
          const messageContainer = document.querySelector('#error-message');
          messageContainer.textContent = error.message;
        } else {
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
          this.successDialog = true
          this.loading = false
        }
      })
    }
  },
  created () {
    this.$q.iconSet.field.error = 'mdi-alert-circle-outline'
  }
})
</script>
