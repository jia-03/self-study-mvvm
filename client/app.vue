<template>
  <div id="app">
    <div class="router-link">
      <router-link :to="{name:'MVVM'}">MVVM</router-link>
      <router-link to="/diff">DIFF</router-link>
    </div>

    <router-view />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  components: {},
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
#app {
  width: 80vw;
  text-align: center;
  margin: 20px auto;
}

.router-link {
  margin-bottom: 25px;
  border: 1px solid #666666;
  margin-bottom: 25px;
  border: 1px solid #666;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  border-radius: 8px;

  a {
    margin: 0px 20px;
  }
}
</style>