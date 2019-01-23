{{if entity.length==0}}
{{else if entity.length>0}}
{{each entity}}
<tr>							 	
	<td class="none">
		<label class="js-checkbox replace-checkbox">
            <input type="checkbox" class="intput_checkbox" name="atomicTask" value="{{$value.id}}">
            <span></span>
        </label>
	</td>
	<td>{{$value.title}}</td>
	<td>{{$value.remarks}}</td>
	<td>{{$value.hostTotalCount}}</td>
	<td>{{$value.hostSuccessCount}}</td>
	<td>{{$value.hostFailCount}}</td>
	{{if $value.execStatus == 'NONE'}}
    <td><font color="red">未处理</font></td>
    {{else}}
    <td><font color="green">已执行</font></td>
    {{/if}}
	<!--<td>{{$value.auditUser}}</td>
	{{if $value.auditStatus == 'NO'}}
    <td><font color="red">未通过</font></td>
    {{else}}
    <td><font color="green">已通过</font></td>
    {{/if}}-->
	<td>{{$value.createUser}}</td>
	<td><a href="#none" class="h-underline operate del host_delete">删除</a></td>	
</tr>
{{/each}} 
{{/if}}
