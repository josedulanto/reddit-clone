UI.registerHelper('formatDate', function(timestamp){
  return moment.unix(timestamp).fromNow();
});