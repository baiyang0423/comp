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
            <input type="checkbox" name="instanllId" value="{{$value.id}}" execStatus="{{$value.execStatus}}" >
            <span></span>
        </label>
	</td>
	<td>{{$value.content}}</td>
	<td><font color="lightslategrey" size="4">{{$value.totalCount}}</font>&emsp;
		<font color="green" size="4">{{$value.successCount}}</font>&emsp;
		<font color="red" size="4">{{$value.failCount}}</font>
	</td>
	<td>{{$value.execTime}}</td>
	{{if $value.execStatus == 'NONE'}}
    <td>未处理</td>
    {{else if $value.execStatus == 'DOING'}}
    <td>安装中</td>
    {{else if $value.execStatus == 'DONE'}}
    <td>已完成</td>
    {{/if}}
	<td>{{$value.createUser}}</td>
	<td>{{$value.createTime}}</td>
</tr>
{{/each}} 
{{/if}} 