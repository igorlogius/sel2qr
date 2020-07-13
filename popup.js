
var conPort = browser.runtime.connect({name:"port-from-popup"});

conPort.onMessage.addListener( async  function(m) {

	//console.log("popup.js received message background.js");

	let value = '';
	let noSelection = true;

	// Order
	if(typeof m === 'object') {
		for( b of ['selectionText', 'linkUrl', 'srcUrl', 'pageUrl' ]){
			if(typeof m[b] === 'string' && m[b].trim() !== ''){
				value = m[b].trim();
				//console.log(b,value);
				noSelection = false;
				break;
			}
		}
	}
	if(noSelection === true){
		// Fallback to tab url
		let tabs = await browser.tabs.query({active: true, currentWindow: true});
		value = tabs[0].url;
	}

	//console.log('qr value', value);
	
	var qr = new QRious({
		background: "white",
		backgroundAlpha: 1.0,
		element: document.getElementById('qr'),
		foreground: "black",
		foregroundAlpha: 1.0,
		level: "L",
		mime: "image/png",
		size: window.innerWidth,
		value: value
	});

	// clear previous selection
	conPort.postMessage("clear");

});

