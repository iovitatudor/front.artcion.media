<template>
  <div class="wallet-area">
    <div class="wallet-input">
      <input type="number"
             v-model="amount"
             id="amount"
             placeholder="0"
             autocomplete="off"
             @keyup="validateAmount"
      >
      <label for="amount">AC</label>
    </div>
    <div class="wallet-labels">
      <v-row>
        <v-col cols="6" class="text-left"><small>Available to send</small></v-col>
        <v-col cols="6" class="text-right"><b>{{ balance }} AC</b></v-col>
      </v-row>
    </div>
    <div class="wallet-recipient">
      <label for="recipient"><small> Public Key</small>
        <input type="text" v-model="publicKey" placeholder="">
      </label>
    </div>
    <div class="wallet-buttons">
      <v-row>
        <v-col cols="12">
          <v-btn block :disabled="!amount || !publicKey" @click="transfer" color="#DD1A33" class="text-white">Continue
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block :disabled="!amount || !publicKey" @click="cancelTransfer">Cancel</v-btn>
        </v-col>
      </v-row>
    </div>

    <v-snackbar v-model="snackbar">
      <div v-if="hash" class="text-subtitle-1 pb-2">Transfer Completed Successfully!</div>
      <p v-if="hash">HASH - <small>{{ hash }}</small></p>
      <p v-if="error"><small>{{ error }}</small></p>
      <template v-slot:actions>
        <v-btn
            color="#DD1A33" class="text-white"
            variant="text"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "SendComponent",
  data: function () {
    return {
      amount: null,
      publicKey: null,
      snackbar: false,
      hash: null,
      error: null,
    }
  },
  computed: {
    ...mapGetters({
      balance: 'getBalance',
      myPublicKey: 'getPublicKey',
    })
  },
  mounted() {
    const params = new URLSearchParams(window.location.search)

    if (params.has('total')) {
      this.amount = params.get('total');
    }
    if (params.has('publicKey')) {
      this.publicKey = params.get('publicKey');
    }
  },
  methods: {
    ...mapActions({
      storeBalance: 'storeBalance',
    }),
    validateAmount() {
      if (this.amount >= this.balance) {
        this.amount = this.balance
      }
    },
    cancelTransfer() {
      this.amount = null;
      this.publicKey = null;
    },
    async transfer() {
      if (this.balance > 0) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/transfer?to=${this.publicKey}&from=${this.myPublicKey}&amount=${this.amount}`);
          this.hash = response.data;
          this.snackbar = true;
          if (this.hash) {
            await this.storeBalance((this.balance - this.amount) * 1000000000);
          }
          this.cancelTransfer();
          setTimeout(() => { this.hash = null }, 10000);
        } catch (e) {
          this.error = e.response.data;
          this.snackbar = true;
          setTimeout(() => { this.error = null }, 10000);
        }
      } else {
        this.error = "You don't have enough funds!";
        this.snackbar = true;
        setTimeout(() => { this.error = null}, 10000);
      }
    }
  }
}
</script>

<style scoped>
.wallet-area {
  max-width: 400px;
  margin: 0 auto;
}

.wallet-input {
  position: relative;
}

.wallet-input input {
  text-align: center;
  height: 100px;
  font-size: 50px;
  outline: none;
  border: none;
  color: #999;
  font-weight: 600;
  width: 100%;
  padding-left: 20px;
}

.wallet-input::before {
  position: absolute;
  content: "";
  width: 20px;
  height: 100%;
  top: 0;
  right: 0;
  display: block;
  background-color: #FFF;
}

.wallet-input label {
  color: #999;
  font-size: 18px;
}

.wallet-labels {
  margin: 40px auto;
  background-color: #EEE;
  border-radius: 10px;
  padding: 0 20px;
}

.wallet-buttons {
  margin: 40px auto 10px auto;
}

.wallet-recipient {
  background-color: #EEE;
  border-radius: 10px;
  padding: 10px;
}

.wallet-recipient label {
  text-align: left;
  display: block;
  font-size: 14px;
}

.wallet-recipient input {
  display: block;
  margin: 10px 5px;
  background-color: #DDD;
  width: calc(100% - 10px);
  height: 40px;
  border-radius: 10px;
  font-size: 12px;
  border: none;
  outline: none;
  padding: 0 10px;

}
</style>