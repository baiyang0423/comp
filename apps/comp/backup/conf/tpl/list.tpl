{{each entity}}
<tr class='bindCheckBox'>
	<td>
		<label class="replace-checkbox" name="cbox">
	        <input type="checkbox" name="items" value="{{$value.id}}">
	        <span class="checkbox-bg"></span>
	    </label>
	</td>
	<td>{{$value.title}}</td>
	<td>{{$value.softName}}</td>
	<td>{{$value.remarks}}</td>
	<td>{{$value.execNums}}</td>
	<td>{{$value.execTime}}</td>
	<td>{{$value.createTime}}</td>
	<td>{{$value.createUser}}</td>
</tr>
{{/each}}