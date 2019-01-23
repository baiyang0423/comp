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
            <input type="checkbox" name="baseId" value="{{$value.id}}" hostTotalCount="{{$value.hostTotalCount}}">
            <span></span>
        </label>
	</td>
	<td>{{$value.title}}</td>
	<td>{{$value.remarks}}</td>
	<td>{{$value.hostTotalCount}}</td>
	<td>{{$value.hostSuccessCount}}</td>
	<td>{{$value.hostFailCount}}</td>
	{{if $value.execTime == null}}
    <td>{{$value.execTime}}</td>
    {{else}}
    <td>{{$value.execTime}}</td>
    {{/if}}
	{{if $value.execStatus == 'NONE'}}
    <td><font color="red">未处理</font></td>
    {{else}}
    <td><font color="green">已执行</font></td>
    {{/if}}
	<!--<td>{{$value.auditUser}}</td>
	{{if $value.auditStatus == 'NO'}}
    <td><font color="red">未通过</font></td>
    {{else}}
    <td><font color="green">已通过</font></td>
    {{/if}}-->
	<td>{{$value.createUser}}</td>
</tr>
{{/each}} 
{{/if}} 