<template>
  <div>
    <meta name="format-detection" content="telephone=yes">
    <x-header title="交易明细" :left-options="{showBack: true}"></x-header>
    <group v-for="(item,index) in this.rList" :key="index">
      <form-preview header-label="金额" :header-value="item.CurrentIcon" :body-items="item.list"></form-preview>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XButton, FormPreview } from "vux";

export default {
  components: {
    XHeader,
    Group,
    Cell,
    XButton,
    FormPreview
  },
  data() {
    return {
      message: "hello UNK",
      isLoading: false,
      rList: []
    };
  },
  methods: {},
  computed: {},
  created: function() {
    var that = this;
    var InvalidList = ["UNK"];
    that.Global.AjaxGet(
      `User/GetUserTokenDetailsList?p_id=${that.Global.CurrentUser.ID}`,
      function(data) {
        var rList = data.Data.filter(
          x => InvalidList.indexOf(x.TokenType) != -1
        );
        rList.forEach(element => {
          var obj = new Object();
          obj.CurrentIcon = (element.CurrentIcon * 1).toFixed(2);
          obj.CurrentIcon =
            obj.CurrentIcon > 0 ? "+" + obj.CurrentIcon : obj.CurrentIcon;
          obj.list = [];

          obj.list.push({ label: "商品", value: element.TokenType });
          obj.list.push({ label: "描述", value: element.CurrentDescription });
          obj.list.push({
            label: "订单时间",
            value: element.CreateTime.replace("T", " ")
          });

          that.rList.push(obj);
        });
      }
    );
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