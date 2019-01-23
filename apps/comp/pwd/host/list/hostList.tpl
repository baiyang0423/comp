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
	<td class="pd-20-0">
		<label class="js-checkbox replace-checkbox">
	        <input type="checkbox" name="items" value="{{$value.pwdId}}">
	        <span class="checkbox-bg"></span>
	    </label>
	</td>
	<td class="pd-20-0">{{$value.ip}}</td>
	<td class="pd-20-0">{{$value.hostname}}</td>
	<td class="pd-20-0 fc-org2">{{$value.username}}</td>
	<td class="pd-20-0">
		{{if $value.status=='normal'}}正常{{/if}}
		{{if $value.status=='expires'}}过期{{/if}}
		{{if $value.status=='willexpires'}}即将过期{{/if}}
		{{if $value.status=='loginfail'}}密码错误{{/if}}
		{{if $value.status=='lock'}}用户锁定{{/if}}
	</td>
	<td class="pd-20-0">{{$value.updateTime}}</td>
</tr>
{{/each}}
{{/if}}
