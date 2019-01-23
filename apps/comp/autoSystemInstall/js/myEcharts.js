define(function() {
	var myEcharts = {}
	/**
	 * 百分比
	 */
	myEcharts.PercentPie = function(entity){
		//圆环
		function PercentPie(option){
		    this.backgroundColor = option.backgroundColor||'#fff';
		    this.color           = option.color||['#38a8da','#d4effa'];
		    this.fontSize        = option.fontSize||36;
		    this.domEle          = option.domEle;
		    this.value           = option.value;
		    this.name            = option.name||"目前进度";
		    this.title           = option.title;
		}
		
		PercentPie.prototype.init = function(){
		    var _that = this;
		    var option = {
		        backgroundColor:_that.backgroundColor,
		        color:_that.color,
		        series: [{
		            name: '来源',
		            type: 'pie',
		            radius: ['85%', '95%'],
		            avoidLabelOverlap: false,
		            legendHoverLink:false,
		            hoverAnimation:false,
		            data: [{
		                    value: _that.value,
		                    label:{
		                        normal:{
		                            show:true,
		                        },
		                        
		                    },
		                 },
		                {
		                    value: 100 - _that.value,
		                    name: ''
		                },
		            ],
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center',
		                    textStyle: {
		                        fontSize: _that.fontSize,
		                        fontWeight: 'bold'
		                    },
		                    formatter:'{b}\n{c}%',
		                    color: "#666666",
		                    padding: [0,0,35,0]
		                }
		            },
		            clockwise: true
		        }]
		    };
		    echarts.init(_that.domEle).setOption(option);
		};
		
		var option = {
                    value:entity,//百分比,必填
                    backgroundColor:null,
                    color:['#37a1f9','#d7e6f4'],
                    domEle:document.getElementById("pieDiagram")//必填
                };
    	var percentPie = new PercentPie(option);
    	percentPie.init();
	}
	
	/**
	 * 饼图
	 */
	myEcharts.yw_mouthdata = function(json){
		console.info(json);
		var sucCount = json.sucCount;
		var failCount = json.failCount;
		var yw_mouthdata = echarts.init(document.getElementById("mouth-data-yw"));
		    yw_mouthdata_option = {
		        tooltip : {
		            trigger: 'item',
		            formatter: "{b} : {c} ({d}%)",
		            textStyle:{    //图例文字的样式
		                color:'#fff',
		                fontSize:12
		            }
		        },
		        legend: {
		            x : 'right',
		            data:['成功' ,'失败'],
		            orient:'vertical',
		            textStyle:{    //图例文字的样式
		                color:'#333',
		                fontSize:14,
		            }
		
		        },
		        color:['#37a1f9', 'green','yellow','blueviolet'],
		        calculable : true,
		        series : [
		            {
		                name:'访问来源',
		                type:'pie',
		                radius : '55%',
		                center: ['50%', '45%'],
		                itemStyle:{ 
		                    normal:{ 
		                        label:{ 
		                            show: true, 
		                            formatter: '{d}%' ,
		                            textStyle:{    //图例文字的样式
		                                color:'#333',
		                                fontSize:12
		                            }
		                        }, 
		                        labelLine :{
		                        	show:true
		                        }
		                    } 
		                },
		                data:[
		                    {
		                    	value:sucCount, 
				                name:'成功'
				            }, {
		                    	value:failCount, 
		                    	name:'失败'
		                    }
		                ]
		            }
		        ]
		    };
		    yw_mouthdata.setOption(yw_mouthdata_option);
	}
	/**
	 * 柱状图
	 */
	myEcharts.yw_daydata = function(reinforce){
		var name = [];
		var sCount = [];
		var fCount = [];
		reinforce.forEach(function(attr ,index){
			name.push(attr.kpiName);
			sCount.push(attr.successCount);
			fCount.push(attr.failCount)
		});
		if(reinforce.length < 10){
			for(var s = 0 ; s < 10 - reinforce.length ;s++){
				name.push("");
			}
		}
		var yw_daydata = echarts.init(document.getElementById("day-data-yw"));
		    yw_daydata_option = {
		        tooltip : {
		            trigger: 'axis',
		            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		                type : 'shadow', // 默认为直线，可选为：'line' | 'shadow'
		                shadowStyle: {
		                    color: 'rgba(0, 0, 0, .3)',
		                }       
		            },
		        },
		         title : {
		             text: '基线指标加固分布(个)',
		             textStyle: {
		                 color: '#333',
		                 fontSize:14,
		                 align:'right',
		                 fontWeight:'normal',
		             },
		         },
		        legend: {
		            x : 'right',
		            data:['成功','失败'],
		            orient:'vertical',
		            textStyle:{    //图例文字的样式
		                color:'#333',
		                fontSize:14,
		            }
		
		        },
		        grid: {
		            borderWidth: 0,
		            x: 20,
		            x2: 20,
		            y2: 30,
		            bottom:"30%"
		        },  
		        color:['#5fc254', '#ef4c7a'],
		        xAxis : [
		            {
		                type : 'category',
		                data :name,
		                axisLabel: {
		                    show: true, 
		                    textStyle: {
		                        color: "#333"
		                    },
		                    interval: 0,
		                    rotate:"-45"
		                },
		                splitLine:{  
		                    show: false  
		                },
		                axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#f0f0f0',//左边线的颜色
		                        width:'1'//坐标线的宽度
		                    }
		                },
		            }
		        ],
		        yAxis : [
		            {
		                type : 'value',
		                show: false,
		            }
		        ],
		        series : [
		            {
		                name:'成功',
		                type:'bar',
		                stack:'成功',
		                data:sCount,
		                itemStyle:{ 
		                    normal:{ 
		                        label:{ 
		                            show: false, 
		                            position: 'top',
		                            textStyle: {
		                                color: '#333',
		                                fontSize: 16
		                            },
		                            formatter: '{c}' ,
		                        }, 
		                        labelLine :{show:false}
		                    } 
		                },
		            },
		            {
		                name:'失败',
		                type:'bar',
		                stack:'失败',
		                itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
		                data:fCount,
		                itemStyle:{ 
		                    normal:{ 
		                        label:{ 
		                            show: false, 
		                            position: 'top',
		                            textStyle: {
		                                color: '#333',
		                                fontSize: 16
		                            },
		                            formatter: '{c}' ,
		                        }, 
		                        labelLine :{show:true}
		                    } 
		                },
		         
		            }
		        ]
		    };
		    yw_daydata.setOption(yw_daydata_option);
		
		
	};
	
	
	
	return myEcharts;
});