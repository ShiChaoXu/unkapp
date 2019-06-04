<template>
  <div>
    <meta name="format-detection" content="telephone=yes">
    <x-header title="通证转换" :left-options="{showBack: true}"></x-header>
    <group>
      <popup-radio
        title="当前通证"
        :options="currentTokenList"
        v-model="currentToken"
        @on-hide="PickTokenType"
      ></popup-radio>
    </group>
    <cell title="转化为" :value="toToken"></cell>
    <group title>
      <x-input title="转换数量" placeholder="0.00" v-model="inputCount"></x-input>
    </group>
    <cell title="UNK市价：(元/份)">
      <div>
        <span style="color:green;font-weight: bolder">{{currentPrice}}</span>
      </div>
    </cell>

    <cell title="转化数量">
      <div>
        <span style="color:green;font-weight: bolder">{{getFinnalCount() }}</span>
      </div>
    </cell>
    <x-button action-type="button" plain type="primary" @click.native="PostTransform">转换</x-button>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XButton, PopupRadio, XInput } from "vux";

export default {
  components: {
    XHeader,
    Group,
    Cell,
    XButton,
    PopupRadio,
    XInput
  },
  data() {
    return {
      message: "hello UNK",
      isLoading: false,
      currentToken: "UNK",
      currentTokenList: ["UNK", "UTC"],
      toToken: "UTC",
      currentPrice: 0.0,
      inputCount: ""
    };
  },
  methods: {
    PickTokenType: function() {
      var that = this;
      if (that.currentToken == "UNK") {
        that.Global.AjaxGet(
          `user/GetGainsInHisotry?p_type=UNK`,
          function(data) {
            that.currentPrice = data.Data[0].CurrentPrice;
          },
          false
        );
        that.toToken = "UTC";
      } else {
        that.toToken = "UNK";
      }
    },
    PostTransform: function() {
      var that = this;
      var sendArray = new Object();
      sendArray.UserID = this.Global.CurrentUser.ID;
      sendArray.TokenType = that.currentToken;
      sendArray.ToTokenType = that.toToken;
      sendArray.InputCount = that.inputCount;
      sendArray.TransCount = that.getFinnalCount();
      console.log(sendArray);
      that.Global.AjaxPost(`User/TransFormToken`, sendArray, function(data) {
        that.$vux.alert.show({
          content: data.Data.Status ? `转换成功!` : data.Data.Message
        });
      });
    },
    getFinnalCount: function() {
      return (this.currentToken == "UNK"
        ? this.inputCount * this.currentPrice
        : this.inputCount / this.currentPrice).toFixed(4);
    }
  },
  computed: {},
  created: function() {
    var that = this;
    that.Global.AjaxGet(
      `user/GetGainsInHisotry?p_type=UNK`,
      function(data) {
        that.currentPrice = data.Data[0].CurrentPrice;
      },
      false
    );
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