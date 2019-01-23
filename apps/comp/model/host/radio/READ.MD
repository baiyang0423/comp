<!-- 选择主机-->
<div class="none" id="select_host_radio_model">
	<!--#include file="/apps/comp/model/host/radio/model.html" -->
</div>
调用代码:
function(data){}:为回调函数 data为选择需求确定后返回的对象{id:"主机ID",name:"主机IP"}
require(["/apps/comp/model/host/radio/main.js"],function(host){
	host.open(function(data){
		console.log("响应事件",data);
	});
});