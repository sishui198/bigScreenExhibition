
var mqtt    = require('mqtt');
var client  = mqtt.connect('tcp://103.160.65.89:1883',{
    username: 'hxb',
    password: 'hxb'
});

client.on('connect', function () {
	 console.log("connect!");
    client.subscribe('ITIL/DB/performance/SystemEvent', function (message,err) {
		console.log("subscribe.");
        if (!err) {
            console.log(message);
        }else{
            console.log(err);
        }
    })
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    //client.end()
    //update  the   ITILData.tradeArr[];
    center_1_trades();
});