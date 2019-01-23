<!-- 选择脚本-->
<div class="none" id="select_script_radio_model">
	<!--#include file="/apps/comp/model/script/radio/model.html" -->
</div>
require(["/apps/comp/model/script/radio/main.js"],function(script){
	script.open(function(data){
		console.log("响应事件",data);
	});
});