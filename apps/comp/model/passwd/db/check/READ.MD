<!-- 选择数据库密码 -->
<div class="hide" id="select_pwd_db_check_model">
	<!--#include file="/apps/comp/model/passwd/db/check/model.html" -->
</div>
调用代码:
function(data){}:为回调函数 data为选择需求确定后返回的对象{id:"需求ID",name:"需求名称"}
require(["/apps/comp/model/passwd/db/check/main.js"],function(db){
	db.open(function(data){
		console.log("响应事件",data);
	});
});