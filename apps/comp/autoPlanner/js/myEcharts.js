define(function() {
	var myEcharts = {}
	
	/**
	 * 折线图
	 */
	myEcharts.brokenLine = function(list){
//		$('#brokenLine').removeAttr('_echarts_instance_');
		function BrokenLine(option){
		    this.color           = option.color||['#62c45c','#BF3EFF','#f7b888','#b166dc'];
		    this.fontSize        = option.fontSize||36;
		    this.domEle          = option.domEle;
		    this.value           = option.value;
		    this.title           = option.title;
//		    this.status          = option.status
		}
		BrokenLine.prototype.init = function(){
		    var _that = this;
		    var option = {
		        legend: {
		            data:[
		                {name:'操作系统安装',icon:'rect'},
		                {name:'基线加固',icon:'rect'},
		                {name:'自动化巡检',icon:'rect'}],
		            x: 'right', // 'center' | 'left' | {number},
		            y: 'top', // 'center' | 'bottom' | {number}
		            padding:[10,60,0]
		        },
		        color:_that.color,
		        title:[{
		            text:_that.title,
		            textStyle:{
		                fontSize:14,
		                color:"#333333",
		            },
		            left:5       
		        }],
		        grid:[{
		            left:50,
		            top:40,
		            bottom:40,
		            right:60
		        }],
		        tooltip : {
		            formatter: function (datas) { 
		               var res = datas[0].name + '<br/>', val;
		               for(var i = 0, length = datas.length; i < length; i++) {
		                   res += datas[i].seriesName + '：' + datas[i].value + '<br/>' ;
		                }
//		                res += _that.status
		                return res ;
		            },
		            trigger: 'axis'
		        },
		        
		        xAxis: {
		            type: 'category',
		            data: _that.value,
		            boundaryGap: false,
		            "axisTick":{       //y轴刻度线
		                "show":false
		            },
		            "axisLine": {
		                lineStyle: {
		                    type: 'solid',
		                    color: '#cecece',//左边线的颜色
		                }
		            },
		            axisLabel: {
		                show: true,
		                textStyle: {
		                    color: '#666'
		                }
		            },
		            
		        },
		        yAxis: {
		            type: 'value',
		            "axisTick":{       //y轴刻度线
		                "show":false
		            },
		            max: function(value) {
		                return value.max + 50;
		            },
		             "axisLine": {
		                lineStyle: {
		                    type: 'solid',
		                    color: '#cecece',//左边线的颜色
		                }
		            },
		            axisLabel: {
		                show: true,
		                textStyle: {
		                    color: '#666'
		                }
		            },
		            splitLine: {
		                show: true,
		                lineStyle:{
		                    color: ['#cecece'],
		                    width: 1,
		                     type: 'deshed'
		                }
		            }
		        },
		        series: [{
		            name:'操作系统安装',
		            data: [0,0,0,0,0,0,0,0,0,0],
		            type: 'line',
		            itemStyle:{
		                normal : {
		                    color:'#62c45c'
		                }
		            },
		        },{
		            name:'基线加固',
		            data: list,
		            type: 'line',
		            itemStyle:{
		                normal : {
		                    color:'#BF3EFF'
		                }
		            },
		        },{
		            name:'自动化巡检',
		            data: [0,0,0,0,0,0,0,0,0,0],
		            type: 'line',
		            itemStyle:{
		                normal : {
		                    color:'#f7b888'
		                }
		            },
		        }],
		    };
		    
		    echarts.init(_that.domEle).setOption(option);
		};
		
		var option =    {
		    domEle:document.getElementById("brokenLine"),//必填
		    title:"秒（s）",
		    value:['第一次','第二次','第三次','第四次','第五次','第六次','第七次','第八次','第九次','第十次'],
//		    status:"执行时间"
		};
		
		var brokenLine = new BrokenLine(option);
		brokenLine.init();
	}
	
	
	
	/**
	 * 饼图
	 */
	myEcharts.yw_mouthdata = function(json){
		$('#mouth-data-yw').removeAttr('_echarts_instance_');
		var linuxCount ;
		var unixCount ;
		var aixCount ;
		json.forEach(function(attr,index){
			if("LINUX" == attr.hostOS){
				linuxCount = attr.hostCount;
			}
			if("UNIX" == attr.hostOS){
				unixCount = attr.hostCount;
			}
		});
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
		            data:['LINUX' ,'UNIX'],
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
		                    	value:linuxCount, 
				                name:'LINUX'
				            }, {
		                    	value:unixCount, 
		                    	name:'UNIX'
		                    },{
		                    	value:aixCount, 
		                    	name:'AIX'
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
		$('#day-data-yw').removeAttr('_echarts_instance_');
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