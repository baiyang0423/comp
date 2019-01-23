{{each entity}}
<div class="pd-10 clear">
	<div class="alltable-link clear">
		<ul class="fl">
			<li>
				<a href="#" class="">{{$value.name}}</a>
			</li>
		</ul>
	</div>
	<div class="approval-table fs-14">
		<table id="theTable">
			<tr>
				<th>主机</th>
				<th>是否建议</th>
			</tr>
            <tbody>
            	{{each $value.hostList}}
            	<tr>
            		<td>{{$value.ip}}</td>
            		<td>{{$value.status}}</td>
            	</tr>
            	{{/each}}
            </tbody>
        </table>
	</div>		
</div>	
{{/each}} 
