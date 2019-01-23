<div class="mgb-20 clear">
    <div class="col-12 select-ty">
		 <span>场景名称：</span>
			<input class="ipt-m" id="sceneNameInExc" type="text" value="{{sceneName}}" style="width:600px" readonly="readonly">
			<input type="hidden" id="sceneIdInExc" value="{{sceneId}}" />
	</div>
</div>
<div class="mgb-20 clear">
    <div class="col-12 select-ty">
		 <span>脚本名称：</span>
		 <input class="ipt-m" id="scriptNameInExc" type="text" value="{{scriptName}}" style="width:600px" readonly="readonly">
	</div>
</div>
<div class="mgb-20 clear">
    <div class="col-12 select-ty">
		 <span>脚本路径：</span>
		 <input class="ipt-m" id="scriptPathInExc" type="text" value="{{scriptPath}}" style="width:600px" readonly="readonly">
	</div>
</div>

<div class="mgb-20 clear">
    <div class="col-12 select-ty">
		 <span>脚本路径：</span>
		 <input class="ipt-m" id="scriptPathInExc" type="text" value="{{scriptPath}}" style="width:600px" readonly="readonly">
	</div>
</div>

<div class="pd-10 clear animation-right">
	<div class="layout-container fl" style="width: 100%">
		<p class="fs-20 pdl-10">日志信息：</p>
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
			<span style="color: green;">执行数据数量:{{if logs==null}}0{{else}}{{logs.length}}{{/if}}个</span>
		</div>
		<div class="col-main pdt-10">
		<span>	</span>
		</div>
	</div>
</div>
<div class="mgt-10 clearfix pdl-10">
	<div class="layout-container fl" style="width: 100%">
		<p class="fs-20 pdl-10">日志信息：</p>
		<div class="approval-table fs-14">
			<table class="ued-table stripe-table-noborder">
				<colgroup>
					<col width="5%">
					<col width="5%">
					<col width="60%">
					<col width="10%">
					<col width="10%">
					<col width="10%">
				</colgroup>
				<thead>
					<tr>
						<th>序号</th>
						<th>执行结果</th>
						<th>执行日志</th>
						<th>执行人</th>
						<th>执行时间</th>
						<th>执行客户端</th>
					</tr>
				</thead>
				<tbody>
					{{each logs as trs index}}  
						<tr>
							<td>{{index+1}}</td>
							{{if trs.status == 'success'}}
								<td style="color: green;">成功</td>
								{{else}}
								<td style="color: red;">失败</td>
							{{/if}}
							<td>{{trs.content}}</td>
							<td>{{trs.excuteUser}}</td>
							<td>{{trs.excuteTime}}</td>
							<td>{{trs.clientIp}}</td>
						</tr>
					{{/each}}
				</tbody>
			</table>
		</div>
	</div>
</div>