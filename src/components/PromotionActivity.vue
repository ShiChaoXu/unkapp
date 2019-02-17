<template>
  <div>
    <x-header title="推广会员" :left-options="{showBack: true}"></x-header>
    <vue-qr :logoSrc="bgSrc" :text="reversedURL" :size="350" style="margin:35px;"></vue-qr>
  </div>
</template>

<script>
import { XHeader } from "vux";
import VueQr from "vue-qr";

export default {
  components: {
    XHeader,
    VueQr
  },
  data() {
    return {
      message: "hello UNK",
      bgSrc: require("@/assets/two_img.png")
    };
  },
  methods: {},
  computed: {
    reversedURL: function() {
      return `${this.Global.Webwww}#/RegAccout?phone=${this.Global.CurrentUser.ID}`;
    }
  }
};
</script>

<style>
</style>