<template>
  <div id="main-section">
    <br> <br>
    <LoginComponent v-if="!publicKey"/>
    <br> <br>
    <WalletTabs v-if="publicKey"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import LoginComponent from "./components/LoginComponent.vue";
import WalletTabs from "./components/WalletTabsComponent.vue";
export default {
  name: 'App',
  components: {LoginComponent, WalletTabs},
  data: () => {
    return {
      isLogged: false,
    }
  },
  computed: {
    ...mapGetters({
      publicKey: 'getPublicKey',
    })
  },
  mounted() {},
  methods: {}
}
</script>

<style>
#main-section {
  text-align: center;
}
</style>