Template.postNew.events({
	
	'submit form': function(e) {
		e.preventDefault();
		
		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}
		
		Meteor.call('post', post, function(error, id) {
			if (error){
				notify(error.reason, 'danger');

				if (error.error === 302)
					Router.go('postShow', {_id: error.details});
			} else {
				Router.go('postShow', {_id: id});
			}
		});
	}
	
});