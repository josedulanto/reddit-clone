Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('activities')];
  }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  limit: function() {
    return parseInt(this.params.postsLimit) || 5;
  },
  findOptions: function() {
    return {sort: {votes: -1, submitted: -1}, limit: this.limit()};
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.limit();
    var nextPath = this.route.path({postsLimit: this.limit() + this.increment});
    return { posts: this.posts(), nextPath: (hasMore ? nextPath : null) };
  }
});

Router.map(function() {
  this.route('userProfile', {
    path: '/me',
    data: function() { return Meteor.user() }
  });
  this.route('userEdit', {
    path: '/me/edit',
    data: function() { return Meteor.user() }
  });
  this.route('postNew', {path: '/new'});
  this.route('postShow', {
    path: '/posts/:_id',
    data: function() { return Posts.findOne(this.params._id); },
    waitOn: function() {
      return [Meteor.subscribe('comments', this.params._id), Meteor.subscribe('singlePost', this.params._id)];
    }
  });
  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function() { return Posts.findOne(this.params._id); },
    waitOn: function() {
      return [Meteor.subscribe('singlePost', this.params._id)];
    }
  });
  this.route('postsList', {
    path: '/:postsLimit?',
    controller: PostsListController
  });
});

var requireLogin = function(pause) {
  if(!Meteor.user()) {
    if(Meteor.loggingIn()){
      this.render(this.loadingTemplate);
    } else {
      notify('Please login before accessing this page!', 'danger');
    }
    pause();
  }
};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: ['postNew', 'postEdit', 'userEdit', 'userProfile']});
Router.onBeforeAction(function() { notifyClear(); });