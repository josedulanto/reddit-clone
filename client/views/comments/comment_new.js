Template.commentNew.events({
  
  'submit form': function(e, template) {
    e.preventDefault();
    
    var el = $(e.target).find('[name=body]');
    
    var comment = {
      body: el.val(),
      postId: template.data._id
    }
    
    Meteor.call('comment', comment, function(error, id) {
      if (error){
        notify(error.reason, 'danger');
      } else {
        el.val('');
      }
    });
  }
  
});