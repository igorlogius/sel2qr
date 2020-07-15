
var conPort = browser.runtime.connect({name:"port-from-popup"});

async function onMessage(m) {

	try {

		let value = '';
		let noSelection = true;

		// Order
		if(typeof m === 'object') {
			for( b of ['selectionText', 'linkUrl', 'srcUrl', 'pageUrl' ]){
				if(typeof m[b] === 'string' && m[b].trim() !== ''){
					value = m[b].trim();
					noSelection = false;
					break;
				}
			}
		}
		if(noSelection === true){
			// Fallback to tab url
			let tabs = await browser.tabs.query({active: true, currentWindow: true});

			if(!Array.isArray(tabs)){ throw 'tabs is not an array'; }
			if(tabs.length < 1) { throw 'tabs length is less that 1'; }
			if(typeof tabs[0].url !== 'string') { throw 'tab url is not a string'; }

			value = tabs[0].url;
		}
		
		// clear previous selection
		await conPort.postMessage("clear");


		new QRious({
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

		//console.log('qr value', value);

	}catch(e){
		console.error(e);
	}

}

conPort.onMessage.addListener(onMessage);

