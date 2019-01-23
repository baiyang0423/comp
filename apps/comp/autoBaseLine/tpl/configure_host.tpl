
{{each entity}}
<tr>							 	
	<td class="none">
		<label class="replace-checkbox">
            <input type="checkbox" name="configure_pwdId" value="{{$value.pwdId}}">
            <span></span>
        </label>
	</td>
	<td>{{$value.ip}}</td>
	<td>{{$value.userName}}</td>
	{{if $value.status != 'normal'}}
    <td><font color="red">失效</font></td>
    {{else}}
    <td><font color="green">有效</font></td>
    {{/if}}
    <td><input type="text" class="bd-1 lh-30 tc" style="width: 50%;"></td>
	<td><input type="text" class="bd-1 lh-30 tc" style="width: 50%;"></td>
	<td>
		<a href="#none" class="h-underline operate del host_delete" pwdId="{{$value.pwdId}}">删除</a>
		<input type="hidden" name="{{$value.pwdId}}" />
	</td>
</tr>
{{/each}} 
