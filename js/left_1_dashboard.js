/**
 * Created by 冯乐 on 2018/6/25.
 * 系统运维管理指标  左仪表盘
 */

//left-1-1
//console.log("left_1_dashboard");
var left_1_dashboard = function () {
    // var fsize = 10 ;
    var option1 = {
        tooltip : {
            formatter: "{a} {b} : {c}%"
        },
        toolbox: {
            feature: {
                // restore: {},
                // saveAsImage: {}
            }
        },
        textStyle: {
            color: '#fff'
        },
        series: [
            {
//                animation: false,
                name: '',
                type: 'gauge',
                center: ["50%", "45%"], // 仪表位置
                radius: "90%", //仪表大小
//                pointer: {
//                    width: 5
//                },
                //min:90,
                max:100,
                title:{
                    //   show: false,
                    offsetCenter:[0, '80%'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                pointer: {

                    show: true,
                    width: 0
                },
                axisLabel:{
                    show: false
                },
                axisLine: {
                    show: 1,
                    lineStyle:{
                        color:[[0.2, '#ff0000'], [0.8, '#4488bb'], [1, '#348973']],
                        width:15
                    }
                },
                splitLine:{
                    show: false,
                    length: 15
                },
                axisTick:{
                    show: false
                },
                detail: {
                    formatter:'{value}%' ,
                    textStyle: {
                        fontSize: 30
                    },
                    offsetCenter:[0, '0%']
                },
                data: [{value: 0, name: '重要信息\n系统可用率'}]
            }
        ]
    };

    var option2 = {
        tooltip : {
            formatter: "{a}{b} : {c}%"
        },
        toolbox: {
            feature: {
                // restore: {},
                // saveAsImage: {}
            }
        },
        textStyle: {
            color: '#fff'
        },
        series: [
            {
                name: '',
                type: 'gauge',
                center: ["50%", "45%"], // 仪表位置
                radius: "90%", //仪表大小
//                pointer: {
//                    width: 5
//                },
                //min: 70,
                max: 100,
                title:{
                    show: true,
                    offsetCenter:[0, '80%'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                pointer: {
                    show: false,
                    width: 0
                },
                axisLabel:{
                    show: false
                },
                axisLine: {
                    show: 1,
                    lineStyle:{
//                        color:[[0.2, '#ff0000'], [0.8, '#4488bb'], [1, '#348973']],
                        color:[[1,'#373a6a']],
                        width:15
                    }
                },
                splitLine:{
                    show: false,
                    length: 15
                },
                axisTick:{
                    show: false
                },
                detail: {
                        formatter:'{value}%',
                        textStyle: {
                            fontSize: 30
                        },
                        offsetCenter:[0, '0%']
                },
                data: [{value: 0, name: '事件按时\n解决率'}]
            }
        ]
    };

    var option3 = {
        tooltip : {
            formatter: "{a}{b} : {c}"
        },
        toolbox: {
            feature: {
                // restore: {},
                // saveAsImage: {}
            }
        },
        textStyle: {
            color: '#fff'
        },
       
        series: [
            {
                name: '',
                type: 'gauge',
                center: ["50%", "45%"], // 仪表位置
                radius: "90%", //仪表大小
                pointer: {
                    show: false,
                    width: 0
                },
                min: 0,
                max: 10,
                title:{
                    //   show: false,
                    offsetCenter:[0, '80%'],
                    textStyle: {
                        color: '#fff'
                    }
                },

                axisLabel:{
                    show: false
                },
                axisLine: {
                    show: 1,
                    lineStyle:{
//                        color:[[0.2, '#348973'], [0.8, '#4488bb'], [1, '#ff0000']],
                        color:[[1,'#373a6a']],
                        width:15
                    }
                },
                splitLine:{
                    show: false,
                    length: 15
                },
                axisTick:{
                    show: false
                },
                detail: {
                    formatter:'{value}笔' ,
                    textStyle: {
                        fontSize: 30
                    },
                    offsetCenter:[0, '0%']
                },
                data: [{value: 0, name: 'A级\n事件数量'}]
            }
        ]
    };

    var left_1_1_Chart = echarts.init(document.getElementById('left-1-1'));
    var left_1_2_Chart = echarts.init(document.getElementById('left-1-2'));
    var left_1_3_Chart = echarts.init(document.getElementById('left-1-3'));
    left_1_1_Chart.setOption(option1, true);
    left_1_2_Chart.setOption(option2, true);
    left_1_3_Chart.setOption(option3, true);

    // console.log("echarts.init() done!");
    setInterval(function () {
//        option1.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
//        option2.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
//        option3.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        option1.series[0].data[0].value = ITILData.SystemAvailability;
        option1.series[0].axisLine.lineStyle.color = getGaugeColor(option1.series[0].data[0].value);

        option2.series[0].data[0].value = ITILData.EventResolutionRate;
        option2.series[0].axisLine.lineStyle.color = getGaugeColor(option2.series[0].data[0].value);

        option3.series[0].data[0].value = ITILData.EventQuantity;
        option3.series[0].axisLine.lineStyle.color = getGaugeColor3(option3.series[0].data[0].value);
        left_1_1_Chart.setOption(option1, true);
        left_1_2_Chart.setOption(option2, true);
        left_1_3_Chart.setOption(option3, true);
        // console.log("doing!");
    },2000);

    function getGaugeColor(n){
        var colorStr = '';
        if (n <= 20){
            colorStr = '#ff3530';//red
        }else if(n > 20 && n <= 80){
            colorStr = '#46aaff';//blue
        }else if( n > 80){
            colorStr = '#17ff84';//green
        }

        return [[n/100,colorStr],[1,'#373a6a']];
    }

    function getGaugeColor3(n){
        var colorStr = '';
        if (n <= 2){
            colorStr = '#17ff84';//green
        }else if(n > 2 && n <= 4){
            colorStr = '#46aaff';//blue
        }else if( n > 4){
            colorStr = '#ff3530';//red
        }

        return [[n/10,colorStr],[1,'#373a6a']];
    }
};


