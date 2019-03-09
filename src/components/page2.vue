<template>
  <div>
    <x-header title="通证助手" :left-options="{showBack: false}"></x-header>
    <div class="container-fluid" style="background:white;">
      <div class="row" style="padding: 20px;">
        <tool-item
          v-for="(item,index) in p_List"
          :key="index"
          :is-disabled="item.IsDisabled"
          :icon="item.Icon"
          :icon-name="item.IconName"
          :icon-trigger="item.IconTrigger"
          @TriggerParent="TriggerParent"
        ></tool-item>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, AlertModule } from "vux";
export default {
  components: {
    AlertModule,
    XHeader,
    "tool-item": {
      props: ["IsDisabled", "Icon", "IconName", "IconTrigger"],
      template: `
      <button class="col-xs-3 btn btn-default" type="button" :disabled="IsDisabled" @click="TriggerClick" style="margin:0px 10px 10px 15px;">
          <div style="width:100%;text-align:center;"><i class="iconfont" :class="reversedIcon" style="font-size:36px;"></i></div>
          <div style="width:100%;text-align:center;margin-top: -6px;">{{IconName}}</div>
      </button> 
      `,
      methods: {
        TriggerClick: function() {
          this.$emit("TriggerParent", this.IconTrigger, this.IsDisabled);
        }
      },
      computed: {
        reversedIcon: function() {
          return this.Icon;
        }
      }
    }
  },
  data() {
    return {
      message: "hello UNK",
      p_List: [
        {
          Icon: "icon-qiandao",
          IconName: "签到",
          IconTrigger: "TriggerSignIn",
          IsDisabled: false
        },
        {
          Icon: "icon-saoyisao",
          IconName: "扫一扫",
          IconTrigger: "TriggerScan",
          IsDisabled: false
        },
        {
          Icon: "icon-cunkuan",
          IconName: "转账",
          IconTrigger: "TriggerTransfer",
          IsDisabled: false
        },
        {
          Icon: "icon-fenxiang",
          IconName: "推广会员",
          IconTrigger: "TriggerPopularize",
          IsDisabled: false
        },
        {
          Icon: "icon-tianjiahaoyou",
          IconName: "我的会员",
          IconTrigger: "TriggerMyUserList",
          IsDisabled: false
        },
        {
          Icon: "icon-zhangdan",
          IconName: "交易明细",
          IconTrigger: "TriggerBillList",
          IsDisabled: false
        }
      ]
    };
  },
  methods: {
    TriggerParent: function(func, status) {
      var that = this;
      switch (func) {
        case "TriggerSignIn":
          that.$router.push({
            path: "/SignInDesk"
          });
          break;
        case "TriggerScan":
          AlertModule.show({
            title: "暂未开放,敬请期待"
          });
          break;
        case "TriggerBillList":
          that.$router.push({
            path: "/TransferList"
          });
          break;
        case "TriggerTransfer":
          if (that.Global.CurrentUser.PayAddress.length == 0) {
            AlertModule.show({
              title: "请先完成[实名认证]和申请[助记词]"
            });
          } else if (that.Global.CurrentUser.PayPassWord.length == 0) {
            AlertModule.show({
              title: "请先设置[支付密码]"
            });
          } else {
            // push to ransfer
            that.$router.push({
              path: "/TransferPage"
            });
          }

          break;
        case "TriggerPopularize":
          that.$router.push({
            path: "/PromotionActivity"
          });
          break;
        case "TriggerMyUserList":
          that.$router.push({
            path: "/MyTeam"
          });
          break;
      }
    }
  }
};
</script>

<style>
</style>