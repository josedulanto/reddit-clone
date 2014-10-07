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
    return {sort: this.sort, limit: this.limit() };
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.limit();
    return { posts: this.posts(), nextPath: (hasMore ? this.nextPath() : null) };
  }
});

NewPostsListController = PostsListController.extend({
  sort: {votes: -1, createdAt: -1, _id: -1},
  nextPath: function() { return Router.routes.newPosts.path({ postsLimit: this.limit() + this.increment }); }
});

BestPostsListController = PostsListController.extend({
  sort: {createdAt: -1, _id: -1, votes: null},
  nextPath: function() { return Router.routes.bestPosts.path({ postsLimit: this.limit() + this.increment }); }
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
  this.route('postNew', {path: '/posts/new'});
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
  this.route('newPosts', {
    path: '/best/:postsLimit?',
    controller: NewPostsListController
  });
  this.route('bestPosts', {
    path: '/new/:postsLimit?',
    controller: BestPostsListController
  });
  this.route('home', {
    path: '/',
    controller: NewPostsListController
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