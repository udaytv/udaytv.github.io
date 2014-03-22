function getStream(channel) {
	var resp = $.post("/sc2/stream2vlc.php", {
		channelname: channel,
		hoster: "justin"
	});
	if (resp && resp.responseText && resp.responseText.length > 250) {
		var respTxt = resp.responseText.substr(17);
		return respTxt.substr(0, respTxt.length - 2);
	}
}