/**
 * 模块功能定义,为了保证更加清晰的显示每个模块下的子功能,现在对每个模块的地址进行拆分,并通过jQuery.extend的方式扩展
 * compWsg对象来达到整合的目的
 * 具体建立新模块方式如下:
 * 1. 声明模块名称如 var testWsg = {
 * 	声明对应自己的地址信息如(此时声明的地址必须全局唯一的不能和其他模块重复命名规则:模块名称_功能模块名称_具体操作): 
 * 	test:"/test-service/v1/comp/test/helloworld"
 * }
 * 2. 使用jQuery.extend(compWsg, testWsg); 进行扩展compWsg对象,仅需替换testWsg即可,其他不变
 */
var compWsg = {
	
}

var messageWsg = {
	message_send_op : "/message-service/v1/comp/message/send"
}
jQuery.extend(compWsg, messageWsg);
/**
 * 公共模块接口
 */
var modelWsg = {
	/**公共接口*/
	model_select_host : "/model-service/v1/comp/model/select/host",
	model_select_passwd_host : "/model-service/v1/comp/model/select/passwd/host",
	model_select_passwd_db:"/model-service/v1/comp/model/select/passwd/db",
	model_select_bomc_resource : "/model-service/v1/comp/model/select/bomc/resource",
	model_select_script: "/model-service/v1/comp/model/select/script"
}
jQuery.extend(compWsg, modelWsg);
/**
 * 脚本管理
 */
var scriptWsg = {
	//脚本类型
	script_type : "/script-service/v1/comp/script/type",
	// 查询脚本(查看当前用户)
	script_mySearch : "/script-service/v1/comp/script/mySearch",
	// 查询脚本(查看所有用户)
	script_allSearch : "/script-service/v1/comp/script/allSearch",
	// 脚本新增初始化类型
	script_add_type : "/script-service/v1/comp/script/add/type",
	// 脚本新增细分类型
	script_add_child_type : "/script-service/v1/comp/script/add/child/type",
	// 脚本新增 关联脚本回显
	script_add_link : "/script-service/v1/comp/script/add/link",
	// 脚本新增 关联组
	script_add_group : "/script-service/v1/comp/script/add/group",
	// 脚本增加保存
	script_add : "/script-service/v1/comp/script/add",
	// 脚本新增保存(脚本文件上传到服务器上)
	script_add_file : "/script-service/v1/comp/script/add/file",
	// 脚本修改回显（脚本详情）
	script_show : "/script-service/v1/comp/script/show",
	// 脚本修改保存
	script_update_save : "/script-service/v1/comp/script/update/save",
	// 脚本修改保存(脚本文件上传到服务器上)
	script_update_save_sh: "/script-service/v1/comp/script/update/save/sh",
	// 脚本删除  
	script_delete : "/script-service/v1/comp/script/delete"
}
jQuery.extend(compWsg, scriptWsg);
/**
 * 任务管理模块地址
 */
var taskWsg = {
	//任务管理列表分页查询
	task_manager_searchWithPage:"/task-service/v1/comp/task/searchWithPage",
	//任务管理查询脚本
	task_manager_selectScript:"/task-service/v1/comp/task/selectScript",
	//任务管理查询主机
	task_manager_selectHost:"/task-service/v1/comp/task/selectHost",
	//保存
	task_manager_save:"/task-service/v1/comp/task/save",
	//删除
	task_manager_delete:"/task-service/v1/comp/task/delete",
	//权限验证
	task_manager_checkAuthority:"/task-service/v1/comp/task/checkAuthority",
	//根据主键单条查询
	task_manager_searchOne:"/task-service/v1/comp/task/searchOne",
	//检验corn表达式是否正确
	task_manager_checkCorn:"/task-service/v1/comp/task/checkCorn",
	//关闭正在执行的任务
	task_manager_close:"/task-service/v1/comp/task/close",
	//执行任务
	task_manager_excute:"/task-service/v1/comp/task/excute",
	//手动执行任务
	task_manager_hand_exec : "/task-service/v1/comp/task/hand/execute",
	//根据任务主键查询任务日志
	task_manager_searchLogByTaskId:"/task-service/v1/comp/taskLog/searchLogByTaskId",
	//人员列表，设置权限列表
	task_manager_searchUser:"/task-service/v1/comp/taskLog/searchUser",
	//确定保存权限
	task_manager_saveAuthority:"/task-service/v1/comp/taskLog/saveAuthority",
	task_manager_removeAuthrity : "/task-service/v1/comp/taskLog/deleteAuthority"
}
jQuery.extend(compWsg, taskWsg);

