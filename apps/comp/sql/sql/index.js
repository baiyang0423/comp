define(['commonutil','ompage','pluspop','/apps/comp/model/tip/index.js'],function(ajaxUtil, page, pluspop, tip){
	//执行任务js调用刷新页面
	var obj = {};
	obj.pageLimit = 10 ;
	
	obj.init = function(){
		obj.searchSql(1,true);
		obj.loadAccount();
		obj.loadRelationDB();
		obj.loadRelationUsers();
		$("#btn-edit").click(obj.edit);
		$("#btn-del").click(obj.del);
		$("#btn-excute-hand").click(obj.copy);
		$("#btn-excute").click(obj.cleck);
		$("#btn-close").click(obj.var);
		$("#btn-var-add-save").click(obj.varSave);
        //查询按钮
        $('body').delegate('#btn-search','click', function(event) {
            obj.searchSql(1,true);
        });
        $('body').delegate('#btn-reset','click', function(event) {
            $('#sql_form')[0].reset();
        });
        $("#btn-insert").click(obj.addDialog);
        $("#btn-insert-params").click(obj.selectDb);
        //变量双击选中
        $("table").delegate('.selectVars','dblclick', function() {
            try {
                $("#add-input-content").val($("#add-input-content").val() + $(this).attr("value"));
            } catch(e) { console.log(e) }
            var obj = dialog({ id: 'variableSQLDialog' });
            obj.close();
        });
        //选择数据库参数
        $("#db-dialog").click(obj.showSelectDBModel);
        $("body").delegate('#btn-search-db','click', function() {
            obj.loadDBList(1,true)
        });
        //绑定删除变量按钮
        $("#varmainbody").delegate(".btn_delete","click",function(){
            var id = $(this).attr("data-id");
            var name = $(this).attr("data-name");
            ajaxUtil.postrest(compWsg.sql_var_delete,function(data){
                if(data.retCode == '0'){
                    tip.success("删除成功","",function(){
                        obj.loadVarList();
                    });
                }else{
                    tip.fail("删除失败");
                }
            },{"id":id});

        });

        $("body").delegate('.rule-label label','click',function(){
            var label = $(this).closest("tr").siblings().find("label");
            label.removeClass("on");
            $(this).addClass("on");
        });
	}
	
	obj.searchSql = function (currentPage, first) {
        var param = {
            "currentPage": currentPage,
            "pageSize" : obj.pageLimit,
            "searchSQLName": $("#searchSQLName").val(),
            "searchSQLContent": $("#searchSQLContent").val(),
            "searchDB": $("#searchDB").val(),
            "searchUsers": $("#searchUsers").val(),
            "dbtype" : $("#dbtype").val(),
            "account" : $("#serchAccount").val()
        }
        require(["/apps/comp/sql/sql/tpl/sqlList.tpl"], function(mainbody) {
            ajaxUtil.callrest(compWsg.sql_manager_search, function(data) {
                if(data.retCode == '0'){
                    $("#mainbody").html(mainbody(data.data));
                    initTable();
                    if(first) {
                        page.init("mainPage", data.page, obj.search);
                    }
                }else{
                    pluspop.alert("查询出现异常!");
                }

            }, param, true);

        });
    }

    obj.loadAccount = function(){
        require(['/apps/comp/sql/sql/tpl/select.tpl'], function(obj) {
            ajaxUtil.callrest(compWsg.sql_manager_loadAccount, function(data) {
                if(data.retCode == "0") {
                    $("#serchAccount").html(obj(data.data));
                } else {
                    pluspop.alert("下拉菜-用户信息加载失败!");
                }
            }, null, true);
        });
    }

    obj.loadRelationDB = function(){
        require(['/apps/comp/sql/sql/tpl/select.tpl'], function(obj) {
            ajaxUtil.callrest(compWsg.sql_manager_loadRelationDB, function(data) {
                if(data.retCode == "0") {
                    $("#searchDB").html(obj(data.data));
                } else {
                    pluspop.alert("下拉菜-数据库信息加载失败!");
                }
            }, {"dbtype":$("#dbtype").val()}, true);
        });
    }

    obj.loadRelationUsers = function(){
        if($("#searchDB").val()==''){
            return false;
        }
        require(['/apps/comp/sql/sql/tpl/select.js'], function(obj) {
            ajaxUtil.callrest(compWsg.sql_manager_loadRelationUsers, function(data) {
                if(data.retCode == "0") {
                    $("#searchUsers").html(obj(data.data));
                } else {
                    pluspop.alert("下拉菜-用户信息加载失败!");
                }
            }, {"dbtype":$("#dbtype").val(),"db":$("#searchDB").val()}, true);
        });
    }

    /**
     * 增加页面
     */
    obj.addDialog = function(){
        obj.clearAddHtml();
        selfDialog = dialog({
            id: 'sql_add_dialog',
            title: 'SQL配置新增',
            content: $('#sql_add_dialog')[0],
            width: 750,
            height: 380,
            okValue: '保存',
            ok: obj.save,
            cancelValue: '关闭',
            cancel: function() {}
        }).showModal();
    }

    /**
     * 保存
     * @returns {boolean}
     */
    obj.save = function(){
        if ($("#addForm").valid()) {
            //serializeObject 类的json化
            var param = $("#addForm").serializeObject();
            ajaxUtil.postrest(compWsg.sql_manager_addSQLSetting, function(data) {
                if (data.retCode == 0) {
                    tip.success("脚本新增成功","",function(){
                        obj.searchSql(1,true)
                    });
                } else {
                    tip.fail("脚本新增失败");
                }
            },param);
        }else{
            return false;
        }
    }

    obj.edit = function(){
        var sqlobj = $(":checkbox[name='items-sql']:checked");
        if(sqlobj.length == 0){
            pluspop.alert("请选择要修改的SQL配置!");
            return ;
        }else if(sqlobj.length > 1){
            pluspop.alert("一次只能修改一条SQL配置!");
            return ;
        }
        if($(sqlobj[0]).attr("data-auth") == 'true'){
            ajaxUtil.callrest(compWsg.sql_edit_loadSettingInfo,function(data){
                if(data.retCode == '0' ){
                    obj.addDialog();
                    $("#sqlid").val(data.data.entity.id);
                    $("#resourceId").val(data.data.entity.db);
                    $("#instanceId").val(data.data.entity.instanceId);
                    $("#add-input-name").val(data.data.entity.name);
                    $("#db-dialog").val(data.data.entity.dbname);
                    $("#add-input-content").val(data.data.entity.content);
                    $("#add-input-remark").val(data.data.entity.remark);
                }else{
                    pluspop.alert("加载SQL配置信息出错!");
                }
            },{"id":$(sqlobj[0]).val(),"dbtype":$(sqlobj[0]).attr("data-type")},true);
        }else{
            pluspop.alert("该条SQL配置您没有修改权限,请使用"+$(sqlobj[0]).attr("data-user")+"账号进行修改!");
        }
    }


    obj.clearAddHtml = function () {
        $("#resourceId").val('');
        $("#instanceId").val('');
        $("#add-input-name").val('');
        $("#db-dialog").val('');
        $("#add-input-content").val('');
        $("#add-input-remark").val('');
    }

    obj.selectDb = function () {
        require(['/apps/comp/sql/sql/tpl/variable.tpl'],function(vars){
            ajaxUtil.callrest(compWsg.sql_var_list,function(data){
                if(data.retCode == '0'){
                    $("#var-main").html(vars(data.data));
                    var param = {
                        id: 'variableSQLDialog',
                        title: '',
                        content: $("#variableShowModel")[0],
                        width: '300px',
                        cancelValue: '关闭'
                    }
                    dialog(param, null, function() {return true;}).showModal();
                }else{
                    pluspop.alert("加载变量参数失败");
                }
            });
        });
    }

    obj.setDB = function(sqlobj){
        try{
            var pwd_id = $(sqlobj).attr('data-id');
            var instance_id = $(sqlobj).attr('data-instanceid');
            console.log(pwd_id)
            console.log(instance_id)
            $("#db-dialog").val("数据库:"+$(sqlobj).attr('data-db')
                +'实例名:'+$(sqlobj).attr('data-instance')
                +'用户名:'+$(sqlobj).attr('data-user'));
            $("#resourceId").val(pwd_id);
            $("#instanceId").val(instance_id);
        }catch(e){}
    }

    obj.showSelectDBModel = function(){
        obj.loadDBList(1,true);
        var param = {
            id: 'selectDBDialog',
            title: '',
            content: $("#dbShowModel")[0],
            width: '1200px',
            cancelValue: '关闭',
            okValue:'选择'
        }
        dialog(param,function(){//选择响应事件
            var sqlobj = $(":radio[name='input-radio-db']:checked");
            if(sqlobj.length == 0){
                pluspop.alert("请选取数据库或双击选中的数据库");
                return false;
            }
            obj.setDB(sqlobj[0]);
            return true;
        },function(){return true;}).showModal();
    }

    obj.loadDBList = function(currentPage, first){
        require(['/apps/comp/sql/sql/tpl/dbList.tpl'],function(list){
            var dbtype = $("#db-searchtype").val();
            var param = {
                "currentPage": currentPage,
                "pageSize" : obj.pageLimit,
                "dbName": $("#db-searchName").val(),
                "username": $("#db-searchUser").val(),
                "dbtype": dbtype
            }
            ajaxUtil.callrest(compWsg.sql_add_loadDBList, function(data) {
                if(data.retCode=='0'){
                    $("#db_main").html(list(data.data));
                    initTable();
                    if(first) {
                        page.init("db_page", data.page, obj.loadDBList);
                    }
                    $("tr[name='select-db-tr']").bind('dblclick',function(){
                        obj.setDB(this);
                        var sqlobj = dialog({ id: 'selectDBDialog' }).close();
                    });
                }else{
                    pluspop.alert("加载数据库信息失败!");
                }
            }, param, false);
        });
    }

    obj.del = function(){
            var sqlobj = $(":checkbox[name='items-sql']:checked");
            if(sqlobj.length == 0){
                pluspop.alert("请选择要删除的SQL配置!");
                return ;
            }
            var ids = Array();
            var auth = true;
            var msg = '';
            $.each(sqlobj,function(index,val){
                ids.push(val.value);
                if($(val).attr("data-auth") == 'false'){
                    auth = false;
                    msg += "\""+$(val).attr("data-name")+"\",";
                }
            });
            if(!auth){
                pluspop.alert(msg+"SQL配置您没有删除权限!");
                return false;
            }
            ajaxUtil.postrest(compWsg.sql_delete,function(data){
                if(data.retCode == '0' ){
                    tip.success("删除成功","",function(){
                        obj.searchSql(1,true);
                    });
                }else{
                    tip.fail("删除失败");
                }
            },{"ids":ids.toString()});
    }
    
    obj.copy = function () {
        var sqlobj = $(":checkbox[name='items-sql']:checked");
        if(sqlobj.length == 0){
            pluspop.alert("请选择要复制的SQL配置!");
            return ;
        }else if(sqlobj.length > 1){
            pluspop.alert("一次只能复制一条SQL配置!");
            return ;
        }
        ajaxUtil.postrest(compWsg.sql_copy,function(data){
            if(data.retCode == '0' ){
                tip.success("复制成功","",function(){
                    obj.searchSql(1,true);
                });
            }else{
                tip.fail("复制失败");
            }
        },{"id":$(sqlobj[0]).val()},true);
    }
    
    obj.cleck = function () {
        var obj = $(":checkbox[name='items-sql']:checked");
        if(obj.length == 0){
            pluspop.alert("请选择要查看的SQL配置!");
            return ;
        }else if(obj.length > 1){
            pluspop.alert("一次只能查看一条SQL配置!");
            return ;
        }
        $("#check-input-id").val("");
        $("#check-input-name").val("");
        $("#check-input-db").val("");
        $("#check-input-content").val("");
        $("#check-input-remark").val("");
        ajaxUtil.callrest(compWsg.sql_edit_loadSettingInfo,function(data){
            if(data.retCode == '0' ){
                $("#check-input-id").val(data.data.entity.id);
                $("#check-input-name").val(data.data.entity.name);
                $("#check-input-db").val(data.data.entity.dbname);
                $("#check-input-content").val(data.data.entity.content);
                $("#check-input-remark").val(data.data.entity.remark);
                var param = {
                    id: 'checkSQLDialog',
                    title: '查看SQL执行',
                    content: $("#readShowModel")[0],
                    width: '1300px',
                    cancelValue: '关闭'

                }
                dialog(param, null, function() {return true;}).showModal();
            }else{
                pluspop.alert("加载SQL配置信息出错!");
            }
        },{"id":$(obj[0]).val(),"dbtype":$(obj[0]).attr("data-type")},true);
    }

    obj.var = function () {
        var param = {
            id: 'varManagerDialog',
            title: '',
            content: $("#varShowModel")[0],
            width: '1000px',
            cancelValue: '关闭'
        }
        obj.loadVarList();
        dialog(param,null, function() {return true;}).showModal();
    }

    obj.loadVarList = function () {
        require(['/apps/comp/sql/sql/tpl/varList.tpl'],function(main){
            ajaxUtil.callrest(compWsg.sql_var_list,function(data){
                if(data.retCode == '0'){
                    $("#varmainbody").html(main(data.data));
                    initTable();
                }else {
                    pluspop.alert("加载用户环境变量失败");
                }
            },null,true);
        });
    }

    obj.varSave = function () {
        if($("#varForm").valid()){
            var param = $("#varForm").serializeObject();
            ajaxUtil.postrest(compWsg.sql_var_add,function(data){
                if(data.retCode == '0'){
                    tip.success("添加成功","",function(){
                        obj.loadVarList();
                        $("input[name='varName']:first").val("");
                        $("input[name='varContent']:first").val("");
                    });
                }else{
                    tip.fail("添加失败");
                }
            },param);
        }
    }


	return obj;	
})