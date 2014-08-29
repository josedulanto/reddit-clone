Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('posts'). Meteor.subscribe('activities')];
  }
});

Router.map(function() {
  this.route('postNew', {path: '/new'});
  this.route('postsList', {path: '/'});
  this.route('postShow', {
    path: '/posts/:_id',
    data: function() { return Posts.findOne(this.params._id); },
    waitOn: function() {
      return Meteor.subscribe('comments', this.params._id);
    }
  });
  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function() { return Posts.findOne(this.params._id); }
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
Router.onBeforeAction(requireLogin, {only: ['postNew', 'postEdit']});
Router.onBeforeAction(function() { notifyClear(); });