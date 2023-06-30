<template>
  <div class="wallet-area">
    <div class="wallet-recipient">
      <label for="recipient">
        <div class="recipient-labels">
          <small> Public Key</small>
          <small class="copy-btn">
            <v-icon
                color="#DD1A33"
                icon="mdi-content-copy"
                @click="copy"
            ></v-icon>
          </small>
        </div>
        <input type="text"
               ref="recipientInput"
               v-on:focus="$event.target.select()"
               readonly
               :value="publicKey"
        >
      </label>
    </div>
    <div class="wallet-labels">
      <v-row>
        <v-col cols="6" class="text-left"><small>Available balance</small></v-col>
        <v-col cols="6" class="text-right"><b>{{ balance }} AC</b></v-col>
      </v-row>
    </div>

    <v-snackbar v-model="snackbar">
      <div class="text-subtitle-1 pb-2">Public key has been copied!</div>

      <template v-slot:actions>
        <v-btn
            color="indigo"
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
import {mapGetters} from "vuex";

export default {
  name: "SendComponent",
  data: function () {
    return {
      amount: '',
      myPublicKey: '01f0d0b7dfd44d16c5d398d0d702467afa28a9a82ee31b12d69ed187654e29152b',
      snackbar: false,
      paymentGenerator: false,
      total: 0,
      link: '',
    }
  },
  computed: {
    ...mapGetters({
      publicKey: 'getPublicKey',
      balance: 'getBalance',
    })
  },
  methods: {
    copy() {
      this.$refs.recipientInput.focus();
      document.execCommand('copy');
      this.snackbar = true;
    },
  }
}
</script>

<style scoped>
.wallet-area {
  max-width: 400px;
  margin: 0 auto;
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

.recipient-labels {
  display: flex;
  justify-content: space-between;
}

.recipient-labels .copy-btn {
  cursor: pointer;

}
</style>