{{if entity.length>0}}
<div class="mgt-big clearfix pdl-10">
	<div class="layout-container fl" style="width: 100%">
		<div class="col-tit">
			<span class="need inline-block v-m">*</span> 参数：
		</div>
		<div class="col-main pdt-10">
			{{each entity}}
				{{$value.name}}:<input class="ipt-m" name="execsqlparams" data-name="{{$value.value}}" type="text" id='param-{{$value.value}}' value="" style="width: 150px;" />
			{{/each}}
		</div>
	</div>
</div>
{{/if}}
