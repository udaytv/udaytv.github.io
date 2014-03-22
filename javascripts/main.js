var UTIL = (function($) {
	var util = {}, stream2vlc = "/sc2/stream2vlc.php";
	$("a.jlink").each(function(index, a) {
		var id = a.id;
		$.post(stream2vlc, {
			channelname: id,
			hoster: "justin"
		}).done(function(data) {
			console.log(data);
			if (data && data.responseText && data.responseText.length > 250) {
				var respTxt = data.responseText.substr(17);
				respTxt = respTxt.substr(0, respTxt.length - 2);
				console.log(id + " " + respTxt);
				$("a#" + id).eq("0").attr({
					"href": respTxt
				})
			}
		});

	});
}(jQuery));