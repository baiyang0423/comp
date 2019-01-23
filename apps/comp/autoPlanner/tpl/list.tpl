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
            <input type="checkbox" name="plannerId" value="{{$value.id}}" execStatus="{{$value.execStatus}}">
            <span></span>
        </label>
	</td>
	<td>{{$value.name}}</td>
	<td>{{$value.crontab}}</td>
	<td>{{$value.createUser}}</td>
	{{if $value.execStatus == null}}
    <td><font color="red">未生效</font></td>
    {{else if $value.execStatus == 'PAUSE'}}
    <td><font color="lightslategrey">已暂停</font></td>
    {{else}}
    <td><font color="green">已执行</font></td>
    <!--<td><font color="lightslategrey" size="4">{{$value.totalCount}}</font>&emsp;
		<font color="green" size="4">{{$value.seccessCount}}</font>&emsp;
		<font color="red" size="4">{{$value.failCount}}</font>
	</td>-->
    {{/if}}
	<td>{{$value.taskOwner}}</td>
	<!--{{if $value.auditStatus == 'NO'}}
    <td><font color="red">未通过</font></td>
    {{else}}
    <td><font color="green">已通过</font></td>
    {{/if}}-->
	<td>{{$value.createTime}}</td>
</tr>
{{/each}} 
{{/if}} 