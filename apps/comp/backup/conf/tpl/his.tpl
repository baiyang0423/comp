<div class="min-width1000 main-padd">
	<div class="pdl-10 pdr-10 pdt-10 pdb-20">
		<div class="bdt-box mgt-10 animation-left bgc-white">
			<table class="blue-table">
				<thead>
					<tr class="type-tr">
						<th>版本号</th>
						<th>大小</th>
						<th>备份时间</th>
						<th>备份人</th>
						<th>备份终端</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					{{each entity}} 
						<tr class="type-tr">
						    <td>V{{$value.version}}.0.0</td>
						    <td>{{$value.fileSize}}</td>
						    <td>{{$value.backTime}}</td>
						    <td>{{$value.backUser}}</td>
						    <td>{{$value.clientIp}}</td>
						    <td><a target="_blank" href="{{$value.httpPath}}" class="fc-org2">下载</a></td>
						</tr>
					{{/each}} 
				</tbody>
			</table>
		</div>
	</div>
</div>