var cleanupWsg = {
	//分页查询
	cleanup_manager_searchWithPage:"/cleanup-manager-service/v1/comp/cleanup/manager/list",
	cleanup_manager_save:"/cleanup-manager-service/v1/comp/cleanup/manager/insertInfo",
    cleanup_manager_select:'/cleanup-manager-service/v1/comp/cleanup/manager/select',
	cleanup_manager_delete:"/cleanup-manager-service/v1/comp/cleanup/manager/delete",
	cleanup_manager_backupCleanup:"/cleanup-manager-service/v1/comp/cleanup/manager/backupCleanup"
}
jQuery.extend(compWsg,cleanupWsg);

var backupWsg = {
	backup_manager_search:"/software-backup-manager-service/v1/comp/software/backup/manager/list",
	backup_manager_save:"/software-backup-manager-service/v1/comp/software/backup/manager/save",
	backup_manager_params:"/software-backup-manager-service/v1/comp/software/backup/manager/params",
    backup_manager_delete:"/software-backup-manager-service/v1/comp/software/backup/manager/delete",
    backup_manager_exec:"/software-backup-manager-service/v1/comp/software/backup/manager/exec",
    backup_manager_his:"/software-backup-manager-service/v1/comp/software/backup/manager/his",
    backup_manager_load:"/software-backup-manager-service/v1/comp/software/backup/manager/read",
    backup_manager_edit:"/software-backup-manager-service/v1/comp/software/backup/manager/edit"
}
jQuery.extend(compWsg,backupWsg);

/**
 * 密码管理模块
 * password_manager_staticstics:密码统计
 */
var passwordWsg = {
	password_manager_staticstics : "/pwd-service/v1/comp/pwd/tool/staticstics",
	password_templet_download:"/pwd-service/v1/comp/pwd/tool/downloadTemplet",
	password_pwd_type:"/pwd-service/v1/comp/pwd/tool/loadPwdType",
	password_db_queryDatabaseList:"/pwd-service/v1/comp/pwd/tool/queryDatabaseList",
	// 主机密码列表
	password_host : "/pwd-service/v1/comp/pwd/host/host",
	password_host_delete:'/pwd-service/v1/comp/pwd/host/deleteHost',
	password_host_export:'/pwd-service/v1/comp/pwd/host/exportHost',
	password_host_import:'/pwd-service/v1/comp/pwd/host/importHost',
	password_host_go_edit:'/pwd-service/v1/comp/pwd/host/loadHostInfoData',
	password_host_refresh:'/pwd-service/v1/comp/pwd/host/refreshHost',
	password_host_add:"/pwd-service/v1/comp/pwd/host/addHost",
	password_host_verify:"/pwd-service/v1/comp/pwd/host/verifyPasswd",
	//Mysql管理
	password_mysql : "/pwd-service/v1/comp/pwd/mysql/mysql",
	password_mysql_import_instance:"/pwd-service/v1/comp/pwd/mysql/importMysqlInstance",
	password_mysql_add:"/pwd-service/v1/comp/pwd/mysql/addMysql",
	password_mysql_delete:"/pwd-service/v1/comp/pwd/mysql/deleteMysqlInfo",
	password_mysql_refresh:"/pwd-service/v1/comp/pwd/mysql/refreshMysqlPass",
	password_mysql_check:"/pwd-service/v1/comp/pwd/mysql/verifyMysqlPasswd",
	password_mysql_loadMysqlInfo:"/pwd-service/v1/comp/pwd/mysql/loadMysqlInfo",
	password_mysql_import_users:"/pwd-service/v1/comp/pwd/mysql/importMysqlUser",
	password_mysql_export:"/pwd-service/v1/comp/pwd/mysql/exportMysqlUsers",
	//Oracle管理
	password_oracle : "/pwd-service/v1/comp/pwd/oracle/oracle",
	password_oracle_import_instance:"/pwd-service/v1/comp/pwd/oracle/importOracleInstance",
	password_oracle_add:"/pwd-service/v1/comp/pwd/oracle/addOracle",
	password_oracle_delete:"/pwd-service/v1/comp/pwd/oracle/deleteOracleInfo",
	password_oracle_refresh:"/pwd-service/v1/comp/pwd/oracle/refreshOraclePass",
	password_oracle_check:"/pwd-service/v1/comp/pwd/oracle/verifyOraclePasswd",
	password_oracle_loadOracleInfo:"/pwd-service/v1/comp/pwd/oracle/loadOracleInfo",
	password_oracle_import_users:"/pwd-service/v1/comp/pwd/oracle/importOracleUser",
	password_oracle_export:"/pwd-service/v1/comp/pwd/oracle/exportOracleUsers",
	//授权管理
	password_authiorty_getuserlist:"/pwd-service/v1/comp/pwd/authority/getUserList",
	password_authiorty_getHostList:"/pwd-service/v1/comp/pwd/authority/getHostList",
	password_authiorty_saveAuthority:"/pwd-service/v1/comp/pwd/authority/saveAuthority",
	password_authiorty_deleteHost:"/pwd-service/v1/comp/pwd/authority/deleteHost",
	
}
jQuery.extend(compWsg, passwordWsg);

