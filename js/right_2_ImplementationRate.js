/**
 * Created by 冯乐 on 2018/6/25.
 * 自动化执行、变更成功执行率
 */

var right_2_ImplementationRate = function () {
    var option = {
        // title: {
        //     text: '实际执行率',
        //     textStyle: {
        //         color: '#ffffff'
        //     },
        //     backgroundColor: '#4fcdf3'
        //     // backgroundColor: '#fff'
        // },
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
        textStyle: {
            // color: '#07749d'
             color: '#fff'
        },
        legend: {
            // data:['生产','异地','同城'],
            data:['自动化执行率'],
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
            show: true,
            containLabel: true,
            borderColor: '#0d3681'
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine:{
                    show: false
                },
                axisLabel: {
                    // interval: 0,
                    // rotate: 30
                },
                axisPointer : {
                    show : true ,
                    snap : true ,
                    label: {
                        show: true,
                        formatter:function (params) {
                            return  params.value + '<br/>' +
                                params.seriesData[0].name + params.seriesData[0].data[params.seriesData[0].dataIndex]+ '%<br/>' 
                               // params.seriesData[1].name + params.seriesData[1].data[params.seriesData[1].dataIndex]+ '%<br/>' 
                                // params.seriesData[2].name + params.seriesData[2].data[params.seriesData[2].dataIndex]+ '%<br/>'
                        }
                    }
                },
                //最近12个月
                data : ITILData.Last12Months
            }
        ],
        yAxis : [
            {
                type : 'value' ,
                name : '单位：百分比' ,
                nameLocation: 'end',
                min: 0 ,
               // max: 100,
                axisLine:{
                    show: false
                }
            }
/*
            {
                type : 'value' ,
                name : '单位：百分比' ,
                nameLocation: 'end',
                min: 0 ,
                max: 100,
                axisLine:{
                 
   show: false
                }
            }*/
        ],
        series : [
            {
                name:'自动化执行率',
                type:'line',
                stack: '总量1',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#f7e750'
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#f7e750'
                    }
                },
		yAxisIndex: 0,
                data: ITILData.ManageNormInfo[0]
            }
/*
            {
                name:'变更成功执行率',
                type:'line',
                stack: '总量2',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#16dbff'
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#16dbff'
                    }
                },
		yAxisIndex: 1,
                data: [null,null,null,null,null,null,null,null,null,null,null,null]
                // data: ITILData.SuccessfulChangeAnaysis
            }
            // {
            //     name:'同城',
            //     type:'line',
            //     stack: '总量',
            //     smooth: true,
            //     areaStyle: {normal: {}},
            //     data: ITILData.ManageNormInfo[2]
            // }
            */
        ]
    };

    var right_2_Chart = echarts.init(document.getElementById('right-2'));

    right_2_Chart.setOption(option, true);

    setInterval(function () {
        //console.log(ITILData.ManageNormInfo[0]);
        option.series[0].data = ITILData.ManageNormInfo[0];

       // option.series[1].data = ITILData.SuccessfulChangeAnaysis;
        // option.series[2].data = ITILData.ManageNormInfo[2];
        // option.series[3].data = ITILData.;
        right_2_Chart.setOption(option, true);
        // console.log("doing!");
    },2000);
};
