{{each entity}}
<tr>							 	
	<td class="none">{{$value.id}}</td>
	<td>{{$value.ip}}</td>
	<td>{{$value.sequence}}</td>
	<td>{{$value.mac}}</td>
	<td>{{$value.raidNums}}</td>
	<td>{{$value.dbTime}}</td>
	<td>
		<a href="#none" class="h-underline operate del host_delete">删除</a>
	</td>
</tr>
{{/each}} 
