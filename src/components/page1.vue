<template>
  <div>
    <x-header title="通证行情" :left-options="{showBack: false}"></x-header>
    <token-view-list></token-view-list>
    <div class="clearfix"></div>
    <div class="container-fluid" style="background:white;">
      <div class="row MyRowStyle" v-if="this.Current!=null">
        <div class="col-xs-12" style="height:30px;font-weight:bolder;">钱包地址</div>
        <div class="col-xs-12" style="text-align:right;">
          <!--
            1/ 未完成实名认证
            2/ 完成实名认证,但为点击生成助记词
            3/ 完成助记词
          -->
          <x-button
            action-type="button"
            plain
            type="primary"
            v-if="this.Current.IDCard.length==0 || this.Current.IDName.length==0"
            @click.native="ClickWalletGoIDCard"
            style="margin-top:15px"
          >请完成实名认证</x-button>

          <x-button
            action-type="button"
            plain
            type="primary"
            v-if="(this.Current.IDCard.length!=0 || this.Current.IDName.length!=0) && this.Current.OnlyKeyword.length==0"
            @click.native="ClickWalletGoKeyWords"
            style="margin-top:15px"
          >请完成助记词</x-button>
        </div>
        <div v-if="this.Current.OnlyKeyword.length!=0">
          <textarea rows="4" readonly class="col-xs-12">{{this.Current.PayAddress}}</textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, XButton, XTextarea, Group } from "vux";
import TokenViewList from "@/components/TokenViewList";
const bip39 = require("bip39");

export default {
  components: {
    XHeader,
    TokenViewList,
    XButton,
    XTextarea,
    Group
  },
  data() {
    return {
      message: "hello UNK",
      Current: null
    };
  },
  methods: {
    ClickWalletGoIDCard: function() {
      this.$router.push({
        path: "/Certification"
      });
    },
    ClickWalletGoKeyWords: function() {
      this.$router.push({
        path: "/WordBook"
      });
    }
  },
  computed: {},
  created: function() {
    this.Current = this.Global.CurrentUser;
  }
};
</script>

<style>
</style>