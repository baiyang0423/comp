{{each entity}}
<tr>							 	
	<td class="none">{{$value.id}}</td>
	<td>{{$value.ip}}</td>
	<td>
		<select style="min-width: 240px;" class="icon-select install_templet_td">
		</select>
	</td>
	<td>
		<select style="min-width: 240px;" class="icon-select install_os_td">
		</select>
	</td>
</tr>
{{/each}} 
