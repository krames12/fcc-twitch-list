var streamerList = ["freecodecamp", "sodapoppin", "ESL_CSGO", "BrutallStatic", "Zfg1", "noobs2ninjas", "FinalBossTV", "Slootbag", "JoshOG"];
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
				$offline.append('<div class="stream-off stream-stat"><img src="http://publicdomainvectors.org/photos/mono-gnome-question.png" class="stream-icon"><p class="name">' + streamName + '</p><span class="delete-stream fa fa-times"></span><div class="stream-info"><p class="stream-info">Does Not Exist</p></div></div>');
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
	$offline.append('<div class="stream-off stream-stat"><img src="' + streamData.logo + '" class="stream-icon"><a href="' + streamLink + streamName + ' class="name">' + streamName + '</a><span class="delete-stream fa fa-times"></span><span class="stream-status status-off"></span><div class="stream-info"><p class="stream-info">Offline</p></div></div>');
}

function onlineStream(streamData, streamName){
	$online.append('<div class="stream-on stream-stat"><div class="stream-title"><img src="' + streamData.stream.channel.logo + '" class="stream-icon"><a href="' + streamLink + streamName + ' class="name">' + streamName + '</a><span class="delete-stream fa fa-times"></span><span class="stream-status status-on"></span></div><div class="stream-info"><p class="stream-info">' + streamData.stream.channel.game + '</p></div></div>');
}

$('.live').on('click', function(){
	$('.offline-streams').addClass('hide-it');
	$('.online-streams').removeClass('hide-it');
});

$('.off').on('click', function(){
	$('.offline-streams').removeClass('hide-it');
	$('.online-streams').addClass('hide-it');
});

$('.all').on('click', function(){
	$('.offline-streams').removeClass('hide-it');
	$('.online-streams').removeClass('hide-it');
});

function addStream(streamName){
	streamer = $('.add-stream').val();
	getInfo(streamer);
}

$('.stream-container').delegate('.delete-stream', 'click', function(){
	$(this).closest('.stream-stat').remove();
});
