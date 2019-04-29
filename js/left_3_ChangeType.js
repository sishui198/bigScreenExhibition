/**
 * Created by 冯乐 on 2018/6/25.
 * 变更类型分析
 */

var left_3_ChangeType = function () {
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
                    // backgroundColor: '#151434'
                    backgroundColor: '#fff'
                }
            }
        },
        legend: {
            data:['普通变更','标准变更','敏捷变更','紧急变更'],
            left: 'left',
            bottom: '30',
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
            top: '10',
            containLabel: true,
            show: true,
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
                                params.seriesData[0].name + params.seriesData[0].data[params.seriesData[0].dataIndex]+ '笔<br/>' +
                                params.seriesData[1].name + params.seriesData[1].data[params.seriesData[1].dataIndex]+ '笔<br/>' +
                                params.seriesData[2].name + params.seriesData[2].data[params.seriesData[2].dataIndex]+ '笔<br/>' +
                                params.seriesData[3].name + params.seriesData[3].data[params.seriesData[3].dataIndex]+ '笔'
                        }
                    }
                },
                axisLine:{
                    show: false
                },
                axisLabel: {
                    // interval: 0,
                    // rotate: 15
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
                }
            }
        ],
        series : [
            {
                name:'普通变更',
                type:'line',
                stack: '总量1',
                itemStyle: {
                    normal: {
                        color: '#f7e750'
                    }
                },
                // areaStyle: {normal: {}},
                data: ITILData.ChangeAnaysis[0]
            },
            {
                name:'标准变更',
                type:'line',
                stack: '总量2',
                itemStyle: {
                    normal: {
                        color: '#ff3014'
                    }
                },
                // areaStyle: {normal: {}},
                data: ITILData.ChangeAnaysis[1]
            },
            {
                name:'敏捷变更',
                type:'line',
                stack: '总量3',
                itemStyle: {
                    normal: {
                        color: '#14f7ff'
                    }
                },
                // areaStyle: {normal: {}},
                data: ITILData.ChangeAnaysis[2]
            },
            {
                name:'紧急变更',
                type:'line',
                stack: '总量4',
                itemStyle: {
                    normal: {
                        color: '#898f9d'
                    }
                },
                // areaStyle: {normal: {}},
                data: ITILData.ChangeAnaysis[3]
            }
        ]
    };

    var left_3_Chart = echarts.init(document.getElementById('left-3'));

    left_3_Chart.setOption(option, true);

    setInterval(function () {

        option.series[0].data = ITILData.ChangeAnaysis[0];
        option.series[1].data = ITILData.ChangeAnaysis[1];
        option.series[2].data = ITILData.ChangeAnaysis[2];
        option.series[3].data = ITILData.ChangeAnaysis[3];
        // option.series[3].data = ITILData.;
        left_3_Chart.setOption(option, true);
        // console.log("doing!");
    },2000);
};
