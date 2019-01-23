<!--主体内容-->
<input id="execute_input_task_id" name="id" type="hidden" value="{{id}}" />
<div class="min-width1000 main-padd">
	<div class="pdl-10 pdr-10 pdt-10 pdb-20">
		<div class="bdt-box approval-top bg-bottom fs-14 clear pd-20 animation-top">
			<div class="col-12 pdl-20">
				<table>
        			<tr class="tr-title">
        				<td colspan="2">任务名称：<span>{{name}}</span></td>
        				<td></td>
        			</tr>
        			<tr>
        				<td>执行策略:{{crontab}}</td>
        				<td>执行脚本:{{scriptContent}}</td>
        				<td></td>
        			</tr>
        			
        		</table>
			</div>
   		</div>
		<div class="bdt-box mgt-10 animation-left bgc-white">
			<table class="blue-table">
				<tr>
					<td class="fs-16 pd-15 text-indent"></td>
				</tr>
				<tr>
					<td>
						<div class="approval-table pd-10 fs-14">
				       		<table>
				       			<tr>
				       				<th class="bdl-0 w-50">执行主机</th>
				       			</tr>
				       			{{each hosts}}
					       			<tr>
					       				<td>{{$value.ip}}:{{$value.username}}</td>
					       			</tr>
				       			{{/each}}
				       			
				       		</table>	
			       		</div>
						<div class="approval-table pd-10 fs-14">
				       		<table>
				       			<tr>
				       				<th class="bdl-0 w-50">最近十次执行时间</th>
				       			</tr>
				       			{{each cornTrigger}}
					       			<tr>
					       				<td>{{$value}}</td>
					       			</tr>
				       			{{/each}}
				       		</table>	
			       		</div>
			       		
					</td>
				</tr>
			</table>
		</div>
		
	</div>
</div>