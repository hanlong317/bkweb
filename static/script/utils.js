/* utils v3.2 */

(function () {
	var _ = {};

	//打开最大窗口
	_.openMaximizeWindow = function (url) {
		if (url === undefined) {
			alert('url is null....');
			return;
		}
		var option = "height=3600,width=3600,left=0,top=0,resizable=yes,scrollbars=yes";
		var newWindow = window.open(url, "", option);
		try {
			newWindow.moveTo(0, 0);
			newWindow.resizeTo(screen.availWidth, screen.availHeight);
		}
		catch (ex) {
		}
	};

	_.openWindow = function (url, options) {
		if (url === undefined) {
			alert('url is null....');
			return;
		}
		var _availSize =
			{
				width: screen.availWidth,
				height: screen.availHeight
			};

		if (_.windowHandle && !_.windowHandle.closed) {
			_.windowHandle.close();
		}

		var _height = options.height || 0;
		var _width = options.width || 0;
		var _left = options.left || (parseInt(_availSize.width) - _width) / 2;
		var _top = options.top || (parseInt(_availSize.height) - _height) / 2;
		var _resizable = options.resizable || "no";
		var _scrollbars = options.scrollbars || "no";

		var _options = "height=" + _height + ",width=" + _width + ",left=" + _left
			+ ",top=" + _top + ",resizable=" + _resizable + ",scrollbars=" + _scrollbars;

		window.focus && window.focus();
		_.windowHandle = window.open(url, "", _options);
	};

	_.appendFromURL = function (url) {
		var _newUrl = "";
		if (url.indexOf("?") > -1) {
			_newUrl = url + "&fromURL=" + encodeURIComponent(window.location.href);
		}
		else {
			_newUrl = url + "?fromURL=" + encodeURIComponent(window.location.href);
		}
		return _newUrl;
	};

	_.isDec2 = function (value) {
		return /^\d+(\.\d{1,2})?$/.test(value);
	};

	_.toOhterFixed = function (value) {
		value = value + '';
		if (value.indexOf('.') === -1) {
			return value += '.0'
		}
		return value;
	}

	_.formatFloat = function (fractionDigits, precision) {
		var _m = Math.pow(10, precision);
		return parseInt(fractionDigits * _m, 10) / _m;
	}

	_.getUrlParam = function (urlParam, key) {
		var paramMap = {};
		var params = urlParam.substring(1).split('&');
		for (var i = 0; i < params.length; i++) {
			var p = params[i].split('=');
			paramMap[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
		}

		return paramMap[key];
	}

	window['Utils'] = _;

})();