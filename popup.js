
var conPort = browser.runtime.connect({name:"port-from-popup"});

// send message to background script to aquire selection 
conPort.postMessage("open");

async function onMessage(m) {

			let value = '';
			let noSelection = true;

	try {
		console.log(JSON.stringify(m));
		if(m['src'] === 'menu') {


			m = m['data'];

			console.log(typeof m);

			// Order
			if(typeof m === 'object') {
				for(let b of ['selectionText', 'linkUrl', 'srcUrl', 'pageUrl' ]){
					if(typeof m[b] === 'string' && m[b].trim() !== ''){
						value = m[b].trim();
						noSelection = false;
						console.log('value', value);
						break;
					}
				}
			}
			/*
			if(noSelection === true){
				// Fallback to tab url
				let tabs = await browser.tabs.query({active: true, currentWindow: true});

				if(!Array.isArray(tabs)){ throw 'tabs is not an array'; }
				if(tabs.length < 1) { throw 'tabs length is less that 1'; }
				if(typeof tabs[0].url !== 'string') { throw 'tab url is not a string'; }

				value = tabs[0].url;
			}*/
		}else if(m['src'] === 'pageAction') {

			value = m['data'].trim();

		}
		// clear previous selection


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

		console.log('qr value', value);

	}catch(e){
		console.error(e);
	}

}

conPort.onMessage.addListener(onMessage);

