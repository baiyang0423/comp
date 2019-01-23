{{each entity}} 
<tr class="bindCheckBox">
    <td>
        <label class="replace-checkbox" name="cbox">
            <input type="checkbox" class="user_id" name="userId" isAuthority="{{$value.isAuthority}}" userId="{{$value.account}}" value="{{$value.account}}">
            <span></span>
        </label>
    </td>
    <td>{{$value.account}}</td>
    <td>{{$value.name}}</td>
    {{if $value.isAuthority == 1}}
    	<td><a href="javascript:void(0);" target="_blank" userId="{{$value.account}}" class="h-underline operate del removeAuth">删除赋权</a></td>
    {{else}}
    	<td>未赋权</td>
    {{/if}}
</tr>
{{/each}} 


