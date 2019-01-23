{{each entity}} 
<tr class="bindCheckRadio">
    <td>
        <label class="radiobox js-radiobox">
            <input type="radio" ip="{{$value.ip}}" name="select_host_input_radio" value="{{$value.id}}">
           <span class="radiobox-bg"></span>
        </label>
    </td>
    <td>{{$value.ip}}</td>
</tr>
{{/each}} 