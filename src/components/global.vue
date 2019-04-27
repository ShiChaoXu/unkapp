<script>
const ISPROD = true;
const webApi = ISPROD
  ? "http://unk-token.com:9051/api/"
  : "http://localhost:8091/api/";
const Webwww = ISPROD ? "http://unk-token.com/" : "http://localhost:8090/";
const CurrentUser = null;
const CurrentTokenList = [];

function AjaxGet(url, callback, isAsync = true) {
  if (url.indexOf("?") == -1) {
    url += `?t=${new Date().getTime()}`;
  } else {
    url += `&t=${new Date().getTime()}`;
  }
  $.ajax({
    url: webApi + url,
    type: "GET",
    async: isAsync,
    beforeSend: function() {
      MVue.$vux.loading.show({text:'Loading'})
    },
    success: function(data) {
      MVue.$vux.loading.hide();
      callback(data);
    }
  });
}

function AjaxPost(url, postData, callback, isAsync = true) {
  $.ajax({
    url: webApi + url,
    type: "Post",
    async: isAsync,
    data: postData,
    beforeSend: function() {
     MVue.$vux.loading.show({text:'Loading'})
    },
    success: function(data) {
     MVue.$vux.loading.hide();
      callback(data);
    }
  });
}

function thousandBitSeparator(num) {
  num = num.toString();
  if (/^-?\d+\.?\d+$/.test(num)) {
    if (/^-?\d+$/.test(num)) {
      num = num + ",00";
    } else {
      num = num.replace(/\./, ",");
    }
    while (/\d{4}/.test(num)) {
      num = num.replace(/(\d+)(\d{3}\,)/, "$1,$2");
    }
    num = num.replace(/\,(\d*)$/, ".$1");
  }
  return num;
}

export default {
  AjaxGet,
  AjaxPost,
  CurrentUser,
  CurrentTokenList,
  thousandBitSeparator,
  Webwww,
  ISPROD
};
</script>
