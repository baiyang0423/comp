<div class="pd-10 clear animation-right">
<div class="approval-table fs-14">
<table>
	<colgroup>
		<col width="5%">
		{{each entity.cols}}  
			<col width="{{$value}}%">
		{{/each}}
	</colgroup>
	<thead>
		<tr>
			<th>序号</th>
			{{each entity.params}} 
				{{if $value.paramStatus == 'Y'}}
					<th>{{$value.paramName}}</th>
					{{else}}
					<th hidden>{{$value.paramName}}</th>
				{{/if}}
			{{/each}}
			<th>操作</th>
		</tr>
	</thead>
	<tbody id="tbodyList"></tbody>
</table>
</div>
</div>