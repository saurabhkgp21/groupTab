var tabInfo = [];
var bkg = chrome.extension.getBackgroundPage();

var getTabsInfo = function getInfo(tabs){
	for (var i = 0; i < tabs.length; i++) {
		var link = document.createElement('a')
		link.href = tabs[i].url;
		var currURL = link.hostname;
		var index = -1;
		for(var j=0;j<tabInfo.length;j++){
			if(tabInfo[j].url == currURL){
				index = j;
				break;
			}
		}
		if(index!=-1){
			tabInfo[index]['tab'].push(tabs[i]['id']);
		}
		else{
			tabInfo.push({
				'url': currURL,
				'tab': [tabs[i]['id']],
			})
		}
	}
	var currIndex = 0;
	for(var i=0;i<tabInfo.length;i++){
		for(var j=0;j<tabInfo[i]['tab'].length;j++){
			chrome.tabs.move(tabInfo[i]['tab'][j],{index:currIndex});
			bkg.console.log(tabInfo[i]['url'],currIndex);
			currIndex++;
		}
	}
}

chrome.tabs.getAllInWindow(callback=getTabsInfo);