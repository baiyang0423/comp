将下面html粘贴到npage模块的首页下
<!--加载弹窗-->
<!--#include file="/apps/comp/model/tip/tip.html" -->
调用代码:
require(["/apps/comp/model/tip/index.js"],function(index){
	//index.success("办理成功","办理时间aaa");
	//index.fail("办理失败","失败时间aaa");
	//index.loading("任务加载中....");
	//index.close();
});