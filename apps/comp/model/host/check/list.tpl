{{each entity}} 
<tr class="bindCheckBox">
    <td>
        <label class="replace-checkbox">
			<input type="checkbox" data-ip="{{$value.ip}}" data-hostname="{{$value.hostname}}" 
            	data-username="{{$value.username}}" name="select_pwd_host_check_input_radio" 
            	value="{{$value.id}}"/>
			<span></span>
		</label>
    </td>
    <td>{{$value.ip}}</td>
    <td>{{$value.hostname}}</td>
    <td>{{$value.username}}</td>
</tr>
{{/each}} 