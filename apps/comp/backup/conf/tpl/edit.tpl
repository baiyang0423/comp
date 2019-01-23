<div class="configure fs-14 bgc-white pd-20 dialog-overflow">
        <input type="hidden" name="type" id="soft_type_conf" value="conf">
        <div class="mgb-20 clear">
            <div class="col-12 select-ty">
                <span>标题：</span>
                <input  id="soft_id" type="hidden" value="{{id}}">
                <input  id="soft_title" type="text" value="{{title}}" style="width:50%">
            </div>
        </div>

        <div class="mgb-20 clear">
            <div class="col-12 select-ty">
                <span>转件类型：</span>
                <input class="ipt-m" readonly="readonly" id="soft_type_name" name="softName" type="text" value="{{softName}}" style="width:50%">
                <input type="hidden" id="soft_type_id" name="type_id"/>
            </div>
        </div>
        <div class="mgb-20 clear">
            <div class="col-12 select-ty">
                <span>主机：</span>
                <input class="ipt-m" readonly="readonly" id="soft_host_name" name="host" type="text" value="{{pwdId}}" style="width:50%">
                <input type="hidden" id="soft_host_id" name="host"/>
            </div>
        </div>
        <div class="mgb-20 clear">
            <div class="select-ty">
                <span>配置文件地址：</span>
                <textarea name="shell" id="soft_shell" style="width:50%">{{shell}}</textarea>
            </div>
        </div>
        <div class="mgb-20 clear">
            <div class="col-12 select-ty">
                <span>部署目录：</span>
                <input  id="soft_path" name="path" required type="text" value="{{softwarePath}}" style="width: 50%" />
            </div>
        </div>

        <div class="mgb-20 clear">
            <div class="col-12 select-ty">
                <span>描述：</span>
                <textarea id="soft_remark" style="width: 50%;">{{remarks}}</textarea>
            </div>
         </div>

         <div class="mgb-20 clear">
             <div class="col-12 select-ty">
                 <span>备份主机ip：</span>
                 <input  id="soft_backup_ip" name="soft_backup_ip" required type="text" value="{{ip}}" style="width: 50%"  readonly="readonly" />
             </div>
         </div>

          <div class="mgb-20 clear">
              <div class="col-12 select-ty">
                  <span>备份文件目录：</span>
                  <textarea id="soft_backup_path" readonly="readonly" style="width: 50%;">{{path}}</textarea>
              </div>
           </div>


</div>
