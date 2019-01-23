{{each entity}}
<tr>
	<td class="pd-20-0">{{$value.name}}</td>
	<td class="pd-20-0">{{$value.value}}</td>
	<td class="pd-20-0 fc-org2 btn_delete" data-name="{{$value.name}}" data-id="{{$value.id}}">删除</td>
</tr>
{{/each}}
