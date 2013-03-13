#!/usr/bin/env node


var httpreq = require('httpreq');
var async = require('async');

//sniff youf cookie and insert it here:
var cookie = '';


var stop = false;

async.whilst(
	function () { return !stop },
	function (asyncDone) {
		httpreq.get('https://developers.google.com/events/register/waitlist/status/googleio2013_academic/', {
			headers:{
				'Cookie': cookie
			}
		}, function (err, res){
			if(err) return console.log(err);

			console.log(res.body);

			var data = JSON.parse(res.body);

			if(data.status == "reregister"){
				console.log('TRY AGAIN WITH A NEW COOKIE!!!');
				stop = true;
			}else if(data.status == "waiting"){
				console.log('trying again...');
			}else{
				console.log('YOU HAVE SOMETHING!!!');
				stop = true;
			}

			setTimeout(asyncDone, 100);
		});
	},
	function (err) {
		if(err) console.log(err);
	}
);