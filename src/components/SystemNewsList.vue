<template>
  <div>
    <meta name="format-detection" content="telephone=yes">
    <x-header title="系统公告" :left-options="{showBack: true}"></x-header>
    <group v-for="(item,index) in this.NewsList" :key="index">
      <cell is-link :title="item.Title" :link="{path:`/SystemNewsInfo?pid=${item.ID}`}"></cell>
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
      isLoading: false,
      NewsList: []
    };
  },
  methods: {},
  computed: {},
  created: function() {
    var that = this;
    that.Global.AjaxGet("User/GetNewsTitle", function(data) {
       that.NewsList = data.Data.List;
    });
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