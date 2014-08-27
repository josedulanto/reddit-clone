UI.registerHelper('formatDate', function(timestamp){
  return moment(timestamp).fromNow();
});