<template>
  <div>
    <meta name="format-detection" content="telephone=yes">
    <x-header title="实名认证" :left-options="{showBack: true}"></x-header>
    <group>
      <div class="row" style="font-size:15px; color:red;font-weight:bolder;">
        <div class="col-xs-12">友情提示: 身份信息一旦提交不可修改, 请慎重.</div>
      </div>
      <x-input title="姓名" v-model="IDName" :min="2" :max="4" required :disabled="disabled"></x-input>
      <x-input title="身份证号" v-model="IDCard" :min="15" :max="18" required :disabled="disabled"></x-input>
    </group>
    <group>
      <x-button
        action-type="button"
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
      disabled: false,
      IDName: "",
      IDCard: ""
    };
  },
  methods: {
    UserCardSubmit: function() {
      console.log("run this");
      console.log(this.Global);
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