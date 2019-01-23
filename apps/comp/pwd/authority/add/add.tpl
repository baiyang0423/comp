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
	<td>
		<label class="js-checkbox replace-checkbox">
            <input type="checkbox" name="authorityId" value="{{$value.authId}}" />
            <span></span>
        </label>
	</td>
	<td>{{$value.ip}}</td>
	<td>{{$value.hostname}}</td>
</tr>
{{/each}} 
{{/if}} 