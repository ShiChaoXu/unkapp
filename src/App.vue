<template>
  <div id="app">
    <router-view></router-view>
    <below-menu :isShow="isShow"></below-menu>  
  </div>
</template>

<script>
import BelowMenu from "@/components/BelowMenu";
import { defaultCoreCipherList } from "constants";
export default {
  name: "app",
  components: {
    BelowMenu
  },
  data() {
    return {
      isShow: this.Global.CurrentUser != null
    };
  },
  methods: {
    getQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.href.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }
  },
  created: function() {
    if (window.location.href.indexOf("RegAccout?phone") != -1) {
      this.isShow = false;
    } else {
      if (!this.isShow) {
        this.$router.push({
          path: "/Login"
        });
      }
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
  font-size: 18px !important;
}
</style>
