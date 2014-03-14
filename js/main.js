console.log("!!!!");
(function (kala, $, undefined) {

	console.log(kala);

	
	//Function to convert hex format to a rgb color
	kala.math = {
		hexDigits: new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"),
		toHex: function (x) {
			return isNaN(x) ? "00" : kala.math.hexDigits[(x - x % 16) / 16] + kala.math.hexDigits[x % 16];
		},
		rgbToHex: function (rgb) {
			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			return "#" + kala.math.toHex(rgb[1]) + kala.math.toHex(rgb[2]) + kala.math.toHex(rgb[3]);
		}
	};



	kala.copyToClipboard = function (aString) {
	  window.prompt("Copy to clipboard: Ctrl+C, Enter", aString);
	};

	var makeColorsCopyToClipBoard = function () {
		$(".color-guide li").each(function () {
			var colorElement = $(this);
			var color = colorElement.css("background-color");
			console.log(color);
			colorElement.on("click", function () {
				kala.copyToClipboard(kala.math.rgbToHex(color));
			});
		});
	};

	var watchScroll = function () {
		$("body").scrollspy({ target: "#header" });
	};

	document.addEventListener("DOMContentLoaded", function () {
		console.log("!!!!");
		makeColorsCopyToClipBoard();
		watchScroll();
	});

})(window.kala = window.kala || {}, jQuery);



