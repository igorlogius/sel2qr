
const extId = 'sel2qr';

let clickDataStore;

function connected(p) {
	p.onMessage.addListener(async function(m) {
		try {
			console.log(m,JSON.stringify(clickDataStore,null,4));
			if(typeof clickDataStore === 'undefined') {
				const selobj = await browser.tabs.executeScript({code: `window.getSelection().toString()`});
				console.log(JSON.stringify(selobj));
				//if(typeof selobj[0] === 'string' && selboj[0] !== '') { 
					p.postMessage({"src": "pageAction", "data" : selobj[0]});
				//}
			}else{
				p.postMessage(clickDataStore);
				clickDataStore = undefined
			}

		}catch(e) {
			console.error(e);
		}
	});

}

function onMenuClicked(clickData, tab) { 

	try {
		browser.pageAction.openPopup();
		if (typeof clickData.menuItemId === 'string' 
			&& clickData.menuItemId == extId) {
			clickDataStore = {"src": "menu", "data": clickData};
		}
	}catch(e){
		console.error(e);
	}

}

browser.menus.create({   
	id: extId,
	title: "Selection to QRCode",
	documentUrlPatterns: [ "<all_urls>" ],
	contexts: ["page", "link", "image", "editable", "selection"],
});

browser.menus.onClicked.addListener(onMenuClicked); 
browser.runtime.onConnect.addListener(connected);

