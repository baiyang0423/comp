{{each entity}}     
<tr class="bindCheckBox">
	<td>
		<label class="checkbox js-checkbox">
			<input type="checkbox" name="cb_scene" value="{{$value.id}}"> 
			<span class="checkbox-bg" value="{{$value.id}}"></span>
		</label>
	</td>
	<td>{{$value.typeName}}</td>
	<td>{{$value.name}}</td>
	<td>{{$value.remark}}</td>
	<td>{{$value.taskNum}}</td>
	{{if $value.lastExecuteTime == ''}}
		<td>-</td>
		{{else}}
		<td>{{$value.lastExecuteTime}}</td>
	{{/if}}
	<td>{{$value.createTime}}</td>
	<td>{{$value.createUsers}}</td>
	<td>{{$value.executeNum}}</td>
	<td>
		{{if $value.executeNum == 0}}
			<button onclick="javascript:void(0);" data-id="{{$value.id}}" name="execute_btn" style="color: #fd8e5f;border: 1px solid #fd8e5f;background-color: #fff;cursor: pointer;" >执行</button>
		{{/if}}
	</td>
</tr>
{{/each}} 