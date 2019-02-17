<template>
  <div>
    <x-header title="通证行情" :left-options="{showBack: false}"></x-header>
    <token-view-list></token-view-list>
  </div>
</template>

<script>
import { XHeader } from "vux";
import TokenViewList from '@/components/TokenViewList'

export default {
  components: {
    XHeader,
    TokenViewList
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