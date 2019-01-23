{{each}} 
<tr id="select-{{$value.id}}">
	<td>{{$value.ip}}</td>
	<td>{{$value.username}}</td>
	<td>
		<a href="javascript:void(0);" class="operate del" name="rm-select-host" data-id="{{$value.id}}">删除</a>
		<input type="hidden" value="{{$value.id}}" name="pwdId"/>
	</td>
</tr>
{{/each}}