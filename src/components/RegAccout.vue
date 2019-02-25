<template>
  <div :class="{hide:isShow}">
    <x-header title="注册中心" :left-options="{showBack: false}"></x-header>
    <div class="vux-demox">
      <H2 style="font-weight:bolder;">OBOROTC</H2>
      <h4>UNK—TOKEN</h4>
    </div>
     <group title=""> 
      <x-input title="手机号" v-model="UserName" :max="11" :min="11" is-type="china-mobile" required @on-blur="CheckHasUser"></x-input>
    </group>
    <group title=""> 
      <x-input title="密码" v-model="UserPwd" :min="6" :max="11" type="password" required></x-input>
    </group>
    <group title=""> 
      <x-input title="姓名" v-model="CardName" :max="4" :min="2" is-type="china-name" required></x-input>
    </group>

    <group>
        <x-button action-type="button"  type="primary" @click.native="UserReg" :show-loading="showLoading" :disabled="disabled">注 册</x-button>
    </group>
  </div>
</template>

<script>
import {
  XHeader,
  AlertModule,
  Group,
  Cell,
  base64,
  XInput,
  XButton
} from "vux";

export default {
  components: {
    XHeader,
    AlertModule,
    Group,
    Cell,
    base64,
    XInput,
    XButton
  },
  data() {
    return {
      disabled: true,
      showLoading: false,
      message: "hello UNK",
      UserName: "",
      UserPwd: "",
      CardName: "",
      CardNo: "",
      pUserID: "",
      isShow:
        this.$route.query.phone == undefined || this.$route.query.phone == ""
    };
  },
  methods: {
    CheckHasUser: function() {
      var that = this;
      that.Global.AjaxGet(
        `user/GetUserByPhone?p_phone=${that.UserName}`,
        function(data) {
          if (data.Data == null) {
            that.disabled = false;
          } else {
            AlertModule.show({
              title: `${that.UserName} 该手机号码已存在！`
            });
            that.disabled = true;
          }
        }
      );
    },
    UserReg: function() {
      var that = this;
      var _postData = new Object();
      _postData.UserName = this.UserName;
      _postData.UserPwd = this.UserPwd;
      _postData.CardName = this.CardName;
      _postData.CardNo = this.CardNo;
      _postData.pUserID = this.pUserID;
      if (_postData.UserName.length != 11) {
        AlertModule.show({
          title: "请输入11位手机号！"
        });
        return false;
      } else if (_postData.UserPwd.UserPwd < 5) {
        AlertModule.show({
          title: "密码不能小于6位数"
        });
        return false;
      } else if (_postData.CardName.length < 2) {
        AlertModule.show({
          title: "请输入正确姓名"
        });
        return false;
      }  else {
        that.Global.AjaxPost(`user/RegNewUser`, _postData, function(data) {
          if (data.Data) {
            AlertModule.show({
              title: data.Message,
              onHide() {
                that.$router.push({
                  path: "/Login"
                });
              }
            });
          } else {
            AlertModule.show({
              title: data.Message
            });
          }
        });
      }
    }
  },
  created: function() {
    var that = this;
    if (that.$route.query.phone == undefined || that.$route.query.phone == "") {
      AlertModule.show({
        title: "请扫描推荐人二维码",
        onHide() {
          that.$router.push({
            path: "/Login"
          });
        }
      });
    } else {
      that.pUserID = that.$route.query.phone;
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
</style>