let musicOptions = {
  disable_statistics_report: false,   // 禁止自动发送上传统计信息到七牛，默认允许发送
  runtimes: 'html5',      // 上传模式,依次退化
  browse_button: 'musicUpload',         // 上传选择的点选按钮，**必需**
  // 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
  // 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
  // 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
  // uptoken : '<Your upload token>', // uptoken 是上传凭证，由其他程序生成
  uptoken_url: 'http://localhost:8889/uptoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
  // uptoken_func: function(file){    // 在需要获取 uptoken 时，该方法会被调用
  //    // do something
  //    return uptoken;
  // },
  get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
  // downtoken_url: '/downtoken',
  // Ajax请求downToken的Url，私有空间时使用,JS-SDK 将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
  // unique_names: true,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
  // save_key: true,                  // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
  domain: '//p4ybacwlp.bkt.clouddn.com',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
  container: 'dragUpload',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
  max_file_size: '100mb',             // 最大文件体积限制
  flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入 flash,相对路径
  max_retries: 0,                     // 上传失败最大重试次数
  dragdrop: true,                     // 开启可拖曳上传
  drop_element: 'dragUpload',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
  chunk_size: '40mb',                  // 分块上传时，每块的体积
  auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
  init: {
    // 文件上传成功之后执行的函数
    'FileUploaded': function (up, file, info) {
      var domain = up.getOption('domain');
      var response = JSON.parse(info.response);
      var sourceLink = 'http://' + domain + '/' + decodeURIComponent(response.key);
    },
  }
}

var musicUploader = Qiniu.uploader(musicOptions)

let pictureOptions = {
  disable_statistics_report: false,   // 禁止自动发送上传统计信息到七牛，默认允许发送
  runtimes: 'html5',      // 上传模式,依次退化
  browse_button: 'pictureUploadButton',         // 上传选择的点选按钮，**必需**
  // 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
  // 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
  // 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
  // uptoken : '<Your upload token>', // uptoken 是上传凭证，由其他程序生成
  uptoken_url: 'http://localhost:8889/uptoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
  // uptoken_func: function(file){    // 在需要获取 uptoken 时，该方法会被调用
  //    // do something
  //    return uptoken;
  // },
  get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
  // downtoken_url: '/downtoken',
  // Ajax请求downToken的Url，私有空间时使用,JS-SDK 将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
  // unique_names: true,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
  // save_key: true,                  // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
  domain: '//p4ybacwlp.bkt.clouddn.com',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
  container: 'pictureDragUpload',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
  max_file_size: '100mb',             // 最大文件体积限制
  flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入 flash,相对路径
  max_retries: 0,                     // 上传失败最大重试次数
  dragdrop: true,                     // 开启可拖曳上传
  drop_element: 'pictureDragUpload',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
  chunk_size: '40mb',                  // 分块上传时，每块的体积
  auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
  init: {
    // 文件上传成功之后执行的函数
    'FileUploaded': function (up, file, info) {
      var domain = up.getOption('domain');
      var response = JSON.parse(info.response);
      var sourceLink = 'http://' + domain + '/' + decodeURIComponent(response.key);
      $('#pictureDragUpload').css('background-image',`url(${sourceLink})`)
    },
  }
}
let pictureUpload = Qiniu.uploader(pictureOptions)