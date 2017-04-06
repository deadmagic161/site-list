var dataJson = [];
var newDataJson = [];

var updateJson = function() {
	$.getJSON('http://www.softomate.net/ext/employees/list.json', function(data) {
		for (var i = 0; i < data.length; i++){
			dataJson[i] = data[i];
		}
	});
}

var newDataJsonItem = function (site, flag, counter){
	this.site = site;
	this.flag = flag;
	this.counter = counter;
}

updateJson();

setInterval(updateJson, 3600000);

setTimeout(function(){
	for (var i = 0; i < dataJson.length; i++){
		newDataJson[i] = new newDataJsonItem(dataJson[i], false, 0);
	}
}, 2500);

chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(message) {
		for (var i = 0; i < newDataJson.length; i++){
			if(message.site == 'www.' +newDataJson.site.domain){
				newDataJson[i].counter++;
				if (message.flag){
					newDataJson[i].flag = true;
				}
				else if ((newDataJson[i].counter <= 6)&&(!newDataJson[i].flag)){
					port.postMessage(newDataJson[i].site.message);
				}
			}
		}
	});
});