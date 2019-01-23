define(['commonutil','ompage','pluspop','/apps/comp/model/tip/index.js'],function(ajaxUtil,page,pluspop,tip){
    //执行任务js调用刷新页面
    var obj = {};
    obj.pageLimit = 10 ;

    obj.init = function(){
        obj.searchScene(1,true);
        obj.getSceneTypeList();
        $("#insert").click(obj.insertScene);
        //查询按钮
        $('body').delegate('#btn-search','click', function(event) {
            obj.searchScene(1,true);
        });
        $('body').delegate('#log','click', function(event) {
            obj.log();
        });
    }

    /**
     * 查询场景类型
     */
    obj.getSceneTypeList=function(){
        $("#sceneType").empty();
        $("#sceneType").append("<option value=''>请选择</option>");
        var para = {};
        ajaxUtil.callrest(compWsg.scene_type_search, function(data) {
            var tempList = new Array();
            if(data.data.entity){
                tempList = data.data.entity;
                for(var i =0 ; i<tempList.length; i++){
                    $("#sceneType").append("<option value='"+tempList[i].id+"'>"+tempList[i].name+"</option>");
                }
            }
        }, para);
    }

    /**
     * 查看场景执行日志
     */
    obj.log = function(){
        var selected = $("input[name='cb_scene']:checked");
        if(selected.length ==0 ){
            pluspop.alert("请选择要查看日志的场景!");
        }else if(selected.length == 1 ){
            var d = dialog({
                title: ' ',
                content: "正在加载日志查看界面请稍候。。。。",
                width: 400,
                cancelValue: '关闭',
                cancel: function() {}
            }).showModal();
            var sceneId = $(selected[0]).val();
            ajaxUtil.callrest(compWsg.scene_execute_last_log,function(data){
                if(data.retCode == '0'){
                    require(['./tpl/log.tpl'],function(fun){
                        d.close();
                        $("#exec_log").html(fun(data.data.entity));
                        dialog({
                            id: 'execute_log_model',
                            title: '',
                            content: $('#js_dg_self_excute_log'),
                            width: 1366,
                            height: 700,
                            cancelValue: '关闭',
                            cancel: function() {}
                        }).showModal();
                    });
                }else{
                    d.close();
                    pluspop.alert(data.retMsg);
                }
            },{"sceneId":sceneId},true);
        }else{
            pluspop.alert("一次只能选择一条要查看日志的场景!");
        }
    }

    /**
     * 查询场景
     */
    obj.searchScene = function(currentPage, first) {
        var para = {
            "type": $("#sceneType").val(),
            "currentPage": currentPage,
            "name":$("#sceneName").val(),
            "startTime":$("#startTime").val(),
            "endTime":$("#endTime").val(),
            "pageSize": 20
        };
        ajaxUtil.callrest(compWsg.scene_search, function(data) {
            if(data.retCode == '0') {
                require(['./tpl/sceneList.tpl'], function(fun) {
                    $('#tbody_scenePage').html(fun(data.data));
                    $("button[name='execute_btn']").bind('click', function() {
                        obj.excuteScene($(this).attr("data-id"));
                    });
                    initTable();
                    if(first) {
                        page.inits('scenePage', data.page, obj.searchScene);
                    }
                });
            } else {
                pluspop.alert(data.retMsg);
            }
        }, para, true);
    }
    /**
     *
     */
    obj.insertScene = function () {
        var sceneTypeId = $("#sceneType").val();
        var sceneTypeName = $("#sceneType").find("option:selected").text();
        $("#theadList").empty();
        $("#down_sceneTypeId").val("");
        $("#upload_sceneTypeId").val("");
        if(sceneTypeId != "") {
            $("#sceneTypeNameInAdd").text(sceneTypeName);
            $("#sceneTypeIdInAdd").val(sceneTypeId);
            $("#down_sceneTypeId").val(sceneTypeId);
            $("#upload_sceneTypeId").val(sceneTypeId);
            /**
             * 加载参数头部
             */
            ajaxUtil.callrest(compWsg.scene_type_params_search, function(data) {
                if(data.retCode == '0') {
                    var selfDialog = dialog({
                        id: 'addSelfModel',
                        title: '',
                        content: $('#addSceneDialog'),
                        width: 1366,
                        height: 500,
                        okValue: '确定',
                        ok: obj.save,
                        cancelValue: '关闭',
                        cancel: function() {},
                        "button": [{
                            id: 'downTempBtn',
                            value: "下载参数模板",
                            callback: function(e) {
                                if($("#down_sceneTypeId").val() == "") {
                                    pluspop.alert("场景类型编号传输失败!");
                                }
                                $("#downloadForm").attr("action", compWsg.scene_param_templete_download);
                                $("#downloadForm").submit();
                                return false;
                            },
                            display: true,
                            autofocus: true
                        }]

                    });
                    require(['./tpl/head.tpl'], function(head) {
                        $("#theadList").html(head(data.data));
                        selfDialog.showModal();
                    });

                } else {
                    pluspop.alert("初始化增加场景页面失败!");
                }
            }, { "id": sceneTypeId }, true);
        } else {
            pluspop.alert("请选择一个场景!");
        }
    }

    /**
     * 确定新增场景
     */
    obj.save = function() {
        var scene_type_id = $("#down_sceneTypeId").val();
        var params = {
            "scene_type_id": $("#down_sceneTypeId").val(),
            "name": $("#sceneNameInAdd").val(),
            "remark": $("#sceneRemarkInAdd").val()
        };
        //判断场景名称是否为空
        if(params.name == "") {
            pluspop.alert("请输入场景名称！");
            return false;
        }
        //判断场景描述是否为空
        if(params.remark == "") {
            pluspop.alert("请输入场景描述！");
            return false;
        }
        dialog({ id: 'addSelfModel' }).close();
        var d = dialog({
            title: ' ',
            content: "正在保存请稍候。。。。",
            width: 400,
            cancelValue: '关闭',
            cancel: function() {}
        }).showModal();
        //获取场景类型参数
        ajaxUtil.callrest(compWsg.scene_type_params_search, function(data) {
            $.each(data.data.entity.params, function(index, val) {
                var paramName = val.paramCode;
                var paramValue = new Array();
                var arrs = $("input[name='" + paramName + "']", $("#paramForm")); //获取参数值
                $.each(arrs, function(i, b) {
                    paramValue[paramValue.length] = $(b).val();
                });
                params[paramName] = paramValue.toString();
            });
        }, { "id": $("#down_sceneTypeId").val() }, false);
        //开始保存
        ajaxUtil.postrest(compWsg.scene_insert, function(data) {
            d.close();
            if(data.retCode == "0") {
                obj.searchScene(1, true);
                pluspop.alert(data.retMsg);
            } else {
                pluspop.alert(data.retMsg);
            }
        }, params, true);
        return false;
    }

    /**
     * 执行场景
     */
    obj.excuteScene = function(sceneId) {
        var model = dialog({
            id: 'selfDialog0',
            title: '执行前预览',
            content: $('#js_dg_self_excute')[0],
            width: "1250px",
            height: "550px",
            okValue: '确定',
            ok: obj.sureExcute,
            cancelValue: '取消',
            cancel: function() {}
        });
        var d = dialog({
            title: ' ',
            content: "正在调用打开执行前预览页面请稍候。。。。",
            width: 400,
            cancelValue: '关闭',
            cancel: function() {}
        }).showModal();
        ajaxUtil.callrest(compWsg.scene_preview, function(data) {
            if(data.retCode == '0'){
                require(['./tpl/preview.tpl'], function(fun) {
                    $("#preview").html(fun(data.data.entity));
                    d.close();
                    model.showModal();
                });
            }else{
                d.close();
                pluspop.alert(data.retMsg);
            }
        }, { "sceneId": sceneId }, true);
    }

    /**
     * 确认执行场景
     */
    obj.sureExcute = function() {
        var model = dialog({
            id: 'resultModel',
            title: '',
            content: $('#js_dg_self_excute_result')[0],
            width: "1250px",
            height: "550px",
            cancelValue: '关闭',
            cancel: function() {}
        });
        dialog({ id: 'selfDialog0' }).close();
        var d = dialog({
            title: ' ',
            content: "正在执行请稍候。。。。",
            width: 400,
            cancelValue: '关闭',
            cancel: function() {}
        }).showModal();
        ajaxUtil.postrest(compWsg.scene_execute, function(data) {
            obj.searchScene(1, true);
            if(data.retCode == '0'){
                ajaxUtil.callrest(compWsg.scene_execute_last_log,function(data){
                    d.close();
                    require(['./tpl/log.tpl'],function(fun){
                        $("#exec_log").html(fun(data.data.entity));
                        dialog({
                            id: 'execute_log_model',
                            title: '',
                            content: $('#js_dg_self_excute_log'),
                            width: 1366,
                            height: 700,
                            cancelValue: '关闭',
                            cancel: function() {}
                        }).showModal();
                    });
                },{"sceneId":$("#sceneIdInExc").val()},true);
            }else{
                pluspop.alert("执行失败!");
            }
        }, { "sceneId": $("#sceneIdInExc").val() }, true);
        return false;
    }



    return obj;
})