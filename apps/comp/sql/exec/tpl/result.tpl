<p title="{{entity.sql}}" style="color: green;">{{entity.name}},执行时间:{{entity.executeTime}},耗时:{{entity.time}} ms. 提示:鼠标移到此区域将展示执行的SQL内容.</p>
<a class="h-underline operate off" target="_blank" name="download-excel" data-dbtype="{{entity.dbtype}}" data-pwdid="{{entity.pwdid}}"
			id="{{entity.logid}}" href="javascript:void(0);"  style="height: 20px;background-position-y: -196px;">导出</a>
<div class="test-5" style="overflow: scroll; width:1300px;height: 300px;">
<div class="pd-10 clear animation-right">
    <div class="approval-table fs-14">
        <table data-name="{{entity.name}}" id="table-{{entity.logid}}">
            <colgroup>
        		{{each entity.label.dto}}
        			<col>
        		{{/each}}
        	</colgroup>
            <thead>
                 <tr>
                    {{each entity.label.dto}}
                    	<th>{{$value.name}}</th>
                    {{/each}}
                </tr>
            </thead>
            <tbody>
                {{each entity.data as tr}}
                    <tr>
                        {{each tr.dto as td}}
                            <td>{{if td.value==null}}null{{else}}{{td.value}}{{/if}}</td>
                        {{/each}}
                    </tr>
                {{/each}}
            </tbody>
        </table>
    </div>
<div>
</div>





<div style="height: 40px;"></div>