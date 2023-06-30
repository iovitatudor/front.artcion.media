<template>
  <v-card class="wallet-area">
    <v-tabs
        v-model="tab"
        color="#DD1A33"
        align-tabs="center"
    >
      <v-tab value="send" block>Send</v-tab>
      <v-tab value="receive" block>Receive</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="send">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <SendComponent/>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>

      <v-window-item value="receive">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <ReceiveComponent v-if="!paymentGenerator"/>
              <p class="generate-payment-link text-left"
                 v-if="paymentGenerator"
                 @click="paymentGenerator = false">
                <v-icon icon="mdi-arrow-left"></v-icon>
                Back
              </p>
              <PaymentGenerator v-if="paymentGenerator"/>
              <p class="generate-payment-link"
                 v-if="!paymentGenerator"
                 @click="paymentGenerator = true">
                Generate payment link
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import SendComponent from "./SendComponent.vue";
import ReceiveComponent from "./ReceiveComponent.vue";
import PaymentGenerator from "./PymentGeneratorComponent.vue";
import axios from 'axios';

export default {
  components: {SendComponent, ReceiveComponent, PaymentGenerator},
  data: () => ({
    tab: null,
    paymentGenerator: false,
  }),
  mounted() {
    this.getBalance();
  },
  computed: {
    ...mapGetters({
      publicKey: 'getPublicKey',
    })
  },
  methods: {
    ...mapActions({
      storeBalance: 'storeBalance',
    }),
    async getBalance() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/balance?publicKey=${this.publicKey}`);
        await this.storeBalance(response.data.balance);
      } catch (e) {
        alert(e);
      }
    }
  },
}
</script>

<style scoped>
.wallet-area {
  max-width: 400px;
  margin: 0 auto;
}

.generate-payment-link {
  cursor: pointer;
  color: #DD1A33;
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 30px;
}

.generate-payment-link:hover {
  color: #DD1A33;
}
.v-card--variant-elevated {
  box-shadow: none;
}
</style>