/**
 * 基线加固
 */
var baseLineWsg = {
	//分页查询
	auto_baseLine_searchWithPage:"/auto-base-line-service/v1/auto/base/line/searchWithPage",
	//查询报告
	auto_baseLine_searchReport:"/auto-base-line-service/v1/auto/base/line/report/searchReport",
	//保存
	auto_baseLine_save:"/auto-base-line-service/v1/auto/base/line/save",
	//删除
	auto_baseLine_delete:"/auto-base-line-service/v1/auto/base/line/delete",
	//执行任务
	auto_baseLine_executeBaseTask:"/auto-base-line-service/v1/auto/base/line/executeBaseTask",
	//更新指标
	auto_baseLine_configureUpdate:"/auto-base-line-service/v1/auto/base/line/configure/configureUpdate",
	//获取任务ID
	auto_baseLine_getTaskId:"/auto-base-line-service/v1/auto/base/line/getTaskId",
	//单条查询
	auto_baseLine_searchOne:"/auto-base-line-service/v1/auto/base/line/searchOne",
	//主机分页
	auto_baseLine_resource_searchWithPage:"/auto-base-line-service/v1/auto/base/line/resource/searchWithPage",
	//保存预选主机
	auto_baseLine_resource_savePreviewResource:"/auto-base-line-service/v1/auto/base/line/resource/savePreviewResource",
	//根据任务ID查询主机
	auto_baseLine_resource_searchByTaskId:"/auto-base-line-service/v1/auto/base/line/resource/searchByTaskId",
	//根据任务ID删除主机
	auto_baseLine_resource_deleteByTaskId:"/auto-base-line-service/v1/auto/base/line/resource/deleteByTaskId",
	//未选指标
	auto_baseLine_kpi_unSelectedKpiLibrary:"/auto-base-line-service/v1/auto/base/line/kpi/unSelectedKpiLibrary",
	//已选指标
	auto_baseLine_kpi_selectedKpiLibrary:"/auto-base-line-service/v1/auto/base/line/kpi/selectedKpiLibrary",
	//所有指标
	auto_baseLine_kpi_selectAllKpiLibrary:"/auto-base-line-service/v1/auto/base/line/kpi/selectAllKpiLibrary",
	//查询方案
	auto_baseLine_kpi_searchKpiSetMeal:"/auto-base-line-service/v1/auto/base/line/kpi/searchKpiSetMeal",
	//查询方案指标
	auto_baseLine_kpi_searchKpiSetMealDetail:"/auto-base-line-service/v1/auto/base/line/kpi/searchKpiSetMealDetail",
	//保存指标
	auto_baseLine_configure_saveConfigure:"/auto-base-line-service/v1/auto/base/line/configure/saveConfigure",
	//更新指标
	auto_baseLine_configure_configureUpdate:"/auto-base-line-service/v1/auto/base/line/configure/configureUpdate",
	//指标检测
	auto_baseLine_configure_configureCheck:"/auto-base-line-service/v1/auto/base/line/configure/configureCheck",
	//检测结果
	auto_baseLine_configure_showConfigureCheckResule:"/auto-base-line-service/v1/auto/base/line/configure/showConfigureCheckResule",
	//检测进度
	auto_baseLine_configure_scheduleCheckPercent:"/auto-base-line-service/v1/auto/base/line/configure/scheduleCheckPercent",
	//检测预览
	auto_baseLine_configurePerview:"/auto-base-line-service/v1/auto/base/line/configure/configurePerview",
	//保存方案
	auto_baseLine_saveMeal:"/auto-base-line-service/v1/auto/base/line/kpi/saveMeal",
	/**
	 * 指标管理
	 */
	//分页查询
	auto_baseLine_kpi_searchWithPage:"/auto-base-line-service/v1/kpi/library/searchPage",
	//保存指标
	auto_baseLine_kpi_save:"/auto-base-line-service/v1/kpi/library/save",
	//查询指标分类
	auto_baseLine_kpi_searchClassification:"/auto-base-line-service/v1/kpi/library/searchClassification",
	//一条
	auto_baseLine_kpi_searchOne:"/auto-base-line-service/v1/kpi/library/searchOne",
	//删除
	auto_baseLine_kpi_delete:"/auto-base-line-service/v1/kpi/library/delete",
	//验证code唯一
	auto_baseLine_kpi_validateCode:"/auto-base-line-service/v1/kpi/library/validateCode",
	//同步文件
	auto_baseLine_kpi_synchronous:"/auto-base-line-service/v1/kpi/library/synchronous",

}
jQuery.extend(compWsg, baseLineWsg);

