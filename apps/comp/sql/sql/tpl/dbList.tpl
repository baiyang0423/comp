 {{each entity}}
<tr class="label-radio rule-label" name='select-db-tr' data-dbtype="{{$value.dbtype}}" data-instanceid="{{$value.instanceId}}" data-id='{{$value.pwId}}' data-db='{{$value.dbName}}' data-instance='{{$value.instanceName}}' data-user='{{$value.username}}'>
	<td>
		<label>
	        <input type="radio" name="input-radio-db" data-dbtype="{{$value.dbtype}}" data-instanceid="{{$value.instanceId}}" data-id='{{$value.pwId}}' value="{{$value.pwId}}" data-db='{{$value.dbName}}' data-instance='{{$value.instanceName}}' data-user='{{$value.username}}'>
	    </label>
	</td>
	<td>{{$value.dbName}}</td>
	<td>{{$value.instanceName}}</td>
	<td>{{$value.username}}</td>
</tr>
{{/each}}