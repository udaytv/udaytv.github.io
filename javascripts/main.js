var UTIL = (function(util, $) {
	var stream2vlc = "/sc2/stream2vlc.php";

	function findFirst(obj) {
		for (var key in obj) {
			return obj[key];
		}
	}
	util.load = function() {
		$("a.jlink").each(function(index, a) {
			var id = a.id;
			$.post(stream2vlc, {
				channelname: id,
				hoster: "justin"
			}).done(function(data) {
				console.log(data);
				if (data && data.length > 250) {
					var url = findFirst($.parseJSON(data));
					console.log(id + "---" + url);
					$("a#" + id).eq("0").attr({
						"href": url
					})
				}
			});

		});
	};
	return util;
}(util || {}, jQuery));

$(function() {
	UTIL.load();
});