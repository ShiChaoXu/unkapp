<template>
  <div>
    <meta name="format-detection" content="telephone=yes">
    <x-header :title="$route.query.title" :left-options="{showBack: true}"></x-header>
    <div class="container-fluid row">
      <iframe class="col-xs-12" style="height:632px;" scrolling="auto" :src="$route.query.url"></iframe>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XButton } from "vux";

export default {
  props: ["News"],
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
  methods: {},
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