Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: { votes: -1 }});
  }
});