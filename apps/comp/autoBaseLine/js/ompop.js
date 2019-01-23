define(function(){
	var pluspop = {};
						
	pluspop.temp = '<div><div class="dialog-overflow fs-14 pd-20 pdt-30"><p class="color-lightblue fs-28" style="text-align: center;">{msg}</p></div></div>',		
	
	/**
	 * 双事件
	 */
	pluspop.confirmAll = function (_msg,_funok,_canfun){
		var d = dialog({
	        title: '提示信息',
	        content: pluspop.temp.replace('{msg}',_msg),
	        width: 400,
	        okValue: '是',
	        ok: _funok,
	        cancelValue: '否',
	        cancel: _canfun
	    }).showModal();
	}
	
	
	/**
	 * 确认函数
	 */
	pluspop.confirm = function (_msg,_funok,_canfun){
		var d = dialog({
	        title: '提示信息',
	        content: pluspop.temp.replace('{msg}',_msg),
	        width: 400,
	        okValue: '确定',
	        ok: _funok,
	        cancelValue: '关闭',
	        cancel: _canfun
	    }).showModal();
	}
	
	/**
	 * 提示函数
	 */
	pluspop.alert =  function (_msg){
		var d = dialog({
	        title: '提示信息',
	        content: pluspop.temp.replace('{msg}',_msg),
	        width: 400,
	        cancelValue: '关闭',
	        cancel: function() {}
	    }).showModal();
	}
	
	pluspop.warn =  function (_msg,_back){
		var d = dialog({
	        title: '提示信息',
	        content: pluspop.temp.replace('{msg}',_msg),
	        width: 400,
	        cancelValue: '关闭',
	        cancel: _back
	    }).showModal();
	}
	
	/**
	 * 提示信息对象
	 */
	pluspop.msg = {
		'delete_failure':'删除失败!',
		'add_failure':'添加失败!',
		'update_failure':'修改失败!',
		'op_failure':'操作失败!',
		'please_choose':'请选择!',
		'please_choose_one':'请选择一条!',
		'confirm_delete':'确认要删除吗？',
		'confirm_edit':'确认要修改吗？',
		'confirm_exe':'确认要执行吗？',
		'failure':'获取数据失败！'
	}
	
	return pluspop;
})