/**
 * Created by 冯乐 on 2018/6/25.
 */
var initScreen = function () {
    // console.log("ready...");
    // var hgt = document.body.clientHeight * 0.93;
    // console.log(hgt);
    // var panelHgt = 0.28 * hgt ;
    // var modalBodyHgt = panelHgt * 0.8 ;
    var modalBodyWth = $(".modal-body").width();
    //仪表盘
    var gaugeHgt = modalBodyHgt * 0.9 ;
    var gaugeWth = $(".modal-body").width() * 0.3 ;

    $(".panelGauge .gauge").height(gaugeHgt);
    $(".panelGauge .gauge").width(gaugeWth);


    //center 2 事件类型分析  饼状图 and 柱状图
    $("#center-2-1").width( modalBodyWth * 0.3);
    $("#center-2-1").height(modalBodyHgt );
    $("#center-2-2").width(modalBodyWth * 0.68);
    $("#center-2-2").height(modalBodyHgt );

    $(".panel ").height(panelHgt);
    $(".panel .modal-body").height(modalBodyHgt);

    //center-1 背板  总高
    var panelCoreHgt = panelHgt * 2 + parseFloat($(".panel").css("margin-bottom")) ;
    // var panelCoreHgt = parseFloat($("#main").height()) -  panelHgt
    //                    - parseFloat($("#main").css("padding-top"))
    //                    - parseFloat($(".panel").css("margin-top"))
    //                    - parseFloat($(".panel").css("margin-bottom"))*2 ;
    // console.log(panelCoreHgt , hgt , parseFloat($("#main").height()) ,  panelHgt ,
    //         parseInt($(".panel").css("margin-top")) , parseInt($(".panel").css("margin-bottom")));
    $(".panelCore").height( panelCoreHgt );

    //中国地图背板
    $("#center-1").height( panelCoreHgt * 0.8);

    // console.log( $(".panelGauge .gauge").height(), $(".panelGauge .gauge").width());

    left_1_dashboard();
    right_1_dashboard();
    left_2_Overall_IndexAnalysis();
    right_2_ImplementationRate();
    center_1_CoreTrading();
    center_1_trades();
    left_3_ChangeType();
    center_2_EventType();
    // center_2_EventType_bar();
    right_3_ResolveRate_SelfHealingRate();
};

$(function () {
    //仪表盘
    var gaugeHgt = $("#l1").height() ;
    var gaugeWth = $("#l1").width() * 0.3 ;
    $(".panelGauge .gauge").height(gaugeHgt);
    $(".panelGauge .gauge").width(gaugeWth);

    //
    // $(".panel ").height(panelHgt);
    // $(".panel .modal-body").height(modalBodyHgt);

    //center 2 事件类型分析  饼状图 and 柱状图
    $("#center-2-1").width( $("#c2").width() * 0.3);
    $("#center-2-1").height($("#c2").height());
    $("#center-2-2").width($("#c2").width() * 0.65);
    $("#center-2-2").height($("#c2").height() );

    //center-1 背板  总高
    // var panelCoreHgt = panelHgt * 2 + parseFloat($(".panel").css("margin-bottom")) ;
    // $(".panelCore").height( panelCoreHgt );

    //中国地图背板
    $("#center-1").height( $("#c1").height());
    $("#center-1").width($("#c1").width()) ;

    // initScreen();
    left_1_dashboard();
    right_1_dashboard();
    left_2_Overall_IndexAnalysis();
    right_2_ImplementationRate();
    center_1_CoreTrading();
    center_1_trades();
    left_3_ChangeType();
    center_2_EventType();
    // center_2_EventType_bar();
    right_3_ResolveRate_SelfHealingRate();
});

window.onresize = function () {
    // initScreen();
};

//获取月份
    function getLast12Months () {
        var today = new Date();
        // var Last12Months = [];  

        for (var i = 0; i < 12; i++) {
            var lastMonth = today.setMonth(today.getMonth() - 1);

            ITILData.Last12Months[11-i] = today.getFullYear() + '年' + (Number(today.getMonth()) + 1) + "月";
        }

        // return Last12Months;
        
    };

//mqtt队列

