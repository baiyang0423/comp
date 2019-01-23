{{if entity.length==0}}
	<tr rowspan="30">
		<td colspan="12">
			<div class="tc pd-20">
				<p class="pdt-50 pdb-50 fs-30 color-9">
					<img src="/nresource/pub-ui/images/alltable-nullimg1.png" alt="" />
					<span class="mgl-20">暂无查询结果</span>
				</p>
			</div>
		</td>
	</tr> 
{{else if entity.length>0}}
{{each entity}}
<tr>							 	
	<td>
		<label class="js-checkbox replace-checkbox">
            <input type="checkbox" name="configureId" value="{{$value.id}}">
            <span></span>
        </label>
	</td>
	<td>{{$value.name}}</td>
	<td>{{$value.code}}</td>
	<td>{{$value.defaultValues}}</td>
	<td>{{$value.shell}}</td>
	{{if $value.hasSudo == 'NO'}}
    <td>否</td>
    {{else}}
    <td>是</td>
    {{/if}}
	{{if $value.types == 'BASE'}}
    <td>基线加固</td>
    {{else}}
    <td>巡检</td>
    {{/if}}
	<td>{{$value.remarks}}</td>
</tr>
{{/each}} 
{{/if}} 