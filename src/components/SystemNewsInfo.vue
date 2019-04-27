<template>
  <div>
    <meta name="format-detection" content="telephone=yes">
    <x-header :title="NewItem==null?``:NewItem.Title" :left-options="{showBack: true}"></x-header>
    <div v-html="NewItem == null?``:NewItem.Description" style="margin-top:30px;">
    </div>
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
      NewItem: null
    };
  },
  methods: {},
  computed: {

  },
  created: function() {
    var that = this;
    var n_id = that.$route.query.pid;
    that.Global.AjaxGet(`User/GetNewsInfo?p_ID=${n_id}`, function(data) {
      that.NewItem = data.Data.data;
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