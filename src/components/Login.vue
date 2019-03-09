<template>
  <div>
    <div class="vux-demox">
      <H2 style="font-weight:bolder;">OBOROTC</H2>
      <h4>UNK—TOKEN</h4>
    </div>
    <group title>
      <x-input title="手机号" v-model="UserName" :max="11" is-type="china-mobile" required></x-input>
    </group>
    <group title>
      <x-input title="密码" v-model="UserPwd" :min="6" :max="13" required type="password"></x-input>
    </group>
    <group>
      <x-button
        action-type="button"
        plain
        type="primary"
        @click.native="UserLogin"
        :show-loading="showLoading"
      >登 录</x-button>
    </group>
  </div>
</template>

<script>
import { Group, Cell, base64, XInput, XButton, AlertModule } from "vux";

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    AlertModule
  },
  data() {
    var that = this;
    return {
      msg: "Hello World!",
      UserName: that.Global.ISPROD ? "" : "17710328707",
      UserPwd: that.Global.ISPROD ? "" : "123456",
      showLoading: false
    };
  },
  created: function() {
    $("#belowMenu").hide();
  },
  methods: {
    UserLogin() {
      var that = this;
      if (that.UserName.length < 11) {
        AlertModule.show({
          title: "登录失败",
          content: "请输入11位手机号"
        });
        return false;
      }
      if (that.UserPwd.length < 6) {
        AlertModule.show({
          title: "登录失败",
          content: "密码最低为6位数"
        });
        return false;
      }
      that.showLoading = true;
      var _sendPost = new Object();
      _sendPost.p_UserName = that.UserName;
      _sendPost.p_UserPwd = that.UserPwd;
      that.Global.AjaxPost("User/Exist", _sendPost, function(data) {
        that.showLoading = false;
        if (data.Data.IsExist) {
          that.Global.CurrentUser = data.Data.User;
          AlertModule.show({
            title: "登录成功",
            content: `${data.Data.User.UserName} 欢迎回来`,
            onHide() {
              window["CurrentUser"] = that.Global.CurrentUser;
              that.$router.push({
                path: "/p1"
              });
            }
          });
        } else {
          AlertModule.show({
            title: "登录失败",
            content: "手机号与密码不匹配，请检查"
          });
        }
      });
    }
  }
};
</script>

<style>
.vux-demox {
  text-align: center;
  height: 100px;
  margin-top: 80px;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
