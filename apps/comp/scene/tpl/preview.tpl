<div class="mgb-20 clear">
    <div class="col-12 select-ty">
            <span>场景名称：</span>
            <input class="ipt-m" id="sceneNameInExc" type="text" value="{{sceneName}}" style="width:50%">
            <input type="hidden" id="sceneIdInExc" value="{{sceneId}}" />
    </div>
</div>
<div class="mgb-20 clear">
    <div class="col-12 select-ty">
            <span>脚本名称：</span>
            <input class="ipt-m" id="scriptNameInExc" type="text" value="{{scriptName}}" style="width:50%">
    </div>
</div>
<div class="mgb-20 clear">
    <div class="col-12 select-ty">
            <span>脚本路径：</span>
            <input class="ipt-m" id="scriptPathInExc" type="text" value="{{scriptPath}}" style="width:50%">
    </div>
</div>
<div class="pd-10 clear animation-right">
	<div class="layout-container fl" style="width: 100%">
		<div class="col-tit">
			关联主机：
		</div>
		<div class="approval-table fs-14">
			<table class="ued-table stripe-table-noborder">
				<colgroup>
					<col width="50%">
					<col width="50%">
				</colgroup>
				<thead>
					<tr>
						<th>脚本所在主机IP</th>
						<th>脚本主机登录用户</th>
					</tr>
				</thead>
				<tbody>
					{{each hosts as vas}}  
						<tr>
							<td>{{vas.ip}}</td>
							<td>{{vas.username}}</td>
						</tr>
					{{/each}}
				</tbody>
			</table>
		</div>
	</div>
</div>
<div class="pd-10 clear animation-right">
	<div class="layout-container fl" style="width: 100%">
		<div class="col-tit">
			<span style="color: green;">执行数据数量:{{tasks.length}}个</span>
		</div>
		<div class="col-main pdt-10"></div>
	</div>
</div>
<div class="pd-10 clear animation-right">
	<div class="layout-container fl" style="width: 100%">
		<div class="col-tit">
			组成指令集合：
		</div>
		<div class="approval-table fs-14">
			<table class="ued-table stripe-table-noborder">
				<colgroup>
					<col width="10%">
					<col width="90%">
				</colgroup>
				<thead>
					<tr>
						<th>序号</th>
						<th>执行指令</th>
					</tr>
				</thead>
				<tbody>
					{{each tasks as trs index}}  
						<tr>
							<td>{{index+1}}</td>
							<td>{{trs.shell}}</td>
						</tr>
					{{/each}}
				</tbody>
			</table>
		</div>
	</div>
</div>