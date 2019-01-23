{{each entity}}
<tr class="bindCheckBox">
	<td class="pd-20-0">
		<label class="replace-checkbox">
	        <input type="checkbox" name="items-sql" data-pwdid="{{$value.pwdid}}" data-instanceId="{{$value.instanceId}}" data-user="{{$value.createUser}}" data-auth="{{$value.limit}}" data-name="{{$value.name}}"	data-type="{{$value.dbtype}}" value="{{$value.id}}">
	        <span class="checkbox-bg"></span>
	    </label>
	</td>
	<td>{{$value.name}}</td>
	<td title="{{$value.content}}">{{$value.content}}</td>
	<td>{{$value.db}}</td>
	<td>{{$value.dbuser}}</td>
	<td>{{$value.nums}}</td>
	<td>{{$value.createTime}}</td>
	<td>{{$value.createUser}}</td>
</tr>
{{/each}}
