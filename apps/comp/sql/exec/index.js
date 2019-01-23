define(['commonutil','ompage','pluspop','/apps/comp/model/tip/index.js',"/apps/comp/sql/sql/index.js"],function(ajaxUtil, page, pluspop, tip, index){
    /*
     * 重写setDB,当选择数据库之后确认回调按钮
     */
	index.setDB = function (obj) {
        var pwd_id = $(obj).attr('data-id');
        var instance_id = $(obj).attr('data-instanceid');
        var dbtype = $(obj).attr('data-dbtype');
        var dbname = "数据库:" + $(obj).attr('data-db') +
            '实例名:' + $(obj).attr('data-instance') +
            '用户名:' + $(obj).attr('data-user');

        console.log(obj);
        console.log(pwd_id);

        require(["/apps/comp/sql/exec/tpl/add2.js"], function(main) {
            ajaxUtil.callrest(compWsg.sql_exec_addCustomSql, function(data) {
                if(data.retCode == '0') {
                    $("#main02").append(main(data.data));
                    if($("#noselect-id").val() == "") {
                        $("#noselect-id").val(data.data.entity.id);
                    } else {
                        $("#noselect-id").val($("#noselect-id").val() + "," + data.data.entity.id);
                    }
                } else {
                    pluspop.alert(data.retMsg);
                }
            }, { "pwdid": pwd_id, "instanceid": instance_id, "dbname": dbname, "dbtype": dbtype }, true);
        });
    }
    $("#btn-search-db").click(index.loadDBList(1,true));
    $("#select-id").val("");

	//执行任务js调用刷新页面
	var obj = {};
	obj.pageLimit = 10 ;
	obj.init = function(){
        $("#execsqlForm").initForm({
            messages: {
                "execsqlcontent": {
                    required: "SQl内容不能为空.."
                }
            }
        });
        /**选择SQL下拉菜单绑定*/
        $("#btn-exec-select").change(obj.btnSelect);
        /*选择SQL的查询按钮绑定**/
        $('body').delegate('#btn-search','click', function(event) {
            obj.search(1,true);
        });
        /*选择SQL的重置按钮绑定**/
        $("#btn-reset").click(
        	$("#searchSQLName").val(""),
        	$("#searchSQLContent").val(""),
        	$("#searchDB").val(""),
        	$("#searchUsers").val("")
		);
        /*更换类型重新加载关联数据库*/
        $("#dbtype").change(
            $("#searchDB").html('<option value="">请选择</option>'),
        	$("#searchUsers").html('<option value="">请选择</option>'),
			obj.loadRelationDB
		);

        $("#searchDB").change(
            $("#searchUsers").html('<option value="">请选择</option>'),
            obj.loadRelationUsers
		);
		//执行按钮绑定
        $("#btn-execute").click(obj.execAll);

        $("body").delegate(".self_noselect_exec","click",function(){
            var id = $(this).attr("data-index");
            obj.execByNoSelectId(id);
        });

        $("body").delegate(".self_select_exec","click",function(){
            var id = $(this).attr("data-index");
            obj.execBySelectId(id);
        });

        $("body").delegate(".self_noselect_delete","click",function(){
            var id = $(this).attr("data-index");
            $("div[data-index='"+id+"']").empty();
            $("div[data-index='"+id+"']").remove();
            var arr = $("#noselect-id").val().split(",");
            var news = new Array();
            $.each(arr,function(index,val){
                if(val != id){
                    news.push(val);
                }
            });
            if(news.length > 1){
                $("#noselect-id").val(news.toString());
            }else if(news.length == 1){
                $("#noselect-id").val(news[0]);
            }else{
                $("#noselect-id").val("");
            }
        });

        $("body").delegate(".self_select_delete","click",function(){
            var id = $(this).attr("data-index");
            $("div[data-index='"+id+"']").empty();
            $("div[data-index='"+id+"']").remove();
            var arr = $("#select-id").val().split(",");
            var news = new Array();
            $.each(arr,function(index,val){
                if(val != id){
                    news.push(val);
                }
            });
            if(news.length > 1){
                $("#select-id").val(news.toString());
            }else if(news.length == 1){
                $("#select-id").val(news[0]);
            }else{
                $("#select-id").val("");
            }
            obj.addParamExec();
        });

    }

	obj.search = function(currentPage, first){
        var param = {
            "currentPage": currentPage,
            "pageSize": obj.pageSize,
            "searchSQLName": $("#searchSQLName").val(),
            "searchSQLContent": $("#searchSQLContent").val(),
            "searchDB": $("#searchDB").val(),
            "searchUsers": $("#searchUsers").val(),
            "dbtype": $("#dbtype").val()
        }
        require(["/apps/comp/sql/sql/tpl/sqlList.js"], function(mainbody) {
            ajaxUtil.callrest(compWsg.sql_exec_list, function(data) {
                if(data.retCode == '0') {
                    $("#mainbody").html(mainbody(data.data));
                    initTable();
                    if(first) {
                        page.init("mainPage", data.page, obj.search);
                    }
                } else {
                    pluspop.alert("查询出现异常!");
                }
            }, param, true);
        });
	}

	obj.loadRelationDB = function(){
        require(['/apps/comp/sql/sql/tpl/select.js'], function(obj) {
            ajaxUtil.callrest(compWsg.sql_exec_loadRelationDB, function(data) {
                if(data.retCode == "0") {
                    $("#searchDB").html(obj(data.data));
                } else {
                    pluspop.alert("下拉菜-数据库信息加载失败!");
                }
            }, { "dbtype": $("#dbtype").val() }, true);
        });
	}
    /**插入SQL执行内容*/
    obj.addSqlExec = function(id, dbtype, addSql) {
        ajaxUtil.callrest(compWsg.sql_exec_selectById, function(data) {
            if(data.retCode == '0') {
                $("#main01").append(addSql(data.data));
                if($("#select-id").val() == "") {
                    $("#select-id").val(id);
                } else {
                    $("#select-id").val($("#select-id").val() + "," + id);
                }
            } else {
                pluspop.alert(data.retMsg);
            }
        }, { "id": id, "dbtype": dbtype }, false);
    }
    /**根据选择SQL汇总变量*/
    obj.addParamExec = function() {
        ajaxUtil.callrest(compWsg.sql_exec_loadSqlParam, function(data) {
            var cc = new Array();
            /* 遍历返回的参数集合**/
            $.each(data.data.entity, function(index, val) {
                if($("#param-" + val.value).length == 1) {
                    //获取为清空之前已有的参数input的值,并缓存起来
                    var tmp = {
                        "name": "#param-" + val.value,
                        "value": $("#param-" + val.value).val()
                    }
                    cc[cc.length] = tmp;
                }
            });
            require(["/apps/comp/sql/exec/tpl/add.js", "/apps/comp/sql/exec/tpl/param.js"], function(addSql, addParams) {
                $("#paramMain").html(addParams(data.data));
                $.each(cc, function(index, val) {
                    $(val.name).val(val.value);
                });
            });
        }, { "id": $("#select-id").val() }, true);
    }

    obj.loadRelationUsers = function() {
        if($("#searchDB").val() == '') {
            return false;
        }
        require(['../sql/sql/tpl/select.tpl'], function(obj) {
            ajaxUtil.callrest(compWsg.sql_exec_loadRelationUsers, function(data) {
                if(data.retCode == "0") {
                    $("#searchUsers").html(obj(data.data));
                } else {
                    pluspop.alert("下拉菜-用户信息加载失败!");
                }
            }, { "dbtype": $("#dbtype").val(), "db": $("#searchDB").val() }, true);
        });

    }

	obj.btnSelect = function () {
        console.log("选择按钮查询页面");
        var cur = $(this).val();
        if('1' == cur) {
            var param = {
                id: 'model1',
                title: '',
                content: $("#sqlSelectShowModel")[0],
                width: '1300px',
                cancelValue: '关闭',
                okValue: '选择'
            };
            obj.search(1, true);
            obj.loadRelationDB();
            dialog(param, function() {
                var sql = $(":checkbox[name='items-sql']:checked");
                if(sql.length == 0) {
                    pluspop.alert("请选择SQL配置!");
                    return false;
                }
                require(["/apps/comp/sql/exec/tpl/add.js"], function(addSql) {
                    $.each(sql, function(index, val) {
                        if($("#" + val.value).length > 0) {
                            pluspop.alert("\"" + $(val).attr("data-name") + "\"SQL配置已经存在");
                        } else {
                            obj.addSqlExec(val.value, $(val).attr("data-type"), addSql);
                        }
                    });
                    obj.addParamExec();
                    dialog({ id: 'model1' }).close();
                });
                return false;
            }, function() { return true; }).showModal();
        } else if('2' == cur) {
            index.showSelectDBModel();
        } else {

        }
        $(this).val('0');
    }

    /**
     * 导出结果
     * @param {Object} id 执行ID
     */
    obj.exportExcel = function (id,pwdType,pwdId){
        if(id == undefined || id == ""){
            pluspop.alert("导出传入的执行编号为空,不能进行导出操作!");
            return false;
        }
        if(pwdType == undefined || pwdType == ""){
            pluspop.alert("导出传入的类型编号为空,不能进行导出操作!");
            return false;
        }
        if(pwdId == undefined || pwdId == ""){
            pluspop.alert("导出传入的目标编号为空,不能进行导出操作!");
            return false;
        }
        var params = {
            "logid":id,
            "pwdType":pwdType,
            "pwdId":pwdId
        }
        ajaxUtil.callrest(compWsg.sql_result_valid,function(data){
            if(data.retCode == '0'){
                $("#download_blank").empty();
                $("#download_blank").append($("<iframe>").attr("src",
                    compWsg.sql_result_export+"?"+$.param(params)));
            }else{
                pluspop.alert(data.retMsg);
            }

        },params,true);
    }

    obj.showResultModelHandler = function() {
        var param = {
            id: 'resultShowDialog',
            title: '',
            content: $("#resultShowModel")[0],
            width: '1366px',
            cancelValue: '关闭'

        }
        dialog(param, null, function() { return true; }).showModal();
    }

    obj.execByNoSelectId = function (id){
        if(id == undefined || id == ""){
            pluspop.alert("选择的执行SQl没有执行编号无法执行!");
        }
        $("#resultmain").html('');
        obj.showResultModelHandler();
        require(["/apps/comp/sql/exec/tpl/result.tpl","/apps/comp/sql/exec/tpl/error.tpl"], function(resultTpl,errorTpl) {
            var params = $("input[name='execsqlparams']");
            var str = "";
            if(params.length > 0) { //存在参数
                $.each(params, function(index, val) {
                    str += $(val).attr("data-name") + "=" + $(val).val() + ";";
                });
            }
            $("#resultmain").append("<div id='div" + id + "'></div>");
            ajaxUtil.postrest(compWsg.sql_exec_execute, function(data) {
                if(data.retCode == '0'){
                    $("#div" + id).html(resultTpl(data.data));
                    $("#"+data.data.entity.logid).on("click",function(){
                        obj.exportExcel($(this).attr("id"),$(this).attr("data-dbtype")
                            ,$(this).attr("data-pwdid"));
                    });
                    initTable();
                }else{
                    $("#div" + id).html(errorTpl(data));
                }
            }, {
                "content": $("#content-" + id).val(),
                "pwdid": $("#" + id).attr("data-pwdid"),
                "instanceId": $("#" + id).attr("data-instanceid"),
                "dbtype": $("#" + id).attr("data-dbtype"),
                "param": str
            }, true);
        });
    }

    obj.execBySelectId = function (id){
        if(id == undefined || id == ""){
            pluspop.alert("选择的执行SQl没有执行编号无法执行!");
        }
        $("#resultmain").html('');
        obj.showResultModelHandler();
        require(["/apps/comp/sql/exec/tpl/result.tpl","/apps/comp/sql/exec/tpl/error.tpl"], function(resultTpl,errorTpl) {
            var params = $("input[name='execsqlparams']");
            var str = "";
            if(params.length > 0) { //存在参数
                $.each(params, function(index, val) {
                    str += $(val).attr("data-name") + "=" + $(val).val() + ";";
                });
            }
            $("#resultmain").append("<div id='div" + id + "'></div>");
            ajaxUtil.postrest(compWsg.sql_exec_execute, function(data) {
                if(data.retCode == '0'){
                    $("#div" + id).html(resultTpl(data.data));
                    $("#"+data.data.entity.logid).on("click",function(){
//						sql.exportExcel("table-"+$(this).attr("id"));
                        obj.exportExcel($(this).attr("id"),$(this).attr("data-dbtype")
                            ,$(this).attr("data-pwdid"));
                    });
                    initTable();
                }else{
                    $("#div" + id).html(errorTpl(data));
                }
            }, {
                "id": id,
                "content": $("#content-" + id).val(),
                "pwdid": $("#"+id).attr("data-pwdid"),
                "instanceId": $("#"+id).attr("data-instanceId"),
                "dbtype": $("#"+id).attr("data-dbtype"),
                "param": str
            }, true);
        });

    }
    obj.execAll = function(){
        $("#resultmain").html('');
        obj.showResultModelHandler();
        require(["/apps/comp/sql/exec/tpl/result.tpl","/apps/comp/sql/exec/tpl/error.tpl"], function(resultTpl,errorTpl) {
            var params = $("input[name='execsqlparams']");
            var str = "";
            if(params.length > 0) { //存在参数
                $.each(params, function(index, val) {
                    str += $(val).attr("data-name") + "=" + $(val).val() + ";";
                });
            }
            //自定义SQL
            var noids = $("#noselect-id");
            if(noids.length > 0 && $("#noselect-id").val() != '') {
                var arr = $("#noselect-id").val().split(",");
                $.each(arr, function(index, val) {
                    $("#resultmain").append("<div id='div" + val + "'></div>");
                    ajaxUtil.callpost(compWsg.sql_exec_execute, function(data) {
                        if(data.retCode == '0'){
                            $("#div" + val).html(resultTpl(data.data));
                            $("#"+data.data.entity.logid).on("click",function(){
//								sql.exportExcel("table-"+$(this).attr("id"));
                                obj.exportExcel($(this).attr("id"),$(this).attr("data-dbtype")
                                    ,$(this).attr("data-pwdid"));
                            });
                            initTable();
                        }else{
                            $("#div" + val).html(errorTpl(data));
                        }
                    }, {
                        "content": $("#content-" + val).val(),
                        "pwdid": $("#" + val).attr("data-pwdid"),
                        "instanceId": $("#" + val).attr("data-instanceid"),
                        "dbtype": $("#" + val).attr("data-dbtype"),
                        "param": str
                    }, true);
                });

            }
            //获取已选id
            var ids = $("#select-id");
            if(ids.length > 0 && $("#select-id").val() != '') { //存在该元素
                var arr = $("#select-id").val().split(",");
                $.each(arr, function(index, val) {
                    $("#resultmain").append("<div id='div" + val + "'></div>");
                    ajaxUtil.postrest(compWsg.sql_exec_execute, function(data) {
                        if(data.retCode == '0'){
                            $("#div" + val).html(resultTpl(data.data));
                            $("#"+data.data.entity.logid).on("click",function(){
//								sql.exportExcel("table-"+$(this).attr("id"));
                                obj.exportExcel($(this).attr("id"),$(this).attr("data-dbtype")
                                    ,$(this).attr("data-pwdid"));
                            });
                            initTable();
                        }else{
                            $("#div" + val).html(errorTpl(data));
                        }
                    }, {
                        "id": val,
                        "content": $("#content-" + val).val(),
                        "pwdid": $("#"+val).attr("data-pwdid"),
                        "instanceId": $("#"+val).attr("data-instanceId"),
                        "dbtype": $("#"+val).attr("data-dbtype"),
                        "": str
                    }, true);
                });
            }
        });
    }
	return obj;
})