Template.postEdit.events({
	
	'submit form': function(e) {
		e.preventDefault();
		
		var currentPostId = this._id;
		
		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}
		
		Posts.update(currentPostId, {$set: postProperties}, function(error){
			if(error) {
				return notify(error.reason, 'danger');
			} else {
				Router.go('postShow', {_id: currentPostId});
			}
		})
	},
	
	'click .delete': function(e) {
		e.preventDefault();
		
		if(confirm("Are you sure you want to delete this post?")){
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
	
});