{{each count}}
<div class="ui-row clear color-6 bdb-das pdt-10 pdb-10">
	<div class="col-3">{{$value.taskName}}</div>
	<div class="col-3">{{$value.ip}}</div>
	<div class="col-1">{{$value.totalCount}}</div>
	<div class="col-1">{{$value.successCount}}</div>
	<div class="col-1">{{$value.runCount}}</div>
	<div class="col-1 search_fail_detail" taskId="{{$value.taskId}}">
		<a href="#none" class="h-underline">{{$value.failCount}}</a>
	</div>
</div>
{{/each}} 
