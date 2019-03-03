<template>
  <div>
    <meta name="format-detection" content="telephone=yes">
    <x-header title="登陆密码" :left-options="{showBack: true}"></x-header>
    <group>
      <x-input
        title="原登录密码"
        :min="4"
        :max="10"
        :required="true"
        type="password"
        placeholder="请输入原登录密码"
        v-model="oldPwd"
      ></x-input>

      <x-input
        title="输入密码"
        :min="4"
        :max="10"
        :required="true"
        type="password"
        placeholder="请输入登录密码"
        v-model="firstPwd"
      ></x-input>
      <x-input
        title="确认密码"
        :min="4"
        :max="10"
        :required="true"
        type="password"
        placeholder="请确认登录密码"
        v-model="doublePwd"
      ></x-input>
    </group>
    <group>
      <x-button
        action-type="button"
        plain
        type="primary"
        @click.native="ResetPayPwd"
        :disabled="doublePwd.length<2"
      >提交</x-button>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XButton, XInput } from "vux";

export default {
  components: {
    XHeader,
    Group,
    Cell,
    XButton,
    XInput
  },
  data() {
    return {
      message: "hello UNK",
      isLoading: false,
      isNew: false,
      firstPwd: "",
      doublePwd: "",
      oldPwd: ""
    };
  },
  methods: {
    ResetPayPwd: function() {
      var _this = this;
      if (this.oldPwd.trim() !== this.Global.CurrentUser.UserPwd) {
        this.$vux.alert.show({
          title: "系统通知",
          content: "当前密码不匹配原密码，请重新输入."
        });
      } else {
        if (this.firstPwd.trim() !== this.doublePwd.trim()) {
          this.$vux.alert.show({
            title: "系统通知",
            content: "两次输入密码不一致，请确认."
          });
        } else {
          var _User = new Object();
          _User.ID = this.Global.CurrentUser.ID;
          _User.UserPwd = this.doublePwd;
          this.Global.AjaxPost(`User/UpdateUserPwd`, _User, function(data) {
            _this.$vux.alert.show({
              content: "密码更改成功,请重新登陆",
              onHide: function() {
                window.location.reload();
              }
            });
          });
        }
      }
    }
  },
  computed: {}
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