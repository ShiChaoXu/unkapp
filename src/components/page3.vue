<template>
  <div>
    <x-header title="资讯" :left-options="{showBack: false}"></x-header>
  </div>
</template>

<script>
import { XHeader } from "vux";

export default {
  components: {
    XHeader
  },
  data() {
    return {
      message: "hello UNK"
    };
  },
  methods: {}
};
</script>

<style>
</style>