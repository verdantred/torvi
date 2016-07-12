Meteor.publish('topics', function() {
  return Topics.find();
});

Meteor.publish('topic', function(id) {
  check(id, String);
  return Topics.find({_id: id});
});

Meteor.publish('threads', function(topicId) {
  check(topicId, String);
  return Threads.find({topicId: topicId});
});

Meteor.publish('thread', function(id) {
  check(id, String);
  return Threads.find({_id: id});
});
