<div data-index="{{entity.id}}" class="clear fs-14 alltable-form pdt-20 bdt-1">
        <input type="hidden" name="execsqlid" data-pwdid={{entity.db}} data-instanceId="{{entity.instanceId}}" data-dbtype="{{entity.dbtype}}" id="{{entity.id}}" value="{{entity.id}}"/>
         <div class="clear mgb-20">
                 <p class="vt lh-30 fl mgr-10 w-150 tr">
                     <span>&nbsp&nbsp&nbsp&nbsp</span>
                 </p>
                 <font class="col-6" style="font-style: normal;color: blue;">{{entity.dbname}}</font>
        </div
        <div class="clear mgb-20">
            <p class="vt lh-30 fl mgr-10 w-150 tr">
                <span>{{entity.name}}:</span>
            </p>
            <textarea class="col-6" style="resize: none;border-color: #ccc;line-height: 30px;height: 120px;" name="content-{{entity.id}}" id="content-{{entity.id}}">{{entity.content}}</textarea>
        </div>
    <div class="bottom-button pd-5 tc" data-index="{{entity.id}}">
            <a href="#none" class="button-blue self_select_exec" data-index="{{entity.id}}">执行</a>
            <a href="#none" class="button-green mgl-30 self_select_delete" data-index="{{entity.id}}">删除</a>
    </div>
</div>