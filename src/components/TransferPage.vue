<template>
  <div>
    <meta name="format-detection" content="telephone=yes">
    <x-header title="转账" :left-options="{showBack: true}"></x-header>
    <group>
      <confirm
        v-model="ShowPayWord"
        theme="IOS"
        show-input
        title="请输入支付密码"
        @on-confirm="CheckPayWord"
        v-focus
      ></confirm>
    </group>
    <group title="对方钱包地址">
      <x-input
        title
        v-model="targetMoneyAddress"
        placeholder="请输入对方电子钱包地址"
        @on-change="SearchMoneyAddress"
      ></x-input>
    </group>
    <group title="对方姓名">
      <x-input title v-model="targetUserName" disabled placeholder="--"></x-input>
    </group>
    <group title="对方手机号">
      <x-input title v-model="targetUserPhone" disabled placeholder="--"></x-input>
    </group>

    <group title="转账金额">
      <x-input title="金额" v-model="transferMoney" placeholder @keyup.native="CheckMoney($event)"></x-input>
    </group>

    <group>
      <x-button
        action-type="button"
        type="primary"
        @click.native="UserTransfer"
        :show-loading="isLoading"
        :disabled="disabled"
      >转 账</x-button>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XButton, XInput, Confirm } from "vux";

export default {
  components: {
    XHeader,
    Group,
    Cell,
    XButton,
    XInput,
    Confirm
  },
  data() {
    return {
      message: "hello UNK",
      isLoading: false,
      targetMoneyAddress: "",
      targetUserName: "",
      targetUserPhone: "",
      targetUserID: "",
      transferMoney: "",
      disabled: true,
      ShowPayWord: false
    };
  },
  methods: {
    CheckPayWord: function(value) {
      var that = this;
      if (that.Global.CurrentUser.PayPassWord == value) {
        var obj = new Object();
        obj.p_Type = "UNK";
        obj.p_TargetUserID = that.targetUserID;
        obj.p_TargetUserName = that.targetUserName;
        obj.p_TargetUserPhone = that.targetUserPhone;
        obj.p_TransferMoney = that.transferMoney;
        obj.p_FormUserID = that.Global.CurrentUser.ID;
        obj.p_FormUserPhone = that.Global.CurrentUser.UserPhone;
        that.Global.AjaxPost("User/SetTransferMoney", obj, function(data) {
          if (data.Data.Status == false) {
            MVue.$vux.alert.show({
              title: data.Data.Message
            });
          } else {
            MVue.$vux.alert.show({
              title: data.Data.Message,
              onHide: function() {
                that.$router.push({
                  path: "/p2"
                });
              }
            });
          }
        });
      } else {
        MVue.$vux.alert.show({
          title: `支付密码错误,请重新输入!`
        });
      }
    },
    UserTransfer: function() {
      var that = this;
      if (that.transferMoney.length == 0 || that.transferMoney == 0) {
        MVue.$vux.alert.show({
          title: `请输入转账金额`
        });
      } else {
        if (that.transferMoney * 1 > 200) {
          MVue.$vux.alert.show({
            title: `单笔转账不可超过200份`
          });
        } else {
          MVue.$vux.confirm.show({
            title: `转账提醒,请核对转账信息`,
            content: `
              <p>收款人: [ ${that.targetUserName} ]</p>
              <p>收款电话: [ ${that.targetUserPhone} ]</p>
              <p>转账金额: [ ${(that.transferMoney * 1).toFixed(2)} UNK ]</p>
              <p>本次交易会自毁 [ <span style="color:red;font-weight:bolder;">${(
                that.transferMoney * 0.01
              ).toFixed(2)}</span> ] UNK.</p>
              <p>是否继续操作?</p>
              `,
            onConfirm: function() {
              that.ShowPayWord = true;
            }
          });
        }
      }
    },
    CheckMoney: function(obj) {
      this.transferMoney = this.transferMoney.replace(/^(0+)|[^\d]+/g, "");
    },
    SearchMoneyAddress: function() {
      var that = this;
      if (that.targetMoneyAddress.length > 5) {
        var obj = new Object();
        obj.p_MoneyAddress = that.targetMoneyAddress;
        that.Global.AjaxPost("User/GetUserInfoByAddress", obj, function(data) {
          that.disabled = true;
          if (data.Data == null) {
            MVue.$vux.alert.show({
              title: `该钱包地址不存在,请核对.`
            });
          } else {
            that.targetUserID = data.Data.ID;
            that.targetUserName = data.Data.IDName;
            that.targetUserPhone = data.Data.UserPhone;
            if (that.targetUserID == that.Global.CurrentUser.ID) {
              MVue.$vux.alert.show({
                title: `钱包地址不能为同一用户.`
              });
            } else {
              that.disabled = false;
            }
          }
        });
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