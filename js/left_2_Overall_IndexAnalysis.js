/**
 * Created by 冯乐 on 2018/6/25.
 * 系统运行整体指标分析
 */

var left_2_Overall_IndexAnalysis = function () {
    //console.log(ITILData.IndicatorAnaysis);
    // console.info(ITILData.IndicatorAnaysis);
    // console.log(typeof(ITILData.IndicatorAnaysis));
    // console.log(ITILData.IndicatorAnaysis[0]);
    // console.log((ITILData.IndicatorAnaysis)[0]);
    var option = {
        title: {
            // text: '堆叠区域图'
        },
        textStyle: {
            // color: '#9f9ea6'
             color: '#fff'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                label: {
                    backgroundColor: '#151434'
                }
            }
        },
        legend: {
            data:['事件单(笔)','问题单(笔)','变更单(笔)','交易量(百万笔)'],
            left: 'left',
            bottom: '10',
            textStyle: {
                // color: '#799fb8'
                color: '#fff'
            }
        },
        toolbox: {
            feature: {
                // saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '3%',
            top: '30',
            containLabel: 1,
            show: 1,
            // borderColor: '#0d2651'
            borderColor: '#0d3681'
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,

                axisPointer : {
                    show : true ,
                    snap : true ,
                    label: {
                        show: true,
                        formatter:function (params) {
                            return  params.value + '<br/>' +
                                    params.seriesData[0].name + params.seriesData[0].data[params.seriesData[0].dataIndex]+ '<br/>' +
                                    params.seriesData[1].name + params.seriesData[1].data[params.seriesData[1].dataIndex]+ '<br/>' +
                                    params.seriesData[2].name + params.seriesData[2].data[params.seriesData[2].dataIndex]+ '<br/>' +
                                    params.seriesData[3].name + params.seriesData[3].data[params.seriesData[3].dataIndex]
                        }
                    }
                },
                axisLine:{
                    show: false
                },
                axisLabel: {
                    // interval: 0,
                    // rotate: 20
                },
                //最近12个月
                data : ITILData.Last12Months
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '单位：笔',
                nameLocation : 'end',
                axisLine:{
                    show: false
                },
                axisLabel:{
                    textStyle:{
                        // color: '#6bbbff'
                    }
                }
            },{
                type : 'value',
                name : '单位：百万笔',
                nameLocation : 'end',
                axisLine:{
                    show: false
                },
                axisLabel:{
                    textStyle:{
                        // color: '#6bbbff'
                    }
                }
            }
        ],
        series : [
            {
                name:'事件单(笔)',
                type:'line',
                stack: '总量1',
                yAxisIndex: 0 ,
                areaStyle: {  normal: {
                    color: '#fba01e'
                }},
                itemStyle: {
                    normal: {
                        color: '#fba01e'
                    }
                },
                data:  ITILData.IndicatorAnaysis[0]
            },
            {
                name:'问题单(笔)',
                type:'line',
                stack: '总量2',
                yAxisIndex: 0 ,
                areaStyle: {  normal: {
                    color: '#9bd342'
                }},
                itemStyle: {
                    normal: {
                        color: '#9bd342'
                    }
                },
                data: ITILData.IndicatorAnaysis[1]
            },
            {
                name:'变更单(笔)',
                type:'line',
                stack: '总量3',
                yAxisIndex: 0 ,
                areaStyle: { normal: {
                    color: '#6a005f'
                }},
                itemStyle: {
                    normal: {
                        color: '#6a005f'
                    }
                },
                data: ITILData.IndicatorAnaysis[2]
            },
            {
                name:'交易量(百万笔)',
                type:'line',
                stack: '总量4',
                yAxisIndex: 1 ,
                areaStyle: { normal: {
                    color: '#e54141'
                }},
                itemStyle: {
                    normal: {
                        color: '#e54141'
                    }
                },
                data:[null, null,  null,  null, null, null, null, null, null, null, null, null]
            }
        ]
    };

    var left_2_Chart = echarts.init(document.getElementById('left-2'),'shine');
    left_2_Chart.setOption(option, true);
    
    setInterval(function () {

        option.series[0].data = ITILData.IndicatorAnaysis[0];
        option.series[1].data = ITILData.IndicatorAnaysis[1];
        option.series[2].data = ITILData.IndicatorAnaysis[2];
        // option.series[3].data = ITILData.tradeArr[0].value;
        left_2_Chart.setOption(option, true);
        // console.log("doing!");
    },2000);

    
};
