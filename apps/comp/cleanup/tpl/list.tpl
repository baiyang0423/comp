{{each entity}}
<tr class="bindCheckBox">
	<td>
		<label class="replace-checkbox" name="cbox">
	        <input type="checkbox" name="items-cleanup" value="{{$value.id}}">
	        <span class="checkbox-bg"></span>
	    </label>
	</td>
	<td>{{$value.directoryName}}</td>
	<td>{{$value.directoryPath}}</td>
	<td>{{$value.directoryNum}}</td>
	<td>{{$value.hostIp}}</td>
	<td>{{$value.lastAlterTime}}</td>
	<td>{{$value.alterUser}}</td>
	<td>{{$value.directorySize}}</td>
</tr>
{{/each}}
