if (Posts.find().count() === 0) {
  
  // Create users John Doe and John Smith
  var doeId = Meteor.users.insert({
    profile: { name: 'John Doe' }
  });
  
  var doe = Meteor.users.findOne(doeId);
  
  var smithId = Meteor.users.insert({
    profile: {name: 'John Smith'}
  });
  
  var smith = Meteor.users.findOne(smithId);
  
  // Create posts
  Posts.insert({
    title: 'Amazon’s Twitch Acquisition Is Official',
    userId: smith._id,
    author: smith.profile.name,
    url: 'http://techcrunch.com/2014/08/25/amazon-will-officially-acquire-twitch/',
    votes: 0,
    commentsCount: 2,
    createdAt: moment(),
    updatedAt: moment()
  });
  Posts.insert({
    title: 'Y Combinator-Backed Traction Is A Marketplace Connecting Brands With Freelance Marketers',
    userId: doe._id,
    author: doe.profile.name,
    url: 'http://techcrunch.com/2014/08/19/traction-launch/',
    votes: 0,
    commentsCount: 0,
    createdAt: moment().subtract(1, 'days'),
    updatedAt: moment().subtract(1, 'days')
  });
  Posts.insert({
    title: 'Google Launches Photo Sphere Camera App On iOS',
    userId: smith._id,
    author: smith.profile.name,
    url: 'http://techcrunch.com/2014/08/19/google-launches-photo-sphere-camera-on-ios/',
    votes: 0,
    commentsCount: 0,
    createdAt: moment().subtract(2, 'days'),
    updatedAt: moment().subtract(2, 'days')
  });
  Posts.insert({
    title: 'This Is The Worst App In The World',
    userId: doe._id,
    author: doe.profile.name,
    url: 'http://techcrunch.com/2014/08/19/this-is-the-worst-app-in-the-world/',
    votes: 0,
    commentsCount: 0,
    createdAt: moment().subtract(3, 'days'),
    updatedAt: moment().subtract(3, 'days')
  });
  
  var posts = Posts.find().fetch();
  
  // Create comments
  Comments.insert({
    postId: posts[0]._id,
    userId: doe._id,
    author: doe.profile.name,
    body: "I'm officially 'not with it'. I went to twitch, loaded a few pages and found myself watching a live stream of someone playing minecraft, as if playing minecraft wasn't bad enough. WTF.",
    createdAt: moment().add(10, 'minutes')
  });
  Comments.insert({
    postId: posts[0]._id,
    userId: smith._id,
    author: smith.profile.name,
    body: "That's why I prefer Diablo 3... FTW!",
    createdAt: moment().add(13, 'minutes')
  });
}