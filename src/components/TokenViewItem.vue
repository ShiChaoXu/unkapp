<template>
<div class="row" style="line-height:38px;margin-top:10px;border-bottom:1px solid #eff3f5; min-height:50px;" @click="RouteToPage(iconName)">
      <div class="col-xs-1" style="line-height:32px;"><img class="iconBox" alt="" :src="reversedIMGICO"></div>
      <div class="col-xs-3"><span style="font-weight:bolder">{{iconName}}</span></div>
      <div class="col-xs-5" style="text-align:right;font-weight:bolder">￥{{iconPrice}}</div>
      <div class="col-xs-3 btn pull-right" :class="reversedItemStatus" style="font-size:16px;">{{iconComing}}%</div>
      <div class="col-xs-12" style="font-size:14px;">当前持有: <span style="font-weight:bolder;">{{this.reveredMoney(CurrentHave)}}</span> 份</div>
    </div>
</template>

<script>
export default {
  props: [
    "icon",
    "iconName",
    "iconPrice",
    "iconComing",
    "iconIsUp",
    "CurrentHave"
  ],
  components: {},
  data() {
    return {
      message: "hello UNK"
    };
  },
  methods: {
    RouteToPage: function(iconType) {
      this.$router.push({
        path: `/Details?type=${iconType}`
      });
    },
    reveredMoney: function(money) {
      return this.Global.thousandBitSeparator(money);
    }
  },
  computed: {
    reversedIMGICO: function() {
      return "https://" + this.icon;
    },
    reversedItemStatus: function() {
      return this.iconIsUp ? "btn-success" : "btn-danger";
    }
  }
};
</script>

<style>
</style>