/**
 * 任务编排
 */
var plannerWsg = {
		//查一条
	auto_planner_searchOne:"/auto-planner-service/v1/auto/planner/schedule/searchOne",
	//删除
	auto_planner_delete:"/auto-planner-service/v1/auto/planner/schedule/delete",
	//暂停
	auto_planner_pauseAirFlow:"/auto-planner-service/v1/auto/planner/schedule/pauseAirFlow",
	//验证corn
	auto_planner_validateCorntab:"/auto-planner-service/v1/auto/planner/schedule/validateCorntab",
	//执行
	auto_planner_executeAirFlow:"/auto-planner-service/v1/auto/planner/schedule/executeAirFlow",
	//创建
	auto_planner_createAirFlow:"/auto-planner-service/v1/auto/planner/schedule/createAirFlow",
	//单次执行
	auto_planner_executeOne:"/auto-planner-service/v1/auto/planner/schedule/executeOneAirFlow",
	//预览
	auto_planner_showPreview:"/auto-planner-service/v1/auto/planner/schedule/showPreview",
	//保存
	auto_planner_save:"/auto-planner-service/v1/auto/planner/schedule/save",
	//分页查询
	auto_planner_searchWithPage:"/auto-planner-service/v1/auto/planner/schedule/searchWithPage",
	//获取登录用户
	auto_planner_getLoginUser:"/auto-planner-service/v1/auto/planner/schedule/getLoginUser",
	//获取ID
	auto_planner_getNewId:"/auto-planner-service/v1/auto/planner/schedule/getNewId",
	//分页查询子任务
	auto_planner_step_searchBaseLineWithPage:"/auto-planner-service/v1/auto/planner/schedule/step/searchBaseLineWithPage",
	//保存步骤
	auto_planner_step_save:"/auto-planner-service/v1/auto/planner/schedule/step/save",
	//删除步骤
	auto_planner_step_delete:"/auto-planner-service/v1/auto/planner/schedule/step/delete",
	//查询原子任务
	auto_planner_step_job_searchAtomicTask:"/auto-planner-service/v1/auto/planner/schedule/step/job/searchAtomicTask",
	//保存原子任务
	auto_planner_step_job_save:"/auto-planner-service/v1/auto/planner/schedule/step/job/save",
	//折线图数据
	auto_planner_showBrokenLine:"/auto-planner-service/v1/auto/planner/schedule/report/showBrokenLine",
	//执行结果统计
	auto_planner_showResultCount:"/auto-planner-service/v1/auto/planner/schedule/report/showExecStatus",
	//报告数据
	auto_planner_showReport:"/auto-planner-service/v1/auto/planner/schedule/report/showReport",
	//查看失败任务详细信息
	auto_planner_searchFailDetail:"/auto-planner-service/v1/auto/planner/schedule/report/searchFailDetail",
	//修改时查询原子任务
	auto_planner_step_job_queryAtomicTask:"/auto-planner-service/v1/auto/planner/schedule/step/job/queryAtomicTask",

}
jQuery.extend(compWsg, plannerWsg);

