<template>
  <div class="container-fluid" style="background:white;">
    <div class="row MyRowStyle">
      <div class="col-xs-12" style="height:60px;font-weight:bolder;">总资产</div>
      <div class="col-xs-12" style="text-align:right;">
        ≈￥{{reversedTotalPrice}}
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="row MyRowStyle">
      <div class="col-xs-2">市值</div>
      <div class="col-xs-7" style="text-align:right;">价格</div>
      <div class="col-xs-3 pull-right">今日涨幅</div>
    </div>
    <div>
    <token-item v-for="(item,index) in g_List" :key="index"
    :icon="item.icon"
    :icon-name="item.name"
    :iconPrice="item.price"
    :iconComing="item.coming"
    :iconIsUp="item.isup"
    :iconIndex="index||0"
    :CurrentHave="GetCurrentTokenCount(item.name)"
    ></token-item>
    </div>
  </div>
</template>

<script>
import TokenItem from "@/components/TokenViewItem";
export default {
  components: {
    TokenItem
  },
  computed: {
    reversedTotalPrice: function() {
      var totalPrice = 0;
      var that = this;
      this.g_List.forEach(element => {
        var t_item = that.Global.CurrentTokenList.filter(
          x => x.TokenType == element.name
        );
        if (t_item.length > 0) {
          totalPrice += (t_item[0].CurrentIcon * element.price);
        }
      });
      return totalPrice.toFixed(4);
    }
  },
  data() {
    return {
      message: "hello UNK",
      g_List: []
    };
  },
  methods: {
    GetCurrentTokenCount: function(p_type) {
      debugger;
      var items = this.Global.CurrentTokenList.filter(x => x.TokenType == p_type);
      return items.length > 0 ? items[0].CurrentIcon : 0;
    }
  },
  created: function() {
    var that = this;
    this.Global.AjaxGet("user/GetTokenSummary", function(data) {
      var rList = [];
      data.Data.forEach(item => {
        rList.push({
          icon: item.TokenIcon,
          name: item.TokenID,
          price: item.CurrentPrice,
          coming: item.IncreaseThan,
          isup: item.IncreaseThan > 0
        });
        that.g_List = rList;
      });
    });
  }
};
</script>

<style>
.iconBox {
  vertical-align: middle;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 40%;
}
.MyRowStyle {
  font-size: 14px;
  border-bottom: 1px solid #eff3f5;
  height: 35px;
  line-height: 35px;
}
</style>