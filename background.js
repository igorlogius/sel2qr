
const extId = 'sel2qr';

let clickDataStore;

function connected(p) {
	p.onMessage.addListener(function(m) {
		p.postMessage(clickDataStore);
		clickDataStore = undefined
	});
}

function onMenuClicked(clickData, tab) { 
	browser.pageAction.openPopup();
	if (typeof clickData.menuItemId === 'string' 
		&& clickData.menuItemId == extId) {
		clickDataStore = clickData 
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

