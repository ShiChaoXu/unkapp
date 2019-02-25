<template>
  <div>
    <x-header title="" :left-options="{showBack: true}">{{dataType}} 行情</x-header>
    <scroller :lock-x="true" :scrollbarY="true" height="-120">
    <div class="" style="background:white;">
        <table class="table table-striped table-hover">
            <thead>
                <th>#</th>
                <th>通证</th>
                <th>价格(￥)</th>
                
            </thead>
            <tbody>
                <tr v-for="(item, index) in rList" :key="index">
                    <td style="width:140px;">{{item.CreateTime.split('T')[0]}}</td>
                    <td style="width:100px;">{{item.TokenID}}</td>
                    <td style="width:10px;color:green;">{{item.CurrentPrice.toFixed(4)}}</td>    
                    <td><span class="glyphicon glyphicon-arrow-up" style="color:red;"></span></td>
                </tr>
            </tbody>
        </table>
    </div>
    </scroller>
  </div>
</template>

<script>
import { XHeader,Scroller } from "vux";

export default {
  components: {
    XHeader,Scroller
  },
  data() {
    return {
      message: "hello UNK",
      dataType: "",
      rList: []
    };
  },
  methods: {},
  created: function() {
    var that = this;
    that.dataType = this.$route.query.type;
    that.Global.AjaxGet(
      `user/GetGainsInHisotry?p_type=${that.dataType}`,
      function(data) {
        that.rList = data.Data;
      }
    );
  },
  computed: {}
};
</script>

<style>
</style>