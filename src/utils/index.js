/*
 * 防抖函数
 * @fn   箭头函数，相应执行的防抖内容
 * @delay  时间，事件防抖时间
 * */
export const debounce = (fn, delay = 20) => {
  let timeout = null;
  return function() {
    let args = arguments;
    if (timeout) window.clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
/*
 * 节流函数
 * @fn   相应执行的节流内容
 * @delay  时间，事件防抖时间
 * */
export function throttle(fn, delay) {
  //初始化当前的时间
  let begin = 0;
  return function() {
    let curTime = +new Date();
    if (curTime - begin >= delay) {
      fn.call(this, arguments[0]);
      begin = curTime;
    }
  };
}
/**
 * 为下拉框增加全部选项，值为''
 **/
export function insertAllLabel(data) {
  console.log(data, "insertAllLabel");
  let selectData = [];
  if (data.length > 0) {
    selectData = [{ label: "全部", value: "" }, ...data];
  } else {
    selectData = [{ label: "全部", value: "" }];
  }
  return selectData;
}

/*
 * 获取当前屏幕放大比率
 * @param (num) : 需要计算当前屏幕比例的值(不传，获取当前屏幕相对于小屏幕（width:1920）的比例。
 * @return 当前屏幕比例的值(Int)
 * */

export function getScreenRateValue(num = 1) {
  let clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  let sR = clientWidth ? clientWidth / 1920 : 1;
  return sR * num;
}
/**
 * 校验是数字就返回true
 **/

function isNumber(val) {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}

// 处理数据格式为.00
export function NumFormat(value) {
  if (!value) return "0.00";
  value = parseFloat(value).toFixed(2);
  var intPart = Math.trunc(value); // 获取整数部分
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
  var floatPart = ".00"; // 预定义小数部分
  var value2Array = value.split(".");
  // =2表示数据有小数位
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString(); // 拿到小数部分
    if (floatPart.length === 1) {
      return intPartFormat + "." + floatPart + "0";
    } else {
      return intPartFormat + "." + floatPart;
    }
  } else {
    return intPartFormat + floatPart;
  }
}

/*
 * @description 获取不同格式的时间
 * @param (myDate) new Date(日期)
 * 不传默认今天,
 * 传-30默认前一个月
 *
 * 使用：
 * today().Y 结果：2020
 * today().YM 结果：2020-12
 * ......
 * 详见return
 *
 * */
export function today(myDate) {
  let date;
  if (myDate) {
    date = new Date(myDate);
    if (isNumber(myDate)) {
      let dayDiffer = "";
      if (myDate == -30) {
        dayDiffer = new Date().setMonth(new Date().getMonth() - 1);
      } else if (myDate == 0) {
        dayDiffer = new Date(today().YMD);
      } else {
        let timeNum = new Date().getTime();
        dayDiffer = myDate * 24 * 60 * 60 * 1000 + timeNum;
      }
      date = new Date(dayDiffer);
    }
  } else {
    date = new Date();
  }
  let Y = date.getFullYear();
  let OY = date.getFullYear() - 1;
  let W = getWeek(date);
  let OM = date.getMonth();
  OM = OM == "0" ? "12" : OM;
  let M = date.getMonth() + 1;
  M = M < 10 ? "0" + M : M;
  let D = date.getDate();
  D = D < 10 ? "0" + D : D;
  let H = date.getHours();
  H = H < 10 ? "0" + H : H;
  let Mi = date.getMinutes();
  Mi = Mi < 10 ? "0" + Mi : Mi;
  let S = date.getSeconds();
  S = S < 10 ? "0" + S : S;

  return {
    Y: Y + "", // 年
    YM: Y + "-" + M, // 年-月
    YMD: Y + "-" + M + "-" + D, // 年-月-日
    W: Y + "-" + `${W}`, // 年-周
    YMDHM: Y + "-" + M + "-" + D + " " + H + ":" + Mi, // 年-月-日 时-分
    YMDHMS: Y + "-" + M + "-" + D + " " + H + ":" + Mi + ":" + S, // 年-月-日 时-分-秒
    YOM: Y + "-" + OM, // 年-月(上月)
    OY: OY, //  上年
    FirstDay: Y + "-" + M + "-01",
    FirstMonth: Y + "-01"
  };
}

/*
 * 导出文件
 * fileResult 接口返回值
 * fileName 自定义接口名
 * 备注：接口添加  responseType: 'blob'
 * */
export function exportFile(fileResult, fileName = "模板.xls") {
  let fileSuffix = fileName.split(".")[1];
  let fileType = "application/vnd.ms-excel";
  console.log(fileName, fileSuffix, "file=======>");
  // Mime 全类型下载文件
  switch (fileSuffix) {
    case "aac":
      fileType = "audio/aac";
      break;
    case "abw":
      fileType = "application/x-abiword";
      break;
    case "arc":
      fileType = "application/x-freearc";
      break;
    case "avi":
      fileType = "video/x-msvideo";
      break;
    case "azw":
      fileType = "application/vnd.amazon.ebook";
      break;
    case "bin":
      fileType = "application/octet-stream";
      break;
    case "bmp":
      fileType = "image/bmp";
      break;
    case "bz":
      fileType = "application/x-bzip";
      break;
    case "bz2":
      fileType = "application/x-bzip2";
      break;
    case "csh":
      fileType = "application/x-csh";
      break;
    case "css":
      fileType = "text/css";
      break;
    case "csv":
      fileType = "text/csv";
      break;
    case "doc":
      fileType = "application/msword";
      break;
    case "docx":
      fileType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      break;
    case "eot":
      fileType = "application/vnd.ms-fontobject";
      break;
    case "epub":
      fileType = "application/epub+zip";
      break;
    case "gif":
      fileType = "image/gif";
      break;
    case "htm":
    case "html":
      fileType = "text/html";
      break;
    case "ico":
      fileType = "image/vnd.microsoft.icon";
      break;
    case "ics":
      fileType = "text/calendar";
      break;
    case "jar":
      fileType = "application/java-archive";
      break;
    case "jpeg":
    case "jpg":
      fileType = "image/jpeg";
      break;
    case "js":
      fileType = "text/javascript";
      break;
    case "json":
      fileType = "application/json";
      break;
    case "jsonld":
      fileType = "application/ld+json";
      break;
    case "mid":
    case "midi":
      fileType = "audio/midi";
      break;
    case "mjs":
      fileType = "text/javascript";
      break;
    case "mp3":
      fileType = "audio/mpeg";
      break;
    case "mpeg":
    case "mp4":
      fileType = "video/mpeg";
      break;
    case "mpkg":
      fileType = "application/vnd.apple.installer+xml";
      break;
    case "odp":
      fileType = "application/vnd.oasis.opendocument.presentation";
      break;
    case "ods":
      fileType = "application/vnd.oasis.opendocument.spreadsheet";
      break;
    case "odt":
      fileType = "application/vnd.oasis.opendocument.text";
      break;
    case "oga":
      fileType = "audio/ogg";
      break;
    case "ogv":
      fileType = "video/ogg";
      break;
    case "ogx":
      fileType = "application/ogg";
      break;
    case "otf":
      fileType = "font/otf";
      break;
    case "png":
      fileType = "image/png";
      break;
    case "pdf":
      fileType = "application/pdf";
      break;
    case "ppt":
      fileType = "application/vnd.ms-powerpoint";
      break;
    case "pptx":
      fileType =
        "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      break;
    case "rar":
      fileType = "application/x-rar-compressed";
      break;
    case "rtf":
      fileType = "application/rtf";
      break;
    case "sh":
      fileType = "application/x-sh";
      break;
    case "svg":
      fileType = "image/svg+xml";
      break;
    case "swf":
      fileType = "application/x-shockwave-flash";
      break;
    case "tar":
      fileType = "application/x-tar";
      break;
    case "tif":
    case "tiff":
      fileType = "image/tiff";
      break;
    case "ttf":
      fileType = "font/ttf";
      break;
    case "txt":
      fileType = "text/plain";
      break;
    case "vsd":
      fileType = "application/vnd.visio";
      break;
    case "wav":
      fileType = "audio/wav";
      break;
    case "weba":
      fileType = "audio/webm";
      break;
    case "webm":
      fileType = "video/webm";
      break;
    case "webp":
      fileType = "image/webp";
      break;
    case "woff":
      fileType = "font/woff";
      break;
    case "woff2":
      fileType = "font/woff2";
      break;
    case "xhtml":
      fileType = "application/xhtml+xml";
      break;
    case "xls":
      fileType = "application/vnd.ms-excel";
      break;
    case "xlsx":
      fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      break;
    case "xml":
      fileType = "text/xml";
      break;
    case "xul":
      fileType = "application/vnd.mozilla.xul+xml";
      break;
    case "zip":
      fileType = "application/zip";
      break;
    case "3gp":
      fileType = "video/3gpp";
      break;
    case "3g2":
      fileType = "video/3gpp2";
      break;
    case "7z":
      fileType = "application/x-7z-compressed";
      break;
  }
  console.log(fileType);
  if (fileResult instanceof Blob) {
    const blob = new Blob([fileResult], { type: fileType });
    if ("download" in document.createElement("a")) {
      // 非IE下载
      const elink = document.createElement("a");
      elink.download = fileName;
      elink.style.display = "none";
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    } else {
      // IE10+下载
      navigator.msSaveBlob(blob, fileName);
    }
  } else {
    Message({
      type: "error",
      message: "下载失败",
      duration: 1500
    });
  }
}