/**
 * 操作系统安装
 */
var systemInstallWsg = {
	auto_system_install_findResoutces:"/auto-system-install-service/v1/auto/system/install/findResource",
	auto_system_install_save:"/auto-system-install-service/v1/auto/system/install/save",
	auto_system_install_searchWithPage:"/auto-system-install-service/v1/auto/system/install/searchWithPage",
	auto_system_install_delete:"/auto-system-install-service/v1/auto/system/install/delete",
	auto_system_install_execPreview:"/auto-system-install-service/v1/auto/system/install/execPreview",
	auto_system_install_import:"/auto-system-install-service/v1/auto/system/install/import",
	auto_system_install_downloadTemplet:"/auto-system-install-service/v1/auto/system/install/downloadTemplet",
	auto_system_install_searchOne:"/auto-system-install-service/v1/auto/system/install/searchOne",
	auto_system_install_report:"/auto-system-install-service/v1/auto/system/install/report",
	
	auto_system_install_templet_select:"/auto-system-install-service/v1/auto/system/install/templet/select",
	auto_system_install_templet_selectDic:"/auto-system-install-service/v1/auto/system/install/templet/selectDic",

}
jQuery.extend(compWsg, systemInstallWsg);


var sqlwsg = {
    sql_manager_search:'/sql-service/v1/comp/sql/list',
    sql_manager_loadRelationDB:'/sql-service/v1/comp/sql/loadRelationDB',
    sql_manager_loadRelationUsers:'/sql-service/v1/comp/sql/loadRelationUsers',
    sql_manager_addSQLSetting:'/sql-service/v1/comp/sql/addSQLSetting',
    sql_manager_loadAccount : '/sql-service/v1/comp/sql/loadAccount',
    sql_add_loadDBList:'/sql-service/v1/comp/sql/loadDBList',
    sql_edit_loadSettingInfo:'/sql-service/v1/comp/sql/loadSettingInfo',
    sql_delete:'/sql-service/v1/comp/sql/delete',
    sql_copy: '/sql-service/v1/comp/sql/copy',
    sql_var_list : '/sql-service/v1/comp/sql/var/list',
    sql_var_add : '/sql-service/v1/comp/sql/var/add',
    sql_var_delete : '/sql-service/v1/comp/sql/var/delete',
    sql_exec_list : '/sql-service/v1/comp/sql/exec/list',
    sql_exec_loadRelationDB:'/sql-service/v1/comp/sql/exec/loadRelationDB',
    sql_exec_loadRelationUsers:'/sql-service/v1/comp/sql/exec/loadRelationUsers',
    sql_exec_loadSqlParam : '/sql-service/v1/comp/sql/exec/loadSqlParam',
    sql_exec_selectById : '/sql-service/v1/comp/sql/exec/selectById',
    sql_exec_addCustomSql :'/sql-service/v1/comp/sql/exec/addCustomSql',
    sql_exec_execute : '/sql-service/v1/comp/sql/exec/execute',
    sql_result_export : "/sql-service/v1/comp/sql/result/export",
    sql_result_valid : "/sql-service/v1/comp/sql/result/valid"
}
jQuery.extend(compWsg,sqlwsg);

var scene = {
    //场景类型查询
    scene_type_search:"/scene-service/v1/comp/scene/sceneType/queryList",
    //场景类型参数查询
    scene_type_params_search:"/scene-service/v1/comp/scene/sceneType/queryParamsList",
    //场景查询
    scene_search:"/scene-service/v1/comp/scene/querySceneList",
    //添加场景
    scene_insert:"/scene-service/v1/comp/scene/add",
    //Excel参数上传
    scene_param_upload: "/scene-service/v1/comp/scene/param/upload",
    //下载场景相关模板
    scene_param_templete_download : "/scene-service/v1/comp/scene/param/templete/download",
    //执行场景任务
    scene_execute:"/scene-service/v1/comp/scene/execute",
    cau_execute:"/scene-service/v1/comp/cau/execute",
    //执行任务前预览参数
    scene_preview:"/scene-service/v1/comp/scene/preview",
    cau_preview : "/scene-service/v1/comp/cau/preview",
    //查看最后一次执行日志
    scene_execute_last_log:"/scene-service/v1/comp/scene/last/log",
    cau_execute_last_log:"/scene-service/v1/comp/cau/last/log"
}
jQuery.extend(compWsg,scene);