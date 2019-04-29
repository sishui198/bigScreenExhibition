/**
 * Created by 冯乐 on 2018/6/25.
 * 系统运维管理指标  右仪表盘
 */
var right_1_dashboard = function () {
    var option1 = {
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
            color: '#467172'
        },
        series: [
            {
                name: '',
                type: 'gauge',
                center: ["50%", "45%"], // 仪表位置
                radius: "90%", //仪表大小
                title:{
                    //   show: false,
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
                data: [{value: 0, name: '变更成功\n执行率'}]
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
            color: '#467172'
        },
        series: [
            {
                name: '',
                type: 'gauge',
                center: ["50%", "45%"], // 仪表位置
                radius: "90%", //仪表大小
                title:{
                    //   show: false,
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
                data: [{value: 0, name: '自动化\n执行率'}]
            }
        ]
    };

    var option3 = {
//        tooltip : {
//            formatter: "{a}{b} : {c}%"
//        },
        toolbox: {
            feature: {
                // restore: {},
                // saveAsImage: {}
            }
        },
        textStyle: {
            color: '#467172'
        },
        series: [
            {
                name: '',
                type: 'gauge',
                center: ["50%", "45%"], // 仪表位置
                radius: "90%", //仪表大小
                title:{
                    //   show: false,
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
                       // color:[[1,'#373a6a']],
                        color:[[1,'#999999']],
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
                    formatter:'--',
                    // formatter:'',
                    textStyle: {
                        fontSize: 30
                    },
                    offsetCenter:[0, '0%']
                },
                data: [{value: [''], name: '故障\n自愈率'}]
            }
        ]
    };

    var right_1_1_Chart = echarts.init(document.getElementById('right-1-1'));
    var right_1_2_Chart = echarts.init(document.getElementById('right-1-2'));
    var right_1_3_Chart = echarts.init(document.getElementById('right-1-3'));
    // console.log("echarts.init() done!");
     var ipr1 = 'http://102.200.192.249:5080';
    
    setInterval(function () {
//        option1.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
//        option2.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
//        option3.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
 
       option1.series[0].data[0].value = ITILData.SuccessfulChange;
        option1.series[0].axisLine.lineStyle.color = getGaugeColor(option1.series[0].data[0].value);

        option2.series[0].data[0].value = ITILData.AutomatedExecution;
        option2.series[0].axisLine.lineStyle.color = getGaugeColor(option2.series[0].data[0].value);

//        option3.series[0].data[0].value = null;
       // option3.series[0].axisLine.lineStyle.color = getGaugeColor(option3.series[0].data[0].value);
       
	 // getr1_3Data(ipr1);

        right_1_1_Chart.setOption(option1, true);
        right_1_2_Chart.setOption(option2, true);
        right_1_3_Chart.setOption(option3, true);
 
       // console.log("doing!");
    },2000);

    //李朋飞ip
    // var ipr1 = 'http://192.168.1.101:5080';

    //操作间ip
//    var ipr1 = 'http://102.200.192.249:5080';
//    getr1_3Data(ipr1);
//    setInterval(function () {
//        getr1_3Data(ipr1);
//    },3600000);
    
    function getr1_3Data(ip) {
        $.ajax({
            url: ip + '/bigScreen/indicator?id=12',
            type: 'get',
            success:function(response){
                console.log(response);
                // var data = JSON.parse(response);
                var data = response.Content;
                console.log(data);
                //处理信息方法
                option3.series[0].data[0].value = (parseFloat(data.percent) * 100).toFixed(2);
		option3.series[0].axisLine.lineStyle.color = getGaugeColor(option3.series[0].data[0].value);
               
 //
                right_1_3_Chart.setOption(option3, true);
                // console.log("doing!");

            },
            error:function(){

            }
        });
    }

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


};
