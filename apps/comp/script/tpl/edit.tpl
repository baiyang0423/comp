{{entity}}
<form action="#none" method="post" id="rm_script_edit_form">
	<div class="configure fs-14 bgc-white pd-20 dialog-overflow">
		<input id="add_input_task_id" name="scriptId" type="hidden" value="{{entity.id}}" />
		<input type="hidden" name="groupId" value="{{entity.groupId}}" id="script_edit_group_id" >
		<input type="file" hidden="hidden" multiple="multiple" name="add_button" id="file_select">
		<input type="hidden" name="filename" value="{{entity.filename}}" id="script_edit_fileName">
		<input name="linkScriptId" type="hidden" value="" id="script_add_link_ids">
		<div class="mgb-20 clear">
			<div class="col-12">
				<span>脚本名称：</span>
				<input name="name" id="script_name_edit" required type="text" value="{{entity.name}}" style="width: 50%" />
			</div>
		</div>
		<div class="mgb-20 clear">
			<div class="col-12">
				<span>脚本主类型：</span>
				<select required id="script_type_edit" style="width: 50%" class="icon-select">
					<option value="">请选择</option>
					{{each entity.typeList}} 
						<option value="{{$value.id}}" {{if $value.id == entity.parentId}}selected="selected"{{/if}}>{{$value.name}}</option>
					{{/each}} 
				</select>
			</div>
		</div>
		<div class="mgb-20 clear">
			<div class="col-12">
				<span>脚本子类型：</span>
				<select required name="typeId" id="script_child_type_edit" style="width: 50%" class="icon-select">
					 <option value="">请选择</option>
					{{each entity.childTypeList}} 
						<option value="{{$value.id}}" {{if $value.id == entity.typeId}}selected="selected"{{/if}}>{{$value.name}}</option>
					{{/each}} 
				</select>
			</div>
		</div>
		<div class="mgb-20 clear">
			<div class="col-12">
				<span>脚本类组：</span>
				<input required style="width: 50%" type="text" value="{{entity.group}}" name="scriptGroupName"  id="script_edit_group" >
				<a href="javascript:void(0);" id="script_edit_group_btn" target="_blank" class="color-lightblue config-apply">选择</a>
			</div>
		</div>
		
		<div class="clear mgb-20">
			<div class="col-12">
				<span>脚本内容：</span>
				<textarea name="content" id="script_content_add" style="width: 80%;height: 100px;" class="pd-10">{{entity.content}}</textarea>
				<a href="javascript:void(0);" id="btn_script_sel" target="_blank" class="color-lightblue config-apply">选择</a>
			</div>
		</div>

		<div class="mgb-20 clear">
			<div class="col-12">
				<span>脚本备注：</span>
				<textarea name="remark" id="script_remark_edit" style="width: 80%;height: 100px;" class="pd-10">{{entity.remark}}</textarea>
			</div>
		</div>
	</div>
</form>