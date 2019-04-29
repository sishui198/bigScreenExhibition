/**
 * Created by 冯乐 on 2018/6/25.
 * 事件按时解决、故障自愈率
 */

var right_3_ResolveRate_SelfHealingRate = function () {
    var option = {
        // title: {
        //     text: '实际执行率',
        //     textStyle: {
        //         color: '#ffffff'
        //     },
        //     backgroundColor:'#00b7ee'
        // },
        textStyle: {
            // color: '#07749d'
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
            data:['事件按时解决率','变更成功执行率'],
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
            show:true,
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
                                params.seriesData[1].name + params.seriesData[1].data[params.seriesData[1].dataIndex]+ '%<br/>' 
                        }
                    }
                },
                //最近12个月
                data : ITILData.Last12Months
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '单位：百分比' ,
                nameLocation : 'end',
                min: 0 ,
                max: 100,
                axisLine:{
                    show: false
                }
            }
/*
            {
                type : 'value',
                name : '单位：百分比' ,
                nameLocation : 'end',
                min: 0 ,
                max: 100,
                axisLine:{
                    show: false
                }
            }*/
        ],
        series : [
            {
                name:'事件按时解决率',
                type:'line',
                stack: '总量1',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#4dff16'
                    }
                },
                areaStyle: {normal: {
			color: '#4dff16'
		}},
                data:[null, null, null, null, null, null, null, null, null, null, null, null]
            }
	,
            {
               // name:'故障自愈率'
               name:'变更成功执行率',
                type:'line',
                stack: '总量2',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#2591ff'
                    }
                },
                areaStyle: {normal: {color: '#2591ff'}},
                data:[null, null, null, null, null, null, null, null, null, null, null, null]
            }
        ]
    };

    var right_3_Chart = echarts.init(document.getElementById('right-3'));

    right_3_Chart.setOption(option, true);
/*
    option.series[0].data = ITILData.EventResolutionRateAnaysis;
    option.series[1].data = ITILData.SuccessfulChangeAnaysis;
    right_3_Chart.setOption(option, true);
*/
    setInterval(function () {
        option.series[0].data = ITILData.EventResolutionRateAnaysis;
        option.series[1].data = ITILData.SuccessfulChangeAnaysis;
        right_3_Chart.setOption(option, true);
        // console.log("doing!");
    },60000);

    //李朋飞ip
    // var ipr3 = 'http://192.168.1.101:5080';

    //操作间ip
    var ipr3 = 'http://102.200.192.249:5080';
   /* getr3Data(ipr3);
    setInterval(function () {
        getr3Data(ipr3);
    },3600000);
*/
    function getr3Data(ip) {
        $.ajax({
            url: ip + '/bigScreen/indicator?id=13',
            type: 'get',
            success:function(response){
                console.log(response);
                // var data = JSON.parse(response);
                var data = response.Content.monthTotal;
                console.log(data);
                var arrr3 =[];
                for(var i = 0;i < data.length; i++){
                    arrr3.push((parseFloat(data[i].zs) * 100).toFixed(2));
                }
                //处理信息方法
                option.series[1].data = arrr3;
                option.series[0].data = ITILData.EventResolutionRateAnaysis;
                right_3_Chart.setOption(option, true);
                // console.log("doing!");
            },
            error:function(){

            }
        });
    }
};
