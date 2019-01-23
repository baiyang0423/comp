{{each entity}} 
	<tr class="bindCheckBox">
	    <td>
	        <label class="replace-checkbox">
	            <input type="checkbox" name="cb_script" value="{{$value.id}}" valName="{{$value.name}}">
	            <span></span>
	        </label>
	    </td>
	    <td>{{$value.name}}</td>
	   	<td title="{{$value.content}}"><span class="mw mw-100 of-title tl pdl-10" >{{$value.content}}</span></td>
	   	<td>{{$value.type}}</td>
	    <td>{{$value.childType}}</td>
	    <td>{{$value.group}}</td>
	    <td>{{$value.userName}}</td>
	    <td>{{$value.time}}</td>
	</tr>
{{/each}} 