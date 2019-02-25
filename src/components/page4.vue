<template>
  <div>
    <meta name="format-detection" content="telephone=yes">
    <x-header title="我的" :left-options="{showBack: false}"></x-header>
    <div class="vux-demo">
      <img
        class="logo"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548769144935&di=02d6968f96d82641037e772600ca413b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01786557e4a6fa0000018c1bf080ca.png%401280w_1l_2o_100sh.png"
        style="border-radius:50px"
      >
      <h3>{{GetCurrentUserName}}</h3>
    </div>
    <group>
      <cell is-link title="安全设置" :link="{path:'/SystemSetting'}"></cell>
      <cell is-link title="系统公告"></cell>
      <a href="tel:13681525763">
        <div class="weui-cell vux-tap-active weui-cell_access">
          <div class="weui-cell__hd"></div>
          <div class="vux-cell-bd vux-cell-primary">
            <p>
              <label class="vux-label">联系我们</label>
            </p>
            <span class="vux-label-desc"></span>
          </div>
          <div class="weui-cell__ft">
            <!---->
          </div>
        </div>
      </a>
    </group>
    <group>
      <x-button
        action-type="button"
        plain
        type="primary"
        @click.native="UserQuit"
        :show-loading="isLoading"
      >退出</x-button>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XButton } from "vux";

export default {
  components: {
    XHeader,
    Group,
    Cell,
    XButton
  },
  data() {
    return {
      message: "hello UNK",
      isLoading: false
    };
  },
  methods: {
    UserQuit() {
      console.log("Run this");
      this.Global.CurrentUser = null;
      this.$router.push({
        path: "/Login"
      });
    }
  },
  computed: {
    GetCurrentUserName: function() {
      return this.Global.CurrentUser.UserName;
    }
  },
  created: function() {
    
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
  height: 170px;
  margin-top: 15px;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>