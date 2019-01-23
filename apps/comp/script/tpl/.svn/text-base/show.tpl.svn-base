{{entity}}
<div class="block bd-none pdt-0 mgt-0">
  <div class="block-head">
     <span class="tit">脚本详情</span>
  </div>
  <form action="#" id="rm_script_show_form">
  <div class="block-body">
     <div class="mgt-10 clearfix pdl-10">
         <div class="layout-container fl" style="width: 50%">
            <input name="id" type="hidden" value="{{entity.id}}">
            <div class="col-tit">
                <span class="need inline-block v-m">*</span>
                脚本名称：
            </div>
            <div class="col-main pdt-10">
                <input required class="ipt-m" type="text" value="{{entity.name}}" name="name" id="script_name_show" style="width:300px">
            </div>
        </div>
        <div class="layout-container fl" style="width: 50%">
            <div class="col-tit">
                <span class="need inline-block v-m">*</span>
                类型：
            </div>
            <div class="col-main pdt-10">
                <select required class="form-select-m" id="script_type_show" style="width: 300px">
                	<option value="">请选择</option>
					{{each entity.typeList}} 
						<option value="{{$value.id}}" {{if $value.id == entity.parentId}}selected="selected"{{/if}}>{{$value.name}}</option>
					{{/each}} 
                </select>                                    
            </div>
        </div>
    </div>
    <div class="mgt-m clearfix pdl-10">
        <div class="layout-container fl" style="width: 50%">
            <div class="col-tit">
                <span class="need inline-block v-m">*</span>
                细分类型：
            </div>
            <div class="col-main pdt-10">
                <select required class="form-select-m" name="typeId" id="script_child_type_show" style="width: 300px">
                    <option value="">请选择</option>
					{{each entity.childTypeList}} 
						<option value="{{$value.id}}" {{if $value.id == entity.typeId}}selected="selected"{{/if}}>{{$value.name}}</option>
					{{/each}} 
                </select>
            </div>
        </div>
    </div>
    <div class="mgt-m clearfix pdl-10">
        <div class="layout-container fl" style="width: 100%">
            <div class="col-tit">
                <span class="need inline-block v-m">*</span>
                脚本内容：
            </div>
            <div class="col-main clearfix pdt-10">
                <textarea required class="textarea fl pd-10" value="" name="content" id="script_content_show" style="width: 90%;">{{entity.content}}</textarea>
            </div>
        </div>
    </div>
    <div class="mgt-m clearfix pdl-10">
        <div class="layout-container fl" style="width: 50%">
            <div class="col-tit">
                备注：
            </div>
            <div class="col-main pdt-10">
                <input class="ipt-m" type="text" name="remark" value="{{entity.remark}}" id="script_remark_show" style="width:300px">
            </div>
        </div>
        <div class="layout-container fl" style="width: 50%">
            <div class="col-tit">
                关联脚本：
            </div>
            <div class="col-main pdt-10 clearfix">
                <input class="ipt-m js_self fl" type="text" value="{{entity.scriptLink}}" id="script_show_link" style="width:80%">
            </div>
            <div class="none">
                <input name="linkScriptId" type="text" value="{{entity.scriptLinkIds}}" id="script_show_link_ids">
            </div>
        </div>
    </div>
    <div class="mgt-m clearfix pdl-10">
        <div class="layout-container fl" style="width: 100%">
            <div class="col-tit">
            <span class="need inline-block v-m">*</span>
                脚本组：
            </div>
            <div class="col-main pdt-10">
                <input required class="ipt-m" type="text" value="{{entity.group}}" name="filename" id="script_show_group" style="width:300px">
            </div>
            <div class="none">
                <input type="text" name="groupId" value="{{entity.groupId}}" id="script_show_group_id" >
            </div>
        </div>
    </div>
  </form>
</div>