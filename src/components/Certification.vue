<template>
  <div>
    <meta name="format-detection" content="telephone=yes">
    <x-header title="实名认证" :left-options="{showBack: true}"></x-header>
    <group>
      <div class="row" style="font-size:15px; color:red;font-weight:bolder;">
        <div class="col-xs-12">友情提示: 身份信息一旦提交不可修改, 请慎重.</div>
      </div>
      <x-input title="姓名" v-model="IDName" :min="2" :max="4" required></x-input>
      <x-input title="身份证号" v-model="IDCard" :min="15" :max="18" required></x-input>
    </group>
    <group>
      <x-button
        action-type="submit"
        plain
        type="primary"
        @click.native="UserCardSubmit"
        :show-loading="isLoading"
        :disabled="disabled"
      >提 交</x-button>
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
      disabled: true,
      IDName: this.Global.CurrentUser.IDName,
      IDCard: this.Global.CurrentUser.IDCard
    };
  },
  methods: {
    UserCardSubmit: function() {
      var UserID = this.Global.CurrentUser.ID;
      if (this.IDName.length < 2) {
        this.$vux.alert.show({
          content: `姓名的长度为2至4个中文字符！`
        });
        return false;
      }
      var IdCardLength = [15, 18];
      if (IdCardLength.indexOf(this.IDCard.length) == -1) {
        this.$vux.alert.show({
          content: `身份证号只支持15为或18位`
        });
        return false;
      }
      var _this = this;
      this.$vux.confirm.show({
        content: `
        <p style="font-size:15px; color:red; font-weight:bolder;">请确认身份</p>
        <p>姓名：[ ${this.IDName} ]</p>
        <p>身份证号：[ ${this.IDCard} ]</p>
        <p style="font-size:15px; color:red; font-weight:bolder;">
        一旦提交不可修改！
        </p>
        `,
        onConfirm: function() {
          var postArray = new Object();
          postArray.IDName = _this.IDName.trim();
          postArray.IDCard = _this.IDCard.trim();
          postArray.ID = _this.Global.CurrentUser.ID;
          console.log(postArray);
          _this.Global.AjaxPost("User/UpdateUserIDInfo", postArray, function(
            data
          ) {
            if (data.Data == false) {
              _this.$vux.alert.show({
                content: `提交失败! 当前[ 姓名 ]与[ 身份证号 ]已被认证.`
              });
            } else {
              _this.$vux.alert.show({
                content: `信息提交成功！重新登陆后即生效`,
                onHide() {
                  window.location.reload();
                }
              });
            }
          });
        }
      });
    }
  },
  created: function() {
    if (
      this.Global.CurrentUser.IDName.length >= 2 &&
      this.Global.CurrentUser.IDCard.length >= 15
    ) {
      this.disabled = true;
    } else {
      this.disabled = false;
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