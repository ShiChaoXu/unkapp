<template>
  <div>
    <x-header title="签到" :left-options="{showBack: true}"></x-header>
     <div class="" style="background:white;">
        <table class="table table-striped table-hover" style="margin:15px 0px 0px 15px;">
            <thead>
                <th style="width:120px;">资产名称</th>
                <th>份额</th>
                <th>价格</th>
                <th>市值</th>
            </thead>
            <tbody style="">
                <tr>
                <td style="">UTC</td>
                <td>{{TotalCount.toFixed(2)}}</td>
                <td>{{Price.toFixed(2)}}</td>
                <td style="font-weight:bolder;color:green;">{{TotalCount.toFixed(2)}}</td>
                </tr>
            </tbody>
        </table>
        <div class="container" style="border-top:1px solid #eeeeee;">
            <div class="row" style="border-bottom:1px solid #eeeeee; height:50px; line-height:50px">
                <div class="col-xs-4" style="font-weight:bolder;">资产合计:</div>
                <div class="col-xs-8" style="text-align:right;"><span  style="font-weight:bolder;color:green;">{{TotalCount.toFixed(2)}}</span> 元</div>
            </div>
            <div class="row" style="border-bottom:1px solid #eeeeee; height:50px; line-height:50px">
                <div class="col-xs-8" style="font-weight:bolder;">显示货币 CNY</div>
                <div class="col-xs-4"></div>
            </div>
        </div>
      <group>
        <x-button action-type="button" plain type="primary" @click.native="UserSignIn" :show-loading="showLoading" :disabled="HasSignIn">签 到</x-button>
    </group>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XButton, AlertModule, dateFormat } from "vux";

export default {
  components: {
    XHeader,
    Group,
    Cell,
    XButton,
    AlertModule,
    dateFormat
  },
  data() {
    return {
      message: "hello UNK",
      showLoading: false,
      Price: 1.00,
      HasSignIn: true,
      TotalCount: 0
    };
  },
  methods: {
    UserSignIn: function() {
      var that = this;
      that.showLoading = true;
      var _sendPost = new Object();
      _sendPost.p_type = "VBX";
      _sendPost.p_userid = that.Global.CurrentUser.ID;
      _sendPost.p_total = 1;
      _sendPost.p_desc = `${dateFormat(
        new Date(),
        "YYYY-MM-DD HH:mm:ss"
      )} 签到`;
      that.Global.AjaxPost(`user/UpdateAccountCoin`, _sendPost, function(data) {
        that.showLoading = false;
        if (data.Data) {
          that.TotalCount += 1;
          that.HasSignIn = true;
          AlertModule.show({
            title: `签到成功,当前UTC总量: ${that.TotalCount}`
          });
        }
      });
    }
  },
  created: function() {
    var that = this;
    that.Global.AjaxGet(
      `user/GetTokenTotalCount?p_type=VBX&p_userid=${
        that.Global.CurrentUser.ID
      }`,
      function(data) {
        that.TotalCount = data.Data.TotalCount;
        that.HasSignIn = !data.Data.HasSignIn;
      }
    );
  }
};
</script>

<style>
.table thead th {
  font-size: 16px;
}
.table tbody td {
  font-size: 15px;
}
</style>