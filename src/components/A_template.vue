<template>
  <div>
    <meta name="format-detection" content="telephone=yes"/>
    <x-header title="安全设置" :left-options="{showBack: true}"></x-header>
    <group>
      <cell is-link title="实名认证"></cell>
      <cell is-link title="助记词"></cell>
      <cell is-link title="登录密码"></cell>
      <cell is-link title="支付密码"></cell>
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
    
  },
  computed: {
   
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