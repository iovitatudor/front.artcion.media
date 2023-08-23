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
        <v-col cols="6" class="text-right"><b>{{ balance }} ARTC</b></v-col>
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
