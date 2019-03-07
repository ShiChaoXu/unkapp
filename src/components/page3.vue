<template>
  <div>
    <x-header title="资讯" :left-options="{showBack: false}"></x-header>
    <scroller :lock-x="true" :scrollbarY="true" height="-120">
      <div class style="background:white;">
        <div class="row">
          <div
            class="col-xs-12"
            @click="skipToHerf(item.title,item.url)"
            v-for="(item,index) in newList"
            :key="index"
          >
            <div class="thumbnail">
              <img alt="..." v-bind:src="item.thumbnail_pic_s">
              <div class="caption">
                <h3>{{item.title}}</h3>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { XHeader, Scroller } from "vux";

export default {
  components: {
    XHeader,
    Scroller
  },
  data() {
    return {
      message: "hello UNK",
      newList: []
    };
  },
  methods: {
    skipToHerf: function(title, obj) {
      this.$router.push({
        path: "/NewsDetails",
        query: { title: title, url: obj }
      });
    }
  },
  created: function() {
    var that = this;
    $.ajax({
      url: "http://toutiao-ali.juheapi.com/toutiao/index?type=caijing",
      type: "GET",
      dataType: "JSON",
      headers: { Authorization: "APPCODE f4a6dc65f4d34b5ab56c3ffc33b62867" },
      success: function(data) {
        that.newList = data.result.data;
      }
    });
  }
};
</script>

<style>
</style>