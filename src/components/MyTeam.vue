<template>
  <div>
    <x-header title="我的会员" :left-options="{showBack: true}"></x-header>
    <scroller :lock-x="true" :scrollbarY="true" height="-120">
     <div class="" style="background:white;">
        <table class="table table-striped table-hover">
            <thead>
                <th>#</th>
                <th>姓名</th>
                <th>电话</th>
                <th>注册日期</th>
            </thead>
            <tbody>
                <tr v-for="(item,index) in rList" :key="index">
                    <td>
                        {{index+1}}
                    </td>
                    <td>
                        {{item.UserName}}
                    </td>
                    <td>
                        {{item.UserPhone}}
                    </td>
                    <td>
                        {{item.CreateTime.split('T')[0]}}
                    </td>
                
                </tr>
            </tbody>
        </table>
    </div>
    </scroller>
  </div>
</template>

<script>
import { XHeader,Scroller  } from "vux";

export default {
  components: {
    XHeader,
    Scroller 
  },
  data() {
    return {
      message: "hello UNK",
      rList: []
    };
  },
  methods: {},
  created: function() {
    var that = this;
    that.Global.AjaxGet(`user/GetMyTeam?p_uesrphone=${that.Global.CurrentUser.UserPhone}`, function(data) {
      that.rList = data.Data;
    });
  }
};
</script>

<style>
</style>