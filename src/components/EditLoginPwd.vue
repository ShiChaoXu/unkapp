<template>
  <div>
    <meta name="format-detection" content="telephone=yes"/>
    <x-header title="登陆密码" :left-options="{showBack: true}"></x-header>
    <group>

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