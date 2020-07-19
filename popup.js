
const extId = 'sel2qr';

// establish connection with background.js 
var conPort = browser.runtime.connect({name:"port-from-popup"});

// send open message to background.js to trigger onMessage 
conPort.postMessage("open");

async function onMessage(m) {

	let value = '';

	if ( typeof m === 'object') {
		//  1. text, 2. linkUrl (a) , 3. srcUrl (img)
		for(let b of ['selectionText', 'linkUrl', 'srcUrl' ]){
			if(typeof m[b] === 'string' && m[b].trim() !== ''){
				value = m[b].trim();
				break;
			}
		}

	} else if (typeof m === 'undefined') {
		let tabs = await browser.tabs.query({active: true, currentWindow: true});
		value = tabs[0].url;
	}

	if(value === ''){

		// close the popup window
		window.close();

		browser.notifications.create(extId, {
			"type": "basic",
			"iconUrl": browser.runtime.getURL("icon.png"),
			"title":  "Invalid Selection", 
			"message": "Hint: Try selecting a link (<a>), image (<img>) or some text"
		});

		return;
	}

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

}

conPort.onMessage.addListener(onMessage);


