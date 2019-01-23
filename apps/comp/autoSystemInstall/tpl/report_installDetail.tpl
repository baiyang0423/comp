{{each OS_INSTALL_DETAIL}}
<tr>							 	
	<td>{{$value.ip}}</td>
	<td>{{$value.versionName}}</td>
	<td>{{$value.installResult}}</td>
	<td>{{$value.errorContent}}</td>
</tr>
{{/each}} 
