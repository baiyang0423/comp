{{each entity}} 
	<tr class="bindCheckBox">
	    <td>
	        <label class="replace-checkbox" name="cbox">
	            <input type="checkbox"  name="select_script_input_radio" 
	            	data-name="{{$value.name}}" 
	            	data-type="{{$value.typeId}}"
	            	value="{{$value.id}}">
	            <span></span>
	        </label>
	    </td>
	    <td>{{$value.name}}</td>
	    <td>{{$value.typeId}}</td>
	    <td title="{{$value.content}}"><span class="mw mw-100 of-title tl pdl-10" >{{$value.content}}</span></td>
	</tr>
{{/each}}