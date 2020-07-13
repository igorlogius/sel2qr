
const extId = 'sel2qr';
let clickDataStore;

function connected(p) {
	p.postMessage(clickDataStore);
	p.onMessage.addListener(function(m) {
		if(m === 'clear') {
			delete clickDataStore;
			clickDataStore = undefined;
		}
	});
}

function onMenuClicked(clickData, tab) { 
	if (typeof clickData.menuItemId === 'string' 
		&& clickData.menuItemId == extId) {
		clickDataStore = clickData;
		browser.pageAction.openPopup();
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

