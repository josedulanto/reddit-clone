Notifications = new Meteor.Collection(null);

notify = function(message, kind){
	Notifications.insert({message: message, kind: kind, seen: false});
}

notifyClear = function(){
	Notifications.remove({seen: true});
}