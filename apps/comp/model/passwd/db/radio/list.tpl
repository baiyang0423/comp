{{each entity}} 
<tr class="bindCheckBox">
    <td>
        <label class="replace-checkbox" name="cbox">
            <input type="checkbox"  
            	data-ip="{{$value.ip}}" 
            	data-dbname="{{$value.dbName}}" 
            	data-dbpasswd="{{$value.password}}" 
            	data-username="{{$value.username}}"
            	name="select_pwd_db_radio_input_radio" 
            	value="{{$value.id}}">
            <span></span>
        </label>
    </td>
    <td>{{$value.ip}}</td>
    <td>{{$value.dbName}}</td>
    <td>{{$value.password}}</td>
    <td>{{$value.username}}</td>
</tr>
{{/each}} 