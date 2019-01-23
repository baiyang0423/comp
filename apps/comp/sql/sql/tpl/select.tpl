<option value="">请选择</option>
{{each entity}}
<option value="{{$value.value}}">{{$value.name}}</option>
{{/each}}