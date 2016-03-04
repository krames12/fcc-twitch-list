var streamerList = ["asd123weqweqwewrqwerq", "freecodecamp", "storbeck", "habathcx","RobotCaleb", "noobs2ninjas", "Slootbag", "JoshOG"];
var streamer = "freecodecamp";
var streamLink = "www.twitch.tv/";
var $online = $('.online-streams');
var $offline = $('.offline-streams');

for (var s=0; s < streamerList.length; s++){
	getInfo(streamerList[s]);
}

function getInfo(streamName){
	$.ajax({
		url: "https://api.twitch.tv/kraken/streams/" + streamName + "?callback=?",
		dataType: "jsonp",
		success: function(data){
			console.log(data);
			if (data.status === 404){
				$offline.append('<div class="stream-off stream-stat"><span class="stream-icon fa fa-question"></span><p class="name">' + streamName + '</p></div>');
			} else if (data.stream == null){
				offlineCall(streamName);
			} else {
				onlineStream(data, streamName);
			}
		},
		error: function(){

		}
	});
}

function offlineCall(streamName){
	$.ajax({
		url: "https://api.twitch.tv/kraken/channels/" + streamName + "?callback=?",
		dataType: "jsonp",
		success: function(data){
			console.log('offline data: ' + data);
			offlineStream(data, streamName);
		},
	});
}

function offlineStream(streamData, streamName){
	$offline.append('<div class="stream-off stream-stat"><img src="' + streamData.logo + '" class="stream-icon"><a href="' + streamLink + streamName + ' class="name">' + streamName + '</a> </div>');
}

function onlineStream(streamData, streamName){
	$online.append('<div class="stream-on stream-stat"><img src="' + streamData.stream.channel.logo + '" class="stream-icon"><a href="' + streamLink + streamName + ' class="name">' + streamName + '</a> </div>');
}

$('.live').on('click', function(){
	$('.offline-streams').addClass('hide-it');
	$('.online-streams').removeClass('hide-it');
})

$('.off').on('click', function(){
	$('.offline-streams').removeClass('hide-it');
	$('.online-streams').addClass('hide-it');
})

$('.all').on('click', function(){
	$('.offline-streams').removeClass('hide-it');
	$('.online-streams').removeClass('hide-it');
})
