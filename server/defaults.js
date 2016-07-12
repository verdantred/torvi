if (Topics.find().count() === 0) {
  _.each(['General', 'Tutorials', 'Help'], function(topicName) {
    Topics.insert({name: topicName});
  });
}
