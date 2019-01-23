{{if entity.length==0}}
{{else if entity.length>0}}
{{each entity}}
<tr>							 	
	<td class="none">
		<input name="atomicTask" value="{{$value.id}}">
	</td>
	<td>{{$value.title}}</td>
	<td>{{$value.remarks}}</td>
	<td>{{$value.hostTotalCount}}</td>
	<td>{{$value.hostSuccessCount}}</td>
	<td>{{$value.hostFailCount}}</td>
    <td><font color="red">未处理</font></td>
	<td>{{$value.createUser}}</td>
	<td><a href="#none" class="h-underline operate del host_delete">删除</a></td>	
</tr>
{{/each}} 
{{/if}}
