<template>
  <div id="main-section">
    <div class="main-section-inside">
      {{ publicKey }}
      <v-btn type="button" @click="logIn" v-if="!isLogged" color="#DD1A33" class="text-white">
        Login with Casper
      </v-btn>
      <div v-else>
        Public Key - {{ setPublicKey }}
      </div>

      <div v-if="messages.installChrome">
        Please install casper wallet in your browser:
        <a href="https://chrome.google.com/webstore/detail/casper-wallet/abkahkcbhngaebpcgfmhkoioedceoigp"
           target="_blank">
          https://chrome.google.com/webstore/detail/casper-wallet/abkahkcbhngaebpcgfmhkoioedceoigp
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'LoginComponent',
  components: {},
  data: () => {
    return {
      isLogged: false,
      setPublicKey: null,
      provider: {},
      messages: {
        installChrome: false,
      }
    }
  },
  computed: {
    ...mapGetters({
      publicKey: 'getPublicKey',
    })
  },
  mounted() {
    console.log(window.CasperWalletProvider);
  },
  methods: {
    ...mapActions({
      storePublicKey: 'storePublicKey',
    }),
    logIn() {
      if (window.CasperWalletProvider) {
        const CasperWalletProvider = window.CasperWalletProvider;
        this.provider = CasperWalletProvider();

        this.provider.requestConnection().then(connected => {
          if (!connected) {
            alert("Couldn't connect to wallet");
          } else {
            this.provider.getActivePublicKey().then(publicKey => {
              this.setPublicKey = publicKey;
              this.storePublicKey(publicKey);
              this.isLogged = true;
            }).catch(error => {
              alert(error.message);
            });
          }
        });
      } else {
        this.messages.installChrome = true;
      }
    },
  }
}
</script>

<style>
#main-section {
  text-align: center;
}
.main-section-inside{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>