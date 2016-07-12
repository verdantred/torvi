Topics = new Meteor.Collection('Topics');
Threads = new Meteor.Collection('Threads');

Threads.allow({
  insert(userId, thread) {
    return userId && thread.author === userId;
  },

  update(userId, thread, fields, modifier) {
    return userId && thread.author === userId;
  },

  remove(userId, thread) {
    return userId && thread.author === userId;
  },
  fetch: ['author']
});

Threads.deny({
  update: function (userId, doc, fields, modifier) {
    // can't change owners
    return _.contains(fields, ['author', 'createdAt', 'topicId']);
  }
});
