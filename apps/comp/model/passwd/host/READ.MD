<!-- 选择主机密码 radio方式-->
<div class="none" id="select_pwd_host_radio_model">
	<!--#include file="/apps/comp/model/passwd/host/radio/model.html" -->
</div>
调用代码:
function(data){}:为回调函数 data为选择密码确定后返回的对象
require(["/apps/comp/model/passwd/host/radio/main.js"],function(host){
	host.open(function(data){
		console.log("响应事件",data);
	});
});


<!-- 选择主机密码 check方式-->
<div class="none" id="select_pwd_host_check_model">
	<!--#include file="/apps/comp/model/passwd/host/check/model.html" -->
</div>
调用代码:
//function(data){}:为回调函数 data为选择密码确定后返回的对象
require(["/apps/comp/model/passwd/host/check/main.js"],function(host){
	host.open(function(data){
		console.log("响应事件",data);
	});
});