<template>
  <div class="row" style="padding-top: 22px;">
    <div class="col-12 q-pa-md">
      <top-bar :stacked="$q.screen.lt.md" :step="step" @step:change="emitStepChange" />
      <div class="row justify-center pt-40">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 text-center">
          <div class="text-h4 text-weight-bold">How are you planning to use Tublian?</div>
          <div class="text-grey-3 q-pt-sm" style="font-size: 16px;">
            We will customize your experience based on your option.
          </div>
        </div>
      </div>
      <div class="row justify-center lt-md pt-40">
        <div class="col-12 q-gutter-y-md col-sm-10 col-md-8 col-lg-6">
          <q-card
            flat
            @click="purpose = 'team'"
            :class="[
              'q-pa-md rad-20 cursor-pointer',
              purpose === 'team' ? 'card-selected' : ''
            ]"
          >
            <q-item class="q-pa-none">
              <q-item-section avatar>
                <q-img width="71px" height="56px" fit src="~assets/team-work-rafiki.svg" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h6 text-weight-bold">Team Projects</q-item-label>
                <q-item-label class="text-body2">Hire developers for team projects.</q-item-label>
              </q-item-section>

              <q-item-section avatar class="q-pl-xs">
                <q-radio
                  dense
                  size="lg"
                  val="team"
                  v-model="purpose"
                  checked-icon="img:images/tick-circle.svg"
                  unchecked-icon="img:images/dark-circle.svg"
                />
              </q-item-section>
            </q-item>
          </q-card>
          <q-card
            flat
            @click="purpose = 'personal'"
            :class="[
              'q-pa-md rad-20 cursor-pointer',
              purpose === 'personal' ? 'card-selected' : ''
            ]"
          >
            <q-item class="q-pa-none">
              <q-item-section avatar>
                <q-img width="71px" height="56px" fit src="~assets/collab-rafiki.svg" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h6 text-weight-bold">Personal Projects</q-item-label>
                <q-item-label class="text-body2">Hire developers for personal projects..</q-item-label>
              </q-item-section>

              <q-item-section avatar class="q-pl-xs">
                <q-radio
                  dense
                  size="lg"
                  val="personal"
                  v-model="purpose"
                  checked-icon="img:images/tick-circle.svg"
                  unchecked-icon="img:images/dark-circle.svg"
                />
              </q-item-section>
            </q-item>
          </q-card>
          <q-card
            flat
            @click="purpose = 'recruiting'"
            :class="[
              'q-pa-md rad-20 cursor-pointer',
              purpose === 'recruiting' ? 'card-selected' : ''
            ]"
          >
            <q-item class="q-pa-none">
              <q-item-section avatar>
                <q-img width="71px" height="56px" fit src="~assets/people-search-rafiki.svg" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h6 text-weight-bold">Recruiting</q-item-label>
                <q-item-label class="text-body2">Recruit developers for outstanding companies.</q-item-label>
              </q-item-section>

              <q-item-section avatar class="q-pl-xs">
                <q-radio
                  dense
                  size="lg"
                  val="recruiting"
                  v-model="purpose"
                  checked-icon="img:images/tick-circle.svg"
                  unchecked-icon="img:images/dark-circle.svg"
                />
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
      <div class="row justify-center q-gutter-md gt-sm pt-40">
        <q-card
          flat
          @click="purpose = 'team'"
          :class="[
            'card-xx q-px-md q-py-sm cursor-pointer',
            purpose === 'team' ? 'card-selected' : ''
          ]"
        >
          <div class="row justify-end q-pt-xs q-pb-sm">
            <q-radio
              dense
              size="lg"
              val="team"
              v-model="purpose"
              checked-icon="img:images/tick-circle.svg"
              unchecked-icon="img:images/dark-circle.svg"
            />
          </div>
          <div class="row justify-center items-center">
            <q-img fit height="116px" width="198px" src="~assets/team-work-rafiki.svg" />
            <q-card-section class="q-py-md q-px-xs text-center">
              <div class="text-h5 text-weight-bold">Team Projects</div>
              <div class="text-grey-3 q-pt-sm" style="font-size: 16px;">
                Hire developers for team projects.
              </div>
            </q-card-section>
          </div>
        </q-card>
        <q-card
          flat
          @click="purpose = 'personal'"
          :class="[
            'card-xx q-px-md q-py-sm cursor-pointer',
            purpose === 'personal' ? 'card-selected' : ''
          ]"
        >
          <div class="row justify-end q-pt-xs q-pb-sm">
            <q-radio
              dense
              size="lg"
              val="personal"
              v-model="purpose"
              checked-icon="img:images/tick-circle.svg"
              unchecked-icon="img:images/dark-circle.svg"
            />
          </div>
          <div class="row justify-center items-center">
            <q-img fit height="116px" width="178px" src="~assets/collab-rafiki.svg" />
            <q-card-section class="q-py-md q-px-xs text-center">
              <div class="text-h5 text-weight-bold">Personal Projects</div>
              <div class="text-grey-3 q-pt-sm" style="font-size: 16px;">
                Hire developers for personal projects.
              </div>
            </q-card-section>
          </div>
        </q-card>
        <q-card
          flat
          @click="purpose = 'recruiting'"
          :class="[
            'card-xx q-px-md q-py-sm cursor-pointer',
            purpose === 'recruiting' ? 'card-selected' : ''
          ]"
        >
          <div class="row justify-end q-pt-xs q-pb-sm">
            <q-radio
              dense
              size="lg"
              val="recruiting"
              color="green"
              v-model="purpose"
              checked-icon="img:images/tick-circle.svg"
              unchecked-icon="img:images/dark-circle.svg"
            />
          </div>
          <div class="row justify-center items-center">
            <q-img fit height="116px" width="189px" src="~assets/people-search-rafiki.svg" />
            <q-card-section class="q-py-md q-px-xs text-center">
              <div class="text-h5 text-weight-bold">Recruiting</div>
              <div class="text-grey-3 q-pt-sm" style="font-size: 16px;">
                Recruit developers for outstanding companies.
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>
      <div class="row justify-center q-pt-md">
        <div class="col-12 q-gutter-y-md col-sm-10 col-md-8 col-lg-6 text-center">
          <q-btn
            no-caps
            rounded
            type="submit"
            label="Proceed"
            padding="sm md"
            color="primary"
            text-color="dark"
            :class="['q-mt-xl', $q.screen.gt.sm ? 'w-405' : 'full-width']"
          />
        </div>
      </div>
      <div class="row justify-center text-body1 q-gutter-x-md q-pl-md-xl q-pb-md q-my-xl">
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
  name: 'AccountSetup',
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
      purpose: '',
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

.card-xx {
  width: 250px;
  height: 288px;
  border-radius: 20px;
}
.card-xy {
  width: 301px;
  height: 464px;
  border-radius: 20px;
}
.card-xx:hover, .card-xy:hover {
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