<template>
  <div class="wallet-recipient">
    <label for="recipient">
      <div class="recipient-labels">
        <small>Total (ARTC)</small>
      </div>
      <input type="number" v-model="total">
    </label>
  </div>
  <div class="wallet-buttons">
    <v-row>
      <v-col cols="12">
        <v-btn block color="#DD1A33" class="text-white" @click="generateLink">Generate</v-btn>
      </v-col>
    </v-row>
  </div>
  <div class="wallet-recipient" v-if="link">
    <label for="recipient">
      <div class="recipient-labels">
        <small> Link</small>
        <small class="copy-btn">
          <v-icon
              color="#DD1A33"
              icon="mdi-content-copy"
              @click="copy"
          ></v-icon>
        </small>
      </div>
      <input type="text"
             ref="linkInput"
             v-on:focus="$event.target.select()"
             readonly
             :value="link"
      >
    </label>
  </div>
  <v-snackbar v-model="snackbar">
    <div class="text-subtitle-1 pb-2">Link has been copied!</div>
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
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "PaymentGenerator",
  data: function () {
    return {
      snackbar: false,
      total: '',
      link: null,
    }
  },
  computed: {
    ...mapGetters({
      publicKey: 'getPublicKey',
    }),
  },
  mounted() {
    const params = new URLSearchParams(window.location.search)

    if (params.has('receive_total')) {
      this.total = params.get('receive_total');
      this.generateLink();
    }
  },
  methods: {
    copy() {
      this.$refs.linkInput.focus();
      document.execCommand('copy');
      this.snackbar = true;
    },
    generateLink() {
      this.link = `${process.env.VUE_APP_FRONTEND_URL}/?publicKey=${this.publicKey}&total=${this.total}`
    }
  }
}
</script>

<style scoped>

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

.wallet-buttons {
  margin: 30px auto;
}
</style>