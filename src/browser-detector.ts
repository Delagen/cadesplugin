declare var InstallTrigger: any;

//note: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769
export class BrowserDetector {
	static get isIOS(): boolean {
		return false;
	};

	static get isIE(): boolean {
		// Internet Explorer 6-11
		return /*@cc_on!@*/false || !!(<any> document).documentMode;
	}

	static get isEdge(): boolean {
		// Edge 20+
		return !BrowserDetector.isIE && !!(<any> window).StyleMedia;
	}

	static get isOpera(): boolean {
		// Opera 8.0+
		return (!!(<any> window).opr && !!(<any> window).opr.addons) || !!(<any> window).opera || navigator.userAgent.indexOf(" OPR/") >= 0;
	}

	static get isFirefox(): boolean {
		// Firefox 1.0+
		return typeof InstallTrigger !== "undefined";
	}

	static get isSafari(): boolean {
		// Safari 3.0+ "[object HTMLElementConstructor]"
		return /constructor/i.test((<any> window).HTMLElement) || ((!(<any> window).safari || (<any> window).safari.pushNotification).toString() === "[object SafariRemoteNotification]");
	}

	static get isChrome(): boolean {
		// Chrome 1 - 71
		return !!(<any> window).chrome && (!!(<any> window).chrome.webstore || !!(<any> window).chrome.runtime || !!navigator.plugins.namedItem("Chrome PDF Plugin"));
	}

	static get isBlink(): boolean {
		return (BrowserDetector.isChrome || BrowserDetector.isOpera) && !!(<any> window).CSS;
	}
}

// console.log(`isIE:${BrowserDetector.isIE}`);
// console.log(`isEdge:${BrowserDetector.isEdge}`);
// console.log(`isOpera:${BrowserDetector.isOpera}`);
// console.log(`isFirefox:${BrowserDetector.isFirefox}`);
// console.log(`isSafari:${BrowserDetector.isSafari}`);
// console.log(`isChrome:${BrowserDetector.isChrome}`);
// console.log(`isBlink:${BrowserDetector.isBlink}`);
