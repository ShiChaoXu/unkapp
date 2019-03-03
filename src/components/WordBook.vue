<template>
  <div>
    <meta name="format-detection" content="telephone=yes">
    <x-header title="助记词" :left-options="{showBack: true}"></x-header>
    <group>
      <x-button plain type="primary" @click.native="BuildWord" v-show="!disabled">生成助记词</x-button>
    </group>
    <group
      style="color:red;font-weight:bolder;"
      v-show="disabled"
    >温馨提示： 助记词丢失后无法找回,请在生成后自行记录或保存,这将是你找回UNK Token的最后方式。</group>
    <group v-if="this.GetWordBookToArray.length > 1">
      <checker default-item-class="demo1-item">
        <checker-item
          v-for="(item,index) in this.GetWordBookToArray"
          :key="index"
          :value="{item}"
        >{{item}}</checker-item>
      </checker>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XButton, Checker, CheckerItem } from "vux";
import { defaultCoreCipherList } from "constants";
const bip39 = require("bip39");

export default {
  components: {
    XHeader,
    Group,
    Cell,
    XButton,
    Checker,
    CheckerItem
  },
  data() {
    return {
      message: "hello UNK",
      isLoading: false,
      wordBook: "",
      disabled: this.Global.CurrentUser.OnlyKeyword.length > 5
    };
  },
  methods: {
    BuildWord: function() {
      //生成助记词
      this.$vux.loading.show({ text: "Loading" });
      let ts = bip39.generateMnemonic(256);
      this.wordBook = ts;
      this.disabled = true;
      this.$vux.loading.hide();
      var postArray = new Object();
      postArray.ID = this.Global.CurrentUser.ID;
      postArray.PayAddress = bip39.mnemonicToSeedHex(ts);
      postArray.OnlyKeyword = ts;
      var _this = this;
      this.Global.AjaxPost("User/UpdateUserKeyWord", postArray, function(data) {
        _this.$vux.alert.show({
          content: `信息提交成功!`,
          onHide() {
            _this.Global.CurrentUser.OnlyKeyword = ts;
            _this.Global.CurrentUser.PayAddress = postArray.PayAddress;
          }
        });
      });
    }
  },
  computed: {
    GetWordBookToArray: function() {
      return this.wordBook.split(" ");
    }
  },
  created: function() {}
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
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
</style>