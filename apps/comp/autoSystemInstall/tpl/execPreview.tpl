<div class="bdt-box mg-10 mgb-0 bgc-white pd-10 animation-left" style="z-index: 9;">
	<p class="fs-20 pdl-10">执行预览</p>
</div>
<div class="pd-10 clear animation-right pdb-0">
	<div class="bdb-0 configure fs-14 bgc-white mgt-0 pdt-40">
        <div class="mgb-20">
    		<p><span>责任人：</span></p>
    		<span>{{personLiable}}</span>
        </div>
        <div class="mgb-20">
            <p>
                <span>描述：</span>
            </p>
            <span>{{content}}</span>
        </div>
        <div class="mgb-20">
            <p>
                <span>创建人：</span>
            </p>
            <span>{{createUser}}</span>
        </div>
        <div class="mgb-20">
            <p>
                <span>创建时间：</span>
            </p>
            <span>{{createTime}}</span>
        </div>
        
    </div>
</div>
<div class="pd-10 clear animation-left">
	<div class="approval-table fs-14" style="margin-bottom:40px">
   		<table>
   			<colgroup>
                <col width="30%">
                <col width="35%">
                <col width="35%">
            </colgroup>
   			<tr>
   				<th>主机IP</th>
   				<th>安装模板</th>
   				<th class="bdr-0 w-260">操作系统版本</th>
   			</tr>
   			<tbody id="tbody_install_execute">
   				{{each list}}
   				<tr>
   					<td>{{$value.ip}}</td>
   					<td>{{$value.templetName}}</td>
   					{{if $value.osVersion == '-'}}
   					<td>不安装操作系统</td>
   					{{else}}
   					<td>{{$value.versionName}}</td>
   					{{/if}}
   				</tr>
   				{{/each}} 
        	</tbody>
   		</table>	
	</div>
</div>