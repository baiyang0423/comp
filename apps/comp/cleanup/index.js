define(['commonutil','ompage','pluspop','/apps/comp/model/tip/index.js'],function(ajaxUtil,page,pluspop,tip){
    //执行任务js调用刷新页面
    var obj = {};
    obj.pageLimit = 10 ;

    obj.init = function(){
        obj.search(1,true);
        //查询按钮
        $('body').delegate('#btn-search','click', function(event) {
            obj.search(1,true);
        });
        $('body').delegate('#btn-reset','click', function(event) {
            $('#cleanup_form')[0].reset();
        });
        $("#btn-insert").click(obj.addDialog);
        $("#selectPwdBtn").click(obj.selectHost);
        $("#btn-edit").click(obj.searchOne);
        $("#btn-del").click(obj.delete);
        $("#btn-clean").click(obj.clean);
        $("#btn-reset").click(obj.refresh);
        $("#btn-cleanup").click(obj.cleanup);
    }
    /**
     * 分页查询
     * @param currentPage
     * @param first
     */
    obj.search = function(currentPage,first){
        var directoryName = $("#directoryName").val();
        var directoryPath = $("#directoryPath").val();
        var param = {
            "directoryName":directoryName,
            "directoryPath":directoryPath,
            "currentPage": currentPage,
            "pageLimit" : obj.pageLimit
        }
        ajaxUtil.callrest(compWsg.cleanup_manager_searchWithPage, function(data) {
            // tip.close();
            require(['./tpl/list.tpl'], function(fun) {
                $("#mainbody").html(fun(data.data));
                initTable();
                if (first) {
                    page.init('mainPage',data.page,obj.search);
                }
            });
        },param,true);

    }
    obj.clearAddHtml = function(){
        $("#add_host_ip").val("");
        $("#add_directoryName").val("");
        $("#add_directoryDesc").val("");
        $("#add_directoryPath").val("");
    }
    /**
     * 增加页面
     */
    obj.addDialog = function(){
        // obj.clearSelect();
        obj.clearAddHtml();
        // obj.initSelect();
        selfDialog = dialog({
            id: 'cleanup_add_dialog',
            title: '新增目录清理',
            content: $('#cleanup_add')[0],
            width: 750,
            height: 380,
            okValue: '保存',
            ok: obj.save,
            cancelValue: '关闭',
            cancel: function() {}
        }).showModal();
    }
    /**
     * 根据id单条查询
     */
    obj.searchOne = function(){
        if ($('input[name="items-cleanup"]:checked').size()==1) {
            var para ={'id':$('input[name="items-cleanup"]:checked').val()};
            ajaxUtil.callrest(compWsg.cleanup_manager_select, function(data) {
                obj.showEditHtml(data.data.entity);
                if (data.retCode == 0) {
                        dialog({
                            id: 'cleanup_edit_dialog',
                            title: '修改目录清理',
                            content: $('#cleanup_add')[0],
                            width: 750,
                            height:380,
                            okValue: '保存',
                            ok: obj.save,
                            cancelValue: '关闭',
                            cancel: function() {}
                        }).showModal();
                } else {
                    pluspop.alert("修改回显失败");
                }
            },para);
        }else{
            pluspop.alert("请选择一个任务");
            return false;
        }
    }

    obj.showEditHtml = function(entity){
        $("#add_host_ip").val(entity.hostIp);
        $("#add_directoryName").val(entity.directoryName);
        $("#add_directoryDesc").val(entity.directoryDesc);
        $("#add_directoryPath").val(entity.directoryPath);
    }
    /**
     * 保存
     * @returns {boolean}
     */
    obj.save = function(){
        if ($("#addForm").valid()) {
            //serializeObject 类的json化
            var param = $("#addForm").serializeObject();
                ajaxUtil.postrest(compWsg.cleanup_manager_save, function(data) {
                    if (data.retCode == 0) {
                        tip.success("脚本新增成功","",function(){
                            obj.search(1,true)
                        });
                    } else {
                        tip.fail("脚本新增失败");
                    }
                },param);
        }else{
            return false;
        }
    }
    /**
     * 选择主机
     */
    obj.selectHost = function(){
        require(["/apps/comp/model/passwd/host/radio/main.js"],function(host){
            host.open(function(data){
                $("#add_host_ip").val(data.ip);
                $("#pwdId").val(data.id);
            });
        });
    }
    /**
     * 删除
     * @returns {boolean}
     */
    obj.delete = function(){
        var arr = $("input[type='checkbox'][name='items-cleanup']:checked");
        if(arr.length == 0){
            pluspop.alert("请选择要删除的配置!");
            return false;
        }else if(arr.length == 1){
            var params = {
                id : arr[0].value
            }
            ajaxUtil.postrest(compWsg.cleanup_manager_delete,function(data){
                if(data.retCode == '0'){
                    obj.search(1, true);
                }else{
                    pluspop.alert(data.retMsg);
                }
            },params);
        }else{
            pluspop.alert("只能选择一条信息!");
            return false;
        }
    }

    obj.clean = function(){
        if ($('input[name="items-cleanup"]:checked').size()==1) {
            var para ={'id':$('input[name="items-cleanup"]:checked').val()};
            ajaxUtil.callrest(compWsg.cleanup_manager_select, function(data) {
                obj.showCleanHtml(data.data.entity);
                if (data.retCode == 0) {
                    dialog({
                        id: 'cleanup_clean_dialog',
                        title: '清理目录清理',
                        content: $('#cleanup_clean')[0],
                        width: 750,
                        height:380,
                        cancelValue: '关闭',
                        cancel: function() {}
                    }).showModal();
                } else {
                    pluspop.alert("");
                }
            },para);
        }else{
            pluspop.alert("请选择一个任务");
            return false;
        }
    }

    obj.showCleanHtml = function(entity){
        $("#clean_directory_id").val(entity.id);
        $("#clean_directory_lastJobId").val(entity.lastJobId);
        $("#clean_directory_host_ip").val(entity.hostIp);
        $("#clean_directory_user").val(entity.userName);
        $("#clean_directory_name").val(entity.directoryName);
        $("#clean_directory_path").val(entity.directoryPath);
        $("#clean_directory_num").val(entity.directoryNum);
        $("#clean_directory_size").val(entity.directorySize);
    }

    obj.refresh = function(){
        obj.refreshHtml();
        ajaxUtil.callrest(compWsg.cleanup_manager_select,function(data){
            if(data.retCode == '0' ){
                obj.showCleanHtml(data.data.entity);
            }else{
                //pluspop.alert("加载SQL配置信息出错!");
            }
        },{"id":$("#clean_directory_id").val()},true);

    }

    obj.refreshHtml = function(){
        $("#clean_directory_host_ip").val('');
        $("#clean_directory_user").val('');
        $("#clean_directory_name").val('');
        $("#clean_directory_path").val('');
        $("#clean_directory_num").val('');
        $("#clean_directory_size").val('');
    }

    obj.cleanup = function(){
        var id = $("#clean_directory_id").val();
        var pwdId = $("#clean_directory_lastJobId").val();
        var directoryName = $("#clean_directory_name").val();
        var directoryPath = $("#clean_directory_path").val();
        dialog({
            id: 'select_pwd_db_radio_dialog',
            title: '',
            content: '<p style="text-align: center;font-size: 20px margin-bottom:50px;">是否备份</p>',
            width: 100,
            height: 20,
            okValue:"备份",
            ok:function(){
                var params = {
                    "id":id,
                    "pwdId":pwdId,
                    "directoryName":directoryName,
                    "directoryPath":directoryPath,
                    "flag":"0"
                }
                ajaxUtil.postrest(compWsg.cleanup_manager_backupCleanup, function(data) {
                    if(data.retCode == "0") {
                        pluspop.alert("备份清理执行成功");
                    } else {
                        pluspop.alert(data.retMsg);
                    }
                },params);
            },
            cancelValue: '关闭',
            cancel: function() {
                var params = {
                    "id":id,
                    "pwdId":pwdId,
                    "directoryName":directoryName,
                    "directoryPath":directoryPath,
                    "flag":"1"
                }
                ajaxUtil.postrest(compWsg.cleanup_manager_backupCleanup, function(data) {
                    if(data.retCode == "0") {
                        pluspop.alert("清理执行成功");
                    } else {
                        pluspop.alert(data.retMsg);
                    }
                },params);
            }
        }).showModal();
    }



    return obj;
})