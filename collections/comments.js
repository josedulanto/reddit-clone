Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes){
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    
    // validation - check if the user is signed in
    if(!user)
      throw new Meteor.Error(401, "You need to login to create a comment");

    // validation - ensure the comment has a body
    if (!commentAttributes.body)
      throw new Meteor.Error(422, 'Please write your message');
      
    comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
      userId: user._id,
      author: user.profile.name,
      createdAt: moment()
    });
    
    return Comments.insert(comment);
  }
});