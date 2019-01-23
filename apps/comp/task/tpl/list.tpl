{{each entity}} 
<tr class="bindCheckBox">
    <td>
        <label class="replace-checkbox" name="cbox">
			<input type="checkbox" class="taskId" name="id" createUser="{{$value.createUser}}" status="{{$value.status}}" value="{{$value.id}}"/>
			<span></span>
		</label>
    </td>
    <td>{{$value.name}}</td>
     <td>{{$value.crontab}}</td>
     <td>
     	{{if $value.status == "NO"}}未生效
		{{else if $value.status == "YES"}}<font color="green">已生效</font>
		{{else if $value.status == "CLOSE"}}<font color="red">已关闭</font>
		{{/if}}
	</td>
    <td>{{$value.createTime | dateFormat:'yyyy-MM-dd hh:mm:ss'}}</td>
    <td>{{$value.createUser}}</td>
    <td>{{if $value.createUser == $value.account}}
    		<a href="javascript:void(0)" class="log_set_authority h-underline" value="{{$value.id}}">设置查看权限</a>
    	{{/if}}
    </td>
</tr>
{{/each}} 



