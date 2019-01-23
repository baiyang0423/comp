{{each entity}} 
<tr class="label-radio rule-label">
    <td>
        <label class="radiobox js-radiobox">
            <input type="radio" data-ip="{{$value.ip}}" data-hostname="{{$value.hostname}}" 
            	data-username="{{$value.username}}" data-hostId="{{$value.hostId}}"
            	name="select_pwd_host_radio_input_radio" value="{{$value.id}}">
           <span class="radiobox-bg"></span>
        </label>
    </td>
    <td>{{$value.ip}}</td>
    <td>{{$value.hostname}}</td>
    <td>{{$value.username}}</td>
</tr>
{{/each}} 