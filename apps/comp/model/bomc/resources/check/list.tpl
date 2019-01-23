{{each entity}} 
<tr class="bindCheckBox">
    <td>
        <label class="checkbox js-checkbox">
            <input type="checkbox" name="select_bomc_resource_input_check" 
            	ip="{{$value.ipAddr}}" unit_id="{{$value.unitId}}" 
            	manufacturer="{{$value.manufacturer}}" value="{{$value.id}}">
           <span class="checkbox-bg"></span>
        </label>
    </td>
    <td>{{$value.manufacturer}}</td>
    <td>{{$value.ipAddr}}</td>
</tr>
{{/each}} 