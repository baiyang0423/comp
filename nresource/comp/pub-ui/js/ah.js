// dialog对话框 (from artDialog)
if (window.dialog) {
    __loadDialog();
} else {
    $(function() {
        window.dialog && __loadDialog();
    })
}
function __loadDialog() {
    $.ui_dialog = dialog;
    // dialog弹出页面隐藏区域
	$.fn.ui_dialog = function(options) {
	    var _this = $(this);
	    if (!_this.length) {
	        return;
	    };
	    var defaults = {
	        id: 'ui_dialog_one_fn' + Math.random(),
	        content: _this.show()[0],
	        padding: 0,
	        cancelDisplay: false,
	        cancel: function() {
	            this.close();
	            return false;
	        }
	    };
	    var _opt = $.extend(true, defaults, options);
	    return $.ui_dialog(_opt);
	}
	// 统一弹框关闭
	$('.js_close').on('click', function(event) {
	event.preventDefault();
	var id = $(this).attr('data-target');
	    var dg = id ? $.ui_dialog.get(id) : $.ui_dialog.getCurrent();
	    dg.close();
	});
	// dialog.alert
	$.ui_dialog.alert = function(msg, callback) {
	    return dialog({
	        id: 'ui_dialog_one_alert',
	     	content: msg,
	     	okValue: '确定',
	     	fixed: true,
	     	skin: 'ui-dialog-mwidth',
	     	ok: function() {
	         	if (typeof callback == 'function')
	            callback();
	        }
	    }).showModal();
	};
	// dialog.confirm
	$.ui_dialog.confirm = function(msg, ok, cancel) {
	    return dialog({
	        id: 'ui_dialog_one_confirm',
	     	content: msg,
	     	okValue: '确定',
	     	fixed: true,
	     	skin: 'ui-dialog-mwidth',
	     	ok: function() {
	         	if (typeof ok == 'function')
	            ok();
	     	},
	     	cancelValue: '取消',
	     	cancel: function() {
	         	if (typeof cancel == 'function')
	                cancel();
	        }
	    }).showModal();
	}
	// dialog.info
	var _dialog_info_tick;
	$.ui_dialog.info = function(msg, time) {
	    time = time || 3;
	    var d = $.ui_dialog.get('ui_dialog_one_info');
	 	if (_dialog_info_tick) {
	     	clearTimeout(_dialog_info_tick);
	     	d.content(msg);
	 	} else {
	     	d = dialog({
		        id: 'ui_dialog_one_info',
		        content: msg,
		        skin: 'ui-dialog-info',
		        fixed: true,
		        minWidth: 260,
		        maxWidth: 600
	    	}).show();
		}
		var _dwrap = d._$('dialog');
		_dwrap.css('margin-left', -_dwrap.outerWidth() / 2 + 'px');
		_dialog_info_tick = setTimeout(function() {
		    d.close().remove();
		    clearTimeout(_dialog_info_tick);
		    _dialog_info_tick = null;
		}, time * 1000);
		return d;
	}
}
//tab切换(参数echar为echarts函数名)
function tagtog1(classname){
	$("."+classname+" ul.topul li").on("click",function(){
		$(this).addClass("choice").siblings("li").removeClass("choice");
		$("."+classname+" .tag-item,."+classname+" ul.topul li span").removeClass("tag-show").addClass("tag-hide");
		$(this).find("span").removeClass("tag-hide").addClass("tag-show");
		$("."+classname+" .tag-item").eq($(this).index()).removeClass("tag-hide").addClass("tag-show");
	});
}
function tagtog2(echar,classname){
	$("."+classname+" ul.topul li").on("click",function(){
		$(this).addClass("choice").siblings("li").removeClass("choice");
		$("."+classname+" .tag-item,."+classname+" ul.topul li span").removeClass("tag-show").addClass("tag-hide");
		$(this).find("span").removeClass("tag-hide").addClass("tag-show");
		$("."+classname+" .tag-item").eq($(this).index()).removeClass("tag-hide").addClass("tag-show");
		echar($(this).index());
	});
}
//复选框单选按钮切换
$(".em-checkbox").on("click",function(){
	$(this).toggleClass("click");
})
//复选按钮
$("body").delegate(".js-checkbox input","click",function(event){
	$(this).parent(".js-checkbox").toggleClass("checked");
});
//$(".all-checked-ah span").on("click",function(){
////	$(this).parent(".replace-checkbox").toggleClass("checked");
//	var tbody = $(this).closest("table").children("tbody");
//	if($(this).parent().hasClass("checked")){
//		var lable = tbody.children("tr").find(".js-checkbox.replace-checkbox");
//		lable.addClass("checked");
//		lable.children("input").prop('checked','checked');
//	}else{
//		var lable = tbody.children("tr").find(".js-checkbox.replace-checkbox");
//		lable.removeClass("checked");
//		lable.children("input").prop('checked','');
//	}
//})
/*是否切换*/
$(".allr-type").click(function(event) {
    	/* Act on the event */
    	$(this).addClass('on');
    	$(this).siblings('span').removeClass('on');
    });
/*配置流程弹框*/
$(".kv-lis").click(function(event) {
	/* Act on the event */
	$(this).addClass('on');
	$(".kv-lis").not(this).removeClass('on');
});
$(".pei-tk").click(function(event) {
	/* Act on the event */
	$(this).addClass('on');
	$(this).siblings('div').removeClass('on');
});



