Template.notifications.helpers({
	notifications: function(){
		return Notifications.find();
	}
});

Template.notifications.rendered = function() {
	var notification = this.data;
	Meteor.defer(function(){
		Notifications.update(notification._id, {$set: {seen: true}});
	})
}