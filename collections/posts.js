Posts = new Meteor.Collection('posts');

Meteor.methods({
  post: function(postAttributes) {
    postWithSameLink = Posts.findOne({url: postAttributes.url});

    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please complete the fields');

    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink)
      throw new Meteor.Error(302, 'This URL has already been posted', postWithSameLink._id);

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
      created_at: new Date().getTime(),
      updated_at: new Date().getTime()
    });

    var postId = Posts.insert(post);

    return postId;
  }
});