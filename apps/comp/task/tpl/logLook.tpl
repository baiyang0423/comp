<!--主体内容-->
<div class="min-width1000 main-padd">
	<div class="pdl-10 pdr-10 pdt-10 pdb-20">
		<div class="bdt-box approval-top bg-bottom fs-14 clear pd-20 animation-top">
			<div class="col-12 pdl-20">
				<table>
        			<tr class="tr-title">
        				<td colspan="2">任务名称：<span>{{name}}</span></td>
        				<td>最近执行时间：{{lastExceTime}}</td>
        				<td>执行耗时：{{totalTime/1000}}s</td>
        			</tr>
        			<tr>
        				<td>执行脚本名称:{{scriptName}}</td>
        			</tr>
        			<tr>
        				<td colspan="4">执行脚本内容:{{scriptContent}}</td>
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
			       			<table class="type-princ">
	            				<thead>
		            				<tr class="type-tr">
	        							<th class="bdl-0 w-50"></th>
	        							<th>主机IP</th>
	        							<th>主机用户</th>
		            					<th>执行开始时间</th>
		            					<th>执行结束时间</th>
		            				</tr>
	            				</thead>
	            				<tbody>
	            					{{each taskLogs}}
		            					<tr>
			            					<td class="td-princ"><span class="block cursor-p">></span></td>
			            					<td>{{$value.hostIp}}</td>
			            					<td>{{$value.username}}</td>
			            					<td>{{$value.startTime}}</td>
			            					<td>{{$value.endTime}}</td>
			            				</tr>
			            				<tr class="princ-hide hide">
			            					<td colspan="5" class="pd-10">
			            						<table>
			            							{{$value.content}}
			            						</table>
			            					</td>
			            				</tr>
		            				{{/each}}
	            				</tbody>
	            			</table>
			       		</div>
			       		
					</td>
				</tr>
			</table>
		</div>
		
	</div>
</div>