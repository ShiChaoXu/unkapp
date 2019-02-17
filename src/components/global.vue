<script>
const webApi = "http://unk-token.com:8091/api/";
const Webwww = "http://unk-token.com/"
const CurrentUser = null;
const CurrentTokenList = [];
function AjaxGet(url, callback, isAsync = true) {
  $.ajax({
    url: webApi + url,
    type: "GET",
    async: isAsync,
    success: function(data) {
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
    success: function(data) {
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
  Webwww
};
</script>
