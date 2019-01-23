{{if entity.length==0}}
	<tr rowspan="30">
		<td colspan="12">
			<div class="tc pd-20">
				<p class="pdt-50 pdb-50 fs-30 color-9">
					<img src="/nresource/comp/pub-ui/images/alltable-nullimg1.png" alt="" />
					<span class="mgl-20">暂无查询结果</span>
				</p>
			</div>
		</td>
	</tr> 
{{else if entity.length>0}}
{{each entity}}
<tr>							 	
	<td>{{$value.executionDate}}</td>
	<td>{{$value.startDate}}</td>
	<td>{{$value.endDate}}</td>
	<td>{{$value.duration}}</td>
	<td>{{$value.tryNumber}}</td>
	<td>{{$value.state}}</td>
</tr>
{{/each}} 
{{/if}} 