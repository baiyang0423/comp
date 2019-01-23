define(['commonutil','ompage','pluspop','/apps/comp/model/tip/index.js'],function(ajaxUtil, page, pluspop, tip){
    //执行任务js调用刷新页面
    var obj = {};
    obj.pageLimit = 10 ;

    obj.init = function(){
        obj.search(1,true);
        // $("#btn-search").click(obj.search);
        //查询按钮
        $('body').delegate('#btn-search','click', function(event) {
            obj.search(1,true);
        });
        $('body').delegate('#btn-reset','click', function(event) {
            $('#backup_form')[0].reset();
        });
        $("#insert").click(obj.addDialog);
        $("#edit").click(obj.editDialog);
        $("#selectSoftWare").click(obj.selectSoft);
        $("#selectPwdBtn").click(obj.selectHost);
        $("#del").click(obj.delete);
        $("#exec").click(obj.exec);
        $("#his").click(obj.his);
    }
    //查询列表页
    obj.search = function (currentPage, first) {
        var param = {
            "currentPage": currentPage,
            "type" : "conf",
            "title" : $("#searchTitle").val()
        }
        ajaxUtil.callrest(compWsg.backup_manager_search, function(data) {
            require(["./tpl/list.tpl"],function(mainbody){
                $("#mainbody").html(mainbody(data.data));
                initTable();
                if(first) {
                    page.init("mainPage", data.page, obj.search);
                }
            });
        }, param, true);
    }
    /**
     * 增加页面
     */
    obj.addDialog = function(){
        obj.clearAddHtml();
        selfDialog = dialog({
            id: 'backup_conf_add_dialog',
            title: '配置文件备份新增',
            content: $('#backup_conf_add_dialog')[0],
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

            ajaxUtil.postrest(compWsg.backup_manager_save, function(data) {
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
                $("#soft_host_name").val(data.ip);
                $("#soft_host_id").val(data.id);
            });
        });
    }
    //增加初始化
    obj.clearAddHtml = function(){
        console.log("初始化参数")
    }
    //删除
    obj.delete = function(){
        var arr = $("input[type='checkbox'][name='items']:checked");
        if(arr.length == 0){
            pluspop.alert("请选择要删除的配置!");
            return false;
        }else if(arr.length == 1){
            var params = {
                id : arr[0].value
            }
            ajaxUtil.postrest(compWsg.backup_manager_delete,function(data){
                if(data.retCode == '0'){
                    obj.search(1,true);
                }else{
                    pluspop.alert(data.retMsg);
                }
            },params);

        }else{
            pluspop.alert("只能选择一条配置删除!");
            return false;
        }
    }

    obj.exec = function(){
        var arr = $("input[type='checkbox'][name='items']:checked");
        if(arr.length == 0){
            pluspop.alert("请选择要执行的配置!");
            return false;
        }else if(arr.length == 1){
            var params = {
                id : arr[0].value
            }
            ajaxUtil.callrest(compWsg.backup_manager_exec,function(data){
                if(data.retCode == '0'){
                    backup.loadList(1, true);
                    pluspop.alert("执行成功!");
                }else{
                    pluspop.alert(data.retMsg);
                }
            },params,true);
        }else{
            pluspop.alert("只能选择一条配置执行!");
            return false;
        }
    }
    obj.editDialog =function(){
        var arr = $("input[type='checkbox'][name='items']:checked");
        if(arr.length == 0){
            pluspop.alert("请选择要修改的配置!");
            return false;
        }else if(arr.length == 1){
            var params = {
                id : arr[0].value
            }
            ajaxUtil.callrest(compWsg.backup_manager_load,function(data){
                if(data.retCode == '0'){
                    require(['./tpl/edit.tpl'],function(his){
                        $("#backup_conf_edit_model").html(his(data.data.entity));
                        var selfDialog = dialog({
                            id: 'edit_conf_backup_his_dialog',
                            title: '配置文件备份修改',
                            content: $('#backup_conf_edit_model')[0],
                            width: 1100,
                            height: 500,
                            okValue: '修改',
                            ok : function(){
                                obj.edit();
                            },
                            cancelValue: '关闭',
                            cancel: function() {}
                        }).showModal();
                    });

                }else{
                    pluspop.alert(data.retMsg);
                }
            },params,true);
        }else{
            pluspop.alert("只能选择一条配置修改!");
            return false;
        }
    }

    obj.edit = function(){
        var id = $("#soft_id").val();
        var title = $("#soft_title").val();
        var shell = $("#soft_shell").val();
        var path = $("#soft_path").val();
        var remarks = $("#soft_remark").val();
        var params = {
            "id":id,
            "title":title,
            "shell":shell,
            "softwarePath":path,
            "remarks":remarks
        };
        ajaxUtil.postrest(compWsg.software_backup_manager_edit,function(data){
            if(data.retCode == '0'){
                backup.loadList(1, true);
                pluspop.alert("修改成功!");
            }else{
                pluspop.alert(data.retMsg);
            }
        },params);
    }


    obj.his = function(){
        var arr = $("input[type='checkbox'][name='items']:checked");
        if(arr.length == 0){
            pluspop.alert("请选择要查看历史的配置!");
            return false;
        }else if(arr.length == 1){
            var params = {
                id : arr[0].value
            }
            ajaxUtil.callrest(compWsg.backup_manager_his,function(data){
                if(data.retCode == '0'){
                    require(['./tpl/his.tpl'],function(his){
                        $("#backup_conf_his_model").html(his(data.data));
                        var selfDialog = dialog({
                            id: 'conf_backup_his_dialog',
                            title: '配置文件备份历史    ',
                            content: $('#backup_conf_his_model')[0],
                            width: 1100,
                            height: 500,
                            cancelValue: '关闭',
                            cancel: function() {}
                        }).showModal();
                    });

                }else{
                    pluspop.alert(data.retMsg);
                }
            },params,true);
        }else{
            pluspop.alert("只能选择一条配置查看历史!");
            return false;
        }
    }


    return obj;
})