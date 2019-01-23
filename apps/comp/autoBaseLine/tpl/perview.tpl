{{each hosts}}
<div class="pd-10 clear">
	<div class="alltable-link clear">
		<ul class="fl">
			<li>
				<a href="#" class="">{{$value.ip}}</a>
			</li>
		</ul>
	</div>
	<div class="approval-table fs-14">
		<table id="theTable">
			<tr>
				<th>指标项</th>
				<th>是否加固</th>
			</tr>
            <tbody>
            	{{each $value.items}}
            	<tr>
            		<td>{{$value.kpiName}}</td>
            		{{if $value.isEffective == 'YES'}}
				    <td><font color="green">是</font></td>
				    {{else}}
				    <td><font color="red">否</font></td>
				    {{/if}}
            	</tr>
            	{{/each}}
            </tbody>
        </table>
	</div>		
</div>	
{{/each}} 
