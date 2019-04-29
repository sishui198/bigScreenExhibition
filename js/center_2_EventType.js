/**
 * Created by 冯乐 on 2018/6/25.
 * 事件类型分析
 */

var center_2_EventType = function () {
    var optionPie = {
        title: {
            text: '事件类型',
            left: 'center',
            top: 'center',
            textStyle: {
                color: '#fff',
                fontSize: '25',
                fontWeight: 'bold'
            }
        },
        textStyle: {
            // color: '#9f9ea6'
            color: '#fff'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            textStyle: {
                color: '#fff'
            },
            orient: 'horizontal',
            //left: 'left',
            data: ['告警类   ', '投诉建议', '服务请求', '故障类']
        },
        series: [{
            type: 'pie',
            name: '事件类型',
            radius: ['50%','70%'],
            center: ['50%' , '50%'],
            label: {
                normal: {
                    show: true,
                    position: 'outside'
                },
                emphasis: {
                    show: false,
                    position: 'center',
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine:{
                normal:{
                    show: false,
                    length1: 0.5,
                    length2: 0.5
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0,0,0,0.5)'
                }
            },
            data: [
                {
                    value: 0,
                    name: "告警类   ",
                    itemStyle: {
                        normal:{
                            color: "#ffc44f"    
                        }  
                    }
                    // sliced: true
                },
                {
                    value: 0,
                    name: "投诉建议",
                    itemStyle: {
                        normal:{
                            color: "#a46c8a"    
                        }  
                    }
                },
                {
                    value: 0,
                    name: "服务请求",
                    itemStyle: {
                        normal:{
                            color: "#78d0bf"    
                        }  
                    }   
                },
                {
                    value: 0,
                    name: "故障类",
                    itemStyle: {
                        normal:{
                            color: "#e85a48"    
                        }   
                    }     
                }
            ]
        }]
    };
    // $('#center-2-1').highcharts(option);
    var center_2_1_Chart = echarts.init(document.getElementById('center-2-1'),'shine');
    center_2_1_Chart.setOption(optionPie, true);



    var optionBar = {
        title: {
            text: '事件类型月度汇总表',
            textStyle: {
                color: '#fff',
                fontSize: '25',
                fontWeight: 'bold'
            },
            subtext: '',
            // textStyle: {
            //     color: '#205486'
            // },
            left: 'center',
            top: 0
            
            
        },
        textStyle: {
            // color: '#9f9ea6'
            color: '#fff'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            
            bottom: '30%',
            borderColor: '#0d3681'
        },
        xAxis: {
            type: 'category',
            axisLine:{
                show: false
            },
            axisLabel: {
                interval: 0,
                formatter:function(val){
                    return val.split("").join("\n");
                }
            },
            data: ['告警事件', '投诉建议', '一般操作', '信息查询', '硬件设备', '数据安全', '错误操作', '自然灾害', '网络故障', '系统故障', '病毒攻击']
        },
        yAxis: {
            type: 'value',
            name : '单位：笔',
            nameLocation : 'end',
            axisLine:{
                show: false
            }
        },
        label:{
                show: true ,
                position: 'top',
                textStyle: {
                	color: '#fff'	
                }
            },
        series: [{
            name: '笔数',
            type: 'bar',
            barWidth: '60%',
            label:{
            		normal: {
            			 show: true ,
                		position: 'top',
                		textStyle: {
                				color: '#fff'	
                		}
            			
            		}
            },
            data: [
                    {
                        name: '告警',
                        value:  0,
                        itemStyle: {
                            normal:{
                                color: "#ffc44f"    
                            }
                            
                        }
                    },
                    {
                        name: '投诉建议',
                        value:  0,
                        itemStyle: {
                            normal:{
                                color: "#a46c8a"    
                            }
                            
                        }
                    },
                    {
                        name: '一般操作', 
                        value:  0,
                        itemStyle: {
                            normal:{
                                color: "#78d0bf"    
                            }
                            
                        }
                    },
                    {       
                        name: '信息查询',               
                        value:  0,
                        itemStyle: {
                            normal:{
                                color: "#78d0bf" 
                            }
                            
                        }
                    },
                    {
                        name: '硬件设备故障',
                        value:  0,
                        itemStyle: {
                            normal:{
                                color: "#e85a48"    
                            }
                            
                        }
                    },
                    {
                        name: '数据安全故障',
                        value:  0,
                        itemStyle: {
                            normal:{
                                color: "#e85a48"    
                            }
                            
                        }
                    },
                    {
                        name: '错误操作故障',
                        value:  0,
                        itemStyle: {
                            normal:{
                                color: "#e85a48"    
                            }
                            
                        }
                    },
                    {
                        name: '自然灾害故障',
                        value:  0,
                        itemStyle: {
                            normal:{
                                color: "#e85a48"    
                            }
                            
                        }
                    },
                    {
                        name: '网络故障',
                        value:  0,
                        itemStyle: {
                            normal:{
                                color: "#e85a48"    
                            }
                            
                        }
                    },
                    {
                        name: '系统故障',
                        value:  0,
                        itemStyle: {
                            normal:{
                                color: "#e85a48"    
                            }
                            
                        }
                    },
                    {
                        name: '病毒攻击故障',
                        value:  0,
                        itemStyle: {
                            normal:{
                                color: "#e85a48"    
                            }
                            
                        }
                    }
                ]
            
        }]
    };

    var center_2_2_Chart = echarts.init(document.getElementById('center-2-2'),'shine');
    center_2_2_Chart.setOption(optionBar, true);

    $('#center-2-3 button').html( ITILData.Last12Months[11] + ' <span class="caret"></span>');

    //
    $('#center-2-3-ul').html("");

    for(var i = 0; i< ITILData.Last12Months.length; i++){
        $('#center-2-3-ul').append("<li value='" + i +"'><a>" + ITILData.Last12Months[i] +"</a></li>");
    }
    // console.log(option.series[0].data[0].value);
    // console.log(ITILData.EventTypeAnaysis[11][0]);

    var IsGetEventTypeAnaysis = setInterval(function () {
        if( ITILData.EventTypeAnaysis[11].length != 0){
            //饼图
            optionPie.series[0].data[0].value  = parseInt(ITILData.EventTypeAnaysis[11][0]);//   告警  [0]
            optionPie.series[0].data[1].value  = parseInt(ITILData.EventTypeAnaysis[11][1]);//投诉建议 [1]
            optionPie.series[0].data[2].value  = parseInt(ITILData.EventTypeAnaysis[11][2]) + 
                                                 parseInt(ITILData.EventTypeAnaysis[11][3]);//服务请求 [2-3]
            
            optionPie.series[0].data[3].value  = parseInt(ITILData.EventTypeAnaysis[11][4]) + 
                                                 parseInt(ITILData.EventTypeAnaysis[11][5]) + 
                                                 parseInt(ITILData.EventTypeAnaysis[11][6]) + 
                                                 parseInt(ITILData.EventTypeAnaysis[11][7]) + 
                                                 parseInt(ITILData.EventTypeAnaysis[11][8]) + 
                                                 parseInt(ITILData.EventTypeAnaysis[11][9]) + 
                                                 parseInt(ITILData.EventTypeAnaysis[11][10]);//   故障  [4 - 10]
            
            

            center_2_1_Chart.setOption(optionPie, true);

            //柱状图
            optionBar.series[0].data[0].value  = parseInt(ITILData.EventTypeAnaysis[11][0]);
            optionBar.series[0].data[1].value  = parseInt(ITILData.EventTypeAnaysis[11][1]);
            optionBar.series[0].data[2].value  = parseInt(ITILData.EventTypeAnaysis[11][2]);
            optionBar.series[0].data[3].value  = parseInt(ITILData.EventTypeAnaysis[11][3]);
            optionBar.series[0].data[4].value  = parseInt(ITILData.EventTypeAnaysis[11][4]);
            optionBar.series[0].data[5].value  = parseInt(ITILData.EventTypeAnaysis[11][5]);
            optionBar.series[0].data[6].value  = parseInt(ITILData.EventTypeAnaysis[11][6]);
            optionBar.series[0].data[7].value  = parseInt(ITILData.EventTypeAnaysis[11][7]);
            optionBar.series[0].data[8].value  = parseInt(ITILData.EventTypeAnaysis[11][8]);
            optionBar.series[0].data[9].value  = parseInt(ITILData.EventTypeAnaysis[11][9]);
            optionBar.series[0].data[10].value = parseInt(ITILData.EventTypeAnaysis[11][10]);
           
            center_2_2_Chart.setOption(optionBar, true);

            clearInterval(IsGetEventTypeAnaysis);
        }


    },2000);
    

    $('#center-2-3 ul li ').click(function () {
        //
        // console.log(ITILData.EventTypeAnaysis[liIdnex][0]);
        var liIdnex = $(this).val();
        var liVal = $(this.firstChild).html();
        $('#center-2-3 button').html( liVal + ' <span class="caret"></span>');
        //更新数据

        // setInterval(function () {
                optionPie.series[0].data[0].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][4]) + 
                                                     parseInt(ITILData.EventTypeAnaysis[liIdnex][5]) + 
                                                     parseInt(ITILData.EventTypeAnaysis[liIdnex][6]) + 
                                                     parseInt(ITILData.EventTypeAnaysis[liIdnex][7]) + 
                                                     parseInt(ITILData.EventTypeAnaysis[liIdnex][8]) + 
                                                     parseInt(ITILData.EventTypeAnaysis[liIdnex][9]) + 
                                                     parseInt(ITILData.EventTypeAnaysis[liIdnex][10]);//   故障  [4 - 10]
                optionPie.series[0].data[1].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][0]);//   告警  [0]
                optionPie.series[0].data[2].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][2]) + 
                                                     parseInt(ITILData.EventTypeAnaysis[liIdnex][3]);//服务请求 [2-3]
                optionPie.series[0].data[3].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][1]);//投诉建议 [1]

                center_2_1_Chart.setOption(optionPie, true);

                optionBar.series[0].data[0].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][0]);
                optionBar.series[0].data[1].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][1]);
                optionBar.series[0].data[2].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][2]);
                optionBar.series[0].data[3].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][3]);
                optionBar.series[0].data[4].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][4]);
                optionBar.series[0].data[5].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][5]);
                optionBar.series[0].data[6].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][6]);
                optionBar.series[0].data[7].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][7]);
                optionBar.series[0].data[8].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][8]);
                optionBar.series[0].data[9].value  = parseInt(ITILData.EventTypeAnaysis[liIdnex][9]);
                optionBar.series[0].data[10].value = parseInt(ITILData.EventTypeAnaysis[liIdnex][10]);
                // option.series[3].data = ITILData.;
                center_2_2_Chart.setOption(optionBar, true);
                // console.log("doing!");
        // },2000);
    });
};