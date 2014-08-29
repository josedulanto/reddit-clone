Notifications = new Meteor.Collection(null);

notify = function(message, kind){
	Notifications.insert({message: message, kind: kind, read: false});
}

notifyClear = function(){
	Notifications.remove({read: true});
}