//restAPI
var ITILData = {
    Last12Months: [] ,
    tradeArr: [
                //核心交易放第一
                        {sysname: '核心系统', value: '0'},
                        {sysname: 'E商宝',    value: '0'},
                        {sysname: '网上银行', value: '0'},
                        {sysname: '手机银行', value: '0'},
                        {sysname: '柜面系统', value: '0'},
                        {sysname: '超级网银', value: '0'},
                        {sysname: '其他',     value: '0'}
                        //{sysname: 'P2P', value: '0'},
                        //{sysname: '网联交易量', value: '0'}  
              ],//核心22，E商宝17、网银1、手机银行5、柜面4、超级网银12、其他19、P2P、网联交易量
    SystemAvailability:  null , //重要信息系统可用率  left1
    EventResolutionRate: null , //事件按时解决率
    EventQuantity:       null , //AB级事件数量

    IndicatorAnaysis:  [] ,  //系统运行整体指标  left2

    ChangeAnaysis: [] ,   //变更类型统计  left3

    EventTypeAnaysis: []  ,  // 事件类型统计center2

    SuccessfulChange:  null , //变更成功执行率     right1
    AutomatedExecution:null , //自动化执行率 production\remote\widecity
                              //故障自愈率

    ManageNormInfo: [] , //自动化执行率(统计)right 2
    SuccessfulChangeAnaysis: [],                 //变更成功执行率（统计）
    EventResolutionRateAnaysis: []
                                 //事件解决率 right3
                                 //故障自愈率
};
//console.log(ITILData);
//交易量信息
    if("WebSocket" in window){
            console.log("浏览器支持WebSocket");

            var ws = new WebSocket("ws://102.200.192.249:5080/bigScreen/message");
            console.log(ws.readyState);
            switch(ws.readyState){
                case 0: console.log("尚未建立连接！");
                        break;
            }

            ws.onopen = function(){
                console.log("已建立连接！");
            };

            ws.onmessage = function(response){
                var data = response.data;
                //console.log(typeof(data));
                //console.log(data);
                var dataObj = eval('(' + data + ')');
                //console.log(typeof(dataObj));
                console.log("WebSocket接收交易量信息：");
                console.log(dataObj);
                //核心22，E商宝17、网银1、手机银行5、柜面4、超级网银12、其他19、P2P、网联交易量
                if(dataObj.sysid == 22){
                    ITILData.tradeArr[0].value =  dataObj.trade_total + '';
                    console.log(dataObj.sysid + "核心：" + ITILData.tradeArr[0].value);
                    center_1_trades(ITILData.tradeArr);
                }else if(dataObj.sysid == 17){
                    ITILData.tradeArr[1].value =  dataObj.trade_total;
                    //console.log(typeof(dataObj.trade_total));
                    console.log(dataObj.sysid + "E商宝：" + ITILData.tradeArr[1].value);
                    center_1_trades(ITILData.tradeArr);
                }else if(dataObj.sysid == 1){
                    ITILData.tradeArr[2].value =  dataObj.trade_total;
                    console.log(dataObj.sysid + "网银：" + ITILData.tradeArr[2].value);
                    center_1_trades(ITILData.tradeArr);
                }else if(dataObj.sysid == 5){
                    ITILData.tradeArr[3].value =  dataObj.trade_total;
                    console.log(dataObj.sysid + "手机银行：" + ITILData.tradeArr[3].value);
                    center_1_trades(ITILData.tradeArr);
                }else if(dataObj.sysid == 4){
                    ITILData.tradeArr[4].value =  dataObj.trade_total;
                    console.log(dataObj.sysid + "柜面：" + ITILData.tradeArr[4].value);
                    center_1_trades(ITILData.tradeArr);
                }else if(dataObj.sysid == 12){
                    ITILData.tradeArr[5].value =  dataObj.trade_total;
                    console.log(dataObj.sysid + "超级网银：" + ITILData.tradeArr[5].value);
                    center_1_trades(ITILData.tradeArr);
                }
                /*
                else if(dataObj.sysid == 19){
                    ITILData.tradeArr[6].value =  dataObj.trade_total;
                    center_1_trades(ITILData.tradeArr);
                }
                */
                /*
                else if(dataObj.sysid == 0){
                    ITILData.tradeArr[7].value =  dataObj.trade_total;
                }else if(dataObj.sysid == 0){
                    ITILData.tradeArr[8].value =  dataObj.trade_total;
                }
                */
               
                
            };

            ws.onclose = function(){
                console.log("The connection is closed!");
            }

            ws.onerror = function(response){
                console.log(response);
            }
        }else{
            console.log("浏览器不支持WebSocket");
        }
    

