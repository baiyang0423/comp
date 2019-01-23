{{each entity}}
<div class="pd-10 clear ">
	<div class="rtb-title clear fs-16">
	            <span>{{$value.name}}</span>
	    </div>
	    <div class="bgc-white">
	    	<div class="approval-table fs-14">
	            <table>
	            	<colgroup>
                        <col width="25%">
                        <col width="50%">
                        <col width="25%">
                    </colgroup>
	                <tr>
	                    <th>IP</th>
	                    <th>检测结果</th>
	                    <th>修改建议</th>
	                   <!-- <th class="bdr-0 w-260">操作</th>-->
	                </tr>
	                {{each $value.hostList}}
	            	<tr>
	            		<td>{{$value.ip}}</td>
	            		<td>{{$value.kpiValues}}</td>
	            		{{if $value.status == 'NONE'}}
					    <td><font color="green">建议加固</font></td>
					    {{else}}
					    <td><font color="red">不建议加固</font></td>
					    {{/if}}
	                    <!--<td><a href="#none" class="h-underline operate del">删除</a></td>-->
	            	</tr>
	            	{{/each}}
	            </table>    
	        </div>
	    </div>
	</div>
</div>
{{/each}} 
