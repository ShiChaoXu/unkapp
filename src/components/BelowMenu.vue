<template>
    <div v-if="isShow" style="">
    <tabbar>
      <tabbar-item icon-class="iconfont icon-zuanshi_o" link="/P1" selected>
        <i slot="icon"/>
        <span slot="label" class="belowLabel">通证行情</span>
      </tabbar-item>
      
      <tabbar-item icon-class="iconfont icon-jiqiren_o" link="/P2">
        <i slot="icon"/>
        <span slot="label" class="belowLabel">通证助手</span>
      </tabbar-item>
      
      <tabbar-item icon-class="iconfont icon-xinwen" link="/P3">
        <i slot="icon"/>
        <span slot="label" class="belowLabel">资讯</span>
      </tabbar-item>

      
      <tabbar-item icon-class="iconfont icon-gerentouxiang" link="/P4">
        <i slot="icon"/>
        <span slot="label" class="belowLabel">我的</span>
      </tabbar-item>
    </tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vux";

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      hello: true,
      isShow: this.Global.CurrentUser != null
    };
  },
  watch: {
    $route(to, from) {
      if (to.path == "/RegAccout") {
        this.isShow = false;
      } else {
        this.isShow = this.Global.CurrentUser != null;
        if (!this.isShow) {
          if (typeof this.$route.push == "function") {
            this.$route.push({
              path: "/Login"
            });
          }
        }
      }
    },
    deep: true
  }
};
</script>
<style>
</style>