getITILData();
setInterval(function () {
       getITILData();
},60000);

function getITILData(){
    //获取月份
    var today = new Date(); 
    ITILData.Last12Months = [];
    for (var i = 0; i < 12; i++) {
  //       var lastMonth = today.setMonth(today.getMonth() - 1);
  //       //console.log(today.getMonth() - 1);
  //       //console.log(lastMonth);
		// var mon = Number(today.getMonth());
		// mon == 0 ? mon = 12 : mon ; 
  //       ITILData.Last12Months[11-i] = today.getFullYear() + '年' + mon + "月";
  //       //console.log(ITILData.Last12Months[11-i]);
        var lastMonth = today.setMonth(today.getMonth() - 1);

        ITILData.Last12Months[11-i] = (today.getFullYear()+'').slice(2) + '-' + (Number(today.getMonth()) + 1) + "";
    };

    //ITTL运维data
    $.ajax({

        //生产
         //url: 'http://102.150.5.19:90/Api/Flow/BaseFlowSyncData',
        //测试
        // url: 'http://103.160.183.72:90/Api/Flow/BaseFlowSyncData',
        url: 'http://102.200.192.249:5080/bigScreen/itil',
        type: 'get',
        // header:
        //dataType: 'jsonp',
        //data: {"TableID":"21"},
        success: function(response) {
            console.log(response);
            if(response.StatusCode == 200){

                console.log(response.Message);
                var ITILData_Data = JSON.parse(response.Data);
                console.log("Data:");
                console.log(ITILData_Data);

                for(var i = 0 ;i < ITILData_Data.length ;i++){
                    //console.log("ready  no" + i);
                    if(ITILData_Data[i].ID == '1'){
                        //left1  "SystemAvailability"  "重要信息系统可用率"
                        var SystemAvailability = JSON.parse(ITILData_Data[i].Content);
                        console.log("重要信息系统可用率:(ID=" + ITILData_Data[i].ID + ")" );
                        console.log(SystemAvailability);
                        ITILData.SystemAvailability = (parseFloat(SystemAvailability.percent) * 100).toFixed(2);

                    }else if(ITILData_Data[i].ID == '2'){
                        // left1 "EventResolutionRate"  "事件按时解决率"
                        var EventResolutionRate = JSON.parse(ITILData_Data[i].Content);
                        console.log("事件按时解决率:(ID=" + ITILData_Data[i].ID + ")");
                        console.log(EventResolutionRate);
                        ITILData.EventResolutionRate = (parseFloat(EventResolutionRate.percent) * 100).toFixed(2);

                    }else if(ITILData_Data[i].ID == '3'){
                        //left1  "EventQuantity" "AB级事件数量"
                        var EventQuantity = JSON.parse(ITILData_Data[i].Content);
                        console.log("AB级事件数量:(ID=" + ITILData_Data[i].ID + ")");
                        console.log(EventQuantity);
                        ITILData.EventQuantity = parseFloat(EventQuantity.eventA) + parseFloat(EventQuantity.eventB);

                    }else if(ITILData_Data[i].ID == '7'){
                        //console.log("10!!!!!!!!!!!!!!!!!");
                        //left2  "IndicatorAnaysis"  "系统运行整体指标"
                        var IndicatorAnaysis = JSON.parse(ITILData_Data[i].Content);
                        console.log("系统运行整体指标:(ID=" + ITILData_Data[i].ID + ")");
                        console.log(IndicatorAnaysis);
                        // console.log();
                        var IndicatorAnaysis_changeTotal = JSON.parse(IndicatorAnaysis.changeTotal) ,
                            IndicatorAnaysis_eventTotal  = JSON.parse(IndicatorAnaysis.eventTotal) ,
                            IndicatorAnaysis_problemTotal= JSON.parse(IndicatorAnaysis.problemTotal) ,

                            IndicatorAnaysis_changeTotal_zsArr = [],
                            IndicatorAnaysis_eventTotal_zsArr = [],
                            IndicatorAnaysis_problemTotal_zsArr = [];
                        for (var j = 0; j < IndicatorAnaysis_changeTotal.length; j++) {
                            
                            IndicatorAnaysis_changeTotal_zsArr.push(parseInt(IndicatorAnaysis_changeTotal[j].zs));
                        }

                        for (var j = 0; j < IndicatorAnaysis_eventTotal.length; j++) {
                            
                            IndicatorAnaysis_eventTotal_zsArr.push(parseInt(IndicatorAnaysis_eventTotal[j].zs));
                        }

                        for (var j = 0; j < IndicatorAnaysis_problemTotal.length; j++) {
                            
                            IndicatorAnaysis_problemTotal_zsArr.push(parseInt(IndicatorAnaysis_problemTotal[j].zs));
                        }
                        //顺序为  事件、问题、变更
                        ITILData.IndicatorAnaysis.push(IndicatorAnaysis_eventTotal_zsArr,IndicatorAnaysis_problemTotal_zsArr,IndicatorAnaysis_changeTotal_zsArr);
                        //console.log(ITILData.IndicatorAnaysis);
                        //console.log(typeof(ITILData.IndicatorAnaysis));
                        //console.log(ITILData.IndicatorAnaysis[1]);

                    }else if(ITILData_Data[i].ID == '6'){
                        //left3  "ChangeAnaysis"  "变更类型统计"
                        var ChangeAnaysis = JSON.parse(ITILData_Data[i].Content);
                        console.log("变更类型统计:(ID=" + ITILData_Data[i].ID + ")");
                        console.log(ChangeAnaysis);

                        var ChangeAnaysis_agileChange = JSON.parse(ChangeAnaysis.agileChange) ,
                            ChangeAnaysis_ordinaryChange = JSON.parse(ChangeAnaysis.ordinaryChange) ,
                            ChangeAnaysis_standardChange= JSON.parse(ChangeAnaysis.standardChange) ,
                            ChangeAnaysis_urgentChange = JSON.parse(ChangeAnaysis.urgentChange) ,

                            ChangeAnaysis_agileChange_zsArr = [],
                            ChangeAnaysis_ordinaryChange_zsArr = [],
                            ChangeAnaysis_standardChange_zsArr = [],
                            ChangeAnaysis_urgentChange_zsArr = [];

                        for (var j = 0; j < ChangeAnaysis_agileChange.length; j++) {
                            
                            ChangeAnaysis_agileChange_zsArr.push(parseInt(ChangeAnaysis_agileChange[j].zs));
                        }
                            
                        for (var j = 0; j < ChangeAnaysis_ordinaryChange.length; j++) {
                            
                            ChangeAnaysis_ordinaryChange_zsArr.push(parseInt(ChangeAnaysis_ordinaryChange[j].zs));
                        }

                        for (var j = 0; j < ChangeAnaysis_standardChange.length; j++) {
                            
                            ChangeAnaysis_standardChange_zsArr.push(parseInt(ChangeAnaysis_standardChange[j].zs));
                        }

                        for (var j = 0; j < ChangeAnaysis_urgentChange.length; j++) {
                            
                            ChangeAnaysis_urgentChange_zsArr.push(parseInt(ChangeAnaysis_urgentChange[j].zs));
                        }

                        // //顺序为  普通变更 标准变更  敏捷变更  紧急变更
                        ITILData.ChangeAnaysis.push(ChangeAnaysis_agileChange_zsArr,ChangeAnaysis_ordinaryChange_zsArr,ChangeAnaysis_standardChange_zsArr,ChangeAnaysis_urgentChange_zsArr);
                        //console.log(i);

                    }else if(ITILData_Data[i].ID == '8'){
                        //center2  "EventTypeAnaysis"  "事件类型统计"
                        var EventTypeAnaysis = JSON.parse(ITILData_Data[i].Content);
                        console.log("事件类型统计:(ID=" + ITILData_Data[i].ID + ")");
                        console.log(EventTypeAnaysis);

                        //查询、交易超时、系统资源、线路、硬件设备、建议
                        var EventTypeAnaysis_alarm_warnEvent = JSON.parse(EventTypeAnaysis.alarm.warnEvent) ,

                            EventTypeAnaysis_complain_suggestEvent = JSON.parse(EventTypeAnaysis.complain.suggestEvent) ,

                            EventTypeAnaysis_serviceRequest_operateEvent = JSON.parse(EventTypeAnaysis.serviceRequest.operateEvent) ,
                            EventTypeAnaysis_serviceRequest_queryEvent = JSON.parse(EventTypeAnaysis.serviceRequest.queryEvent) ,

                            EventTypeAnaysis_breakDown_baseFacilityEvent = JSON.parse(EventTypeAnaysis.breakDown.baseFacilityEvent) ,
                            EventTypeAnaysis_breakDown_dataSafeEvent = JSON.parse(EventTypeAnaysis.breakDown.dataSafeEvent) ,
                            EventTypeAnaysis_breakDown_errorOperateEvent = JSON.parse(EventTypeAnaysis.breakDown.errorOperateEvent) ,
                            EventTypeAnaysis_breakDown_natureDisasterEvent = JSON.parse(EventTypeAnaysis.breakDown.natureDisasterEvent) ,
                            EventTypeAnaysis_breakDown_netWorkEvent = JSON.parse(EventTypeAnaysis.breakDown.netWorkEvent) ,
                            EventTypeAnaysis_breakDown_systemEvent = JSON.parse(EventTypeAnaysis.breakDown.systemEvent) ,
                            EventTypeAnaysis_breakDown_virusBreakOutEvent = JSON.parse(EventTypeAnaysis.breakDown.virusBreakOutEvent) ;

                        ITILData.EventTypeAnaysis = [] ;
                        for (var j = 0; j < 12; j++) {
                            
                            ITILData.EventTypeAnaysis.push(
                                    [
                                        EventTypeAnaysis_alarm_warnEvent[j].zs,//告警类

                                        EventTypeAnaysis_complain_suggestEvent[j].zs,//投诉建议

                                        EventTypeAnaysis_serviceRequest_operateEvent[j].zs,//服务请求
                                        EventTypeAnaysis_serviceRequest_queryEvent[j].zs,

                                        EventTypeAnaysis_breakDown_baseFacilityEvent[j].zs,//故障类
                                        EventTypeAnaysis_breakDown_dataSafeEvent[j].zs,
                                        EventTypeAnaysis_breakDown_errorOperateEvent[j].zs,
                                        EventTypeAnaysis_breakDown_natureDisasterEvent[j].zs,
                                        EventTypeAnaysis_breakDown_netWorkEvent[j].zs,
                                        EventTypeAnaysis_breakDown_systemEvent[j].zs,
                                        EventTypeAnaysis_breakDown_virusBreakOutEvent[j].zs
                                    ]
                                );
                        }

                        console.log(ITILData.EventTypeAnaysis);

                    }else if(ITILData_Data[i].ID == '4'){
                        //right  "SuccessfulChange"  "变更成功执行率"
                        var SuccessfulChange = JSON.parse(ITILData_Data[i].Content);
                        console.log("变更成功执行率:(ID=" + ITILData_Data[i].ID + ")");
                        console.log(SuccessfulChange);
                        ITILData.SuccessfulChange = (parseFloat(SuccessfulChange.percent) * 100).toFixed(2) ;

                    }else if(ITILData_Data[i].ID == '5'){
                        //right  "AutomatedExecution"  ""自动化执行率""
                        var AutomatedExecution = JSON.parse(ITILData_Data[i].Content);
                        console.log("自动化执行率:(ID=" + ITILData_Data[i].ID + ")");
                        console.log(AutomatedExecution);
                        ITILData.AutomatedExecution = (parseFloat(AutomatedExecution.production) * 100).toFixed(2)

                    }else if(ITILData_Data[i].ID == '9'){
                        //right "ManageNormInfo" "自动化执行率统计"
                        var ManageNormInfo = JSON.parse(ITILData_Data[i].Content);
                        console.log("自动化执行率统计:(ID=" + ITILData_Data[i].ID + ")");
                        console.log(ManageNormInfo);
                        
                        
                        var ManageNormInfo_production;
                            ManageNormInfo.production == "" ?  ManageNormInfo_production = []: ManageNormInfo_production = JSON.parse(ManageNormInfo.production);
                        var ManageNormInfo_remote;
                            ManageNormInfo.remote == "" ? ManageNormInfo_remote = []:ManageNormInfo_remote = JSON.parse(ManageNormInfo.remote);
                        var ManageNormInfo_widecity;
                            ManageNormInfo.widecity == "" ? ManageNormInfo_widecity = [] : ManageNormInfo_widecity = JSON.parse(ManageNormInfo.widecity);

			console.log( ManageNormInfo_production);
                        var ManageNormInfo_production_zsArr = [];
                        var ManageNormInfo_remote_zsArr = [];
                        var ManageNormInfo_widecity_zsArr = [];
                            
                        for (var j = 0; j < ManageNormInfo_production.length; j++) {
                            
                            ManageNormInfo_production_zsArr.push((parseFloat(ManageNormInfo_production[j].zs) *100).toFixed(2));
                        }

                        for (var k = 0; k < ManageNormInfo_remote.length; k++) {
                            
                            ManageNormInfo_remote_zsArr.push((parseFloat(ManageNormInfo_remote[k].zs)*100).toFixed(2));
                        }

                        for (var l = 0; l < ManageNormInfo_widecity.length; l++) {
                            
                            ManageNormInfo_widecity_zsArr.push((parseFloat(ManageNormInfo_widecity[l].zs)*100).toFixed(2));
                        }
			console.log(ManageNormInfo_production_zsArr);
                        // //顺序为 生产、异地、同城
                        ITILData.ManageNormInfo = [];
                        ITILData.ManageNormInfo.push(ManageNormInfo_production_zsArr,ManageNormInfo_remote_zsArr,ManageNormInfo_widecity_zsArr);
			console.log( ITILData.ManageNormInfo);
                    }else if(ITILData_Data[i].ID == '10'){
                        //right2 ""SuccessfulChangeAnaysis"" ""变更成功执行率统计""
                        var SuccessfulChangeAnaysis = JSON.parse(ITILData_Data[i].Content);
                        console.log("变更成功执行率统计:(ID=" + ITILData_Data[i].ID + ")");
                        console.log(SuccessfulChangeAnaysis);
                        
                        var SuccessfulChangeAnaysis_arr = JSON.parse(SuccessfulChangeAnaysis.monthTotal) ;
                            
                        ITILData.SuccessfulChangeAnaysis = [] ;
                        for (var j = 0; j < SuccessfulChangeAnaysis_arr.length; j++) {
                            
                            ITILData.SuccessfulChangeAnaysis.push((parseFloat(SuccessfulChangeAnaysis_arr[j].zs) * 100).toFixed(2));
                        }

                    }else if(ITILData_Data[i].ID == '11'){
                        //right3 ""EventResolutionRateAnaysis"" ""事件按时解决率统计""
                        var EventResolutionRateAnaysis = JSON.parse(ITILData_Data[i].Content);
                        console.log("事件按时解决率统计:(ID=" + ITILData_Data[i].ID + ")");
                        console.log(EventResolutionRateAnaysis);
                        
                        var EventResolutionRateAnaysis_arr = JSON.parse(EventResolutionRateAnaysis.monthTotal) ;
                            
                        ITILData.EventResolutionRateAnaysis = [] ;
                        for (var j = 0; j < SuccessfulChangeAnaysis_arr.length; j++) {
                            console.log(EventResolutionRateAnaysis_arr[j].zs);
                            ITILData.EventResolutionRateAnaysis.push((parseFloat(EventResolutionRateAnaysis_arr[j].zs) * 100 ).toFixed(2));
                        }

                    }else{
                        console.log("未使用数据项:(ID=" + ITILData_Data[i].ID + ")");
                        console.log(ITILData_Data[i]);
                    }
                    //console.log("ITILData_Data.length:" + ITILData_Data.length);
                }
                    //console.log("end");
            }else{
                console.log("statuCode!=200!connected but defeat!");
            }
        },
        error: function(errorMessage) {
            console.log(errorMessage);
        }
    });
    
    
}
