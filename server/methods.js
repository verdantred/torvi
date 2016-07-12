Meteor.methods({
  createThread: function(topicId, content) {
    check(topicId, String);
    check(content, String);
    var user = Meteor.user();
    if(!user) {
      throw new Meteor.Error("You're not logged in bozo!");
    }
    if(!content) {
      throw new Meteor.Error("Content is required!");
    }
    var thread = {
      author: user.emails[0].address,
      createdAt: new Date(),
      topicId: topicId,
      content: content
    };
    return Threads.insert(thread);
  },
  removeThread: function(threadId) {
    check(threadId, String);
    var user = Meteor.user();
    if(!user) {
      throw new Meteor.Error("You're not logged in bozo!");
    }
    thread = Threads.findOne({_id: threadId});
    if(!thread) {
      throw new Meteor.Error("Can't delete thread; it doesn't exist!");
    }
    else if (thread.author !== user.emails[0].address) {
      throw new Meteor.Error("Can't delete a thread that isn't yours!");
    }
    else {
      return Threads.remove(threadId);
    }
  }
});
