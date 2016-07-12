angular.module('blog', ['angular-meteor', 'ui.router', 'accounts.ui'])
  .config(function($urlRouterProvider, $stateProvider) {

    // Set the default route
    $urlRouterProvider
      .when('/', '/topics')
      .otherwise('/topics');

    // Add states
    $stateProvider.state('topics', {
      url: '/topics',
      templateUrl: 'views/pages/topics.html',
      controller: 'TopicsController'
    });

    $stateProvider.state('topic', {
      url: '/topic/:topicId',
      templateUrl: 'views/pages/topic.html',
      controller: 'TopicController'
    });

    $stateProvider.state('thread', {
      url: '/thread/:threadId',
      templateUrl: 'views/pages/thread.html',
      controller: 'ThreadController'
    });

  })
  .run(function($state) {
    // We inject state here to initialize ui.router
  })
  .controller('TopicsController', function($scope) {
    $scope.subscribe('topics');
    $scope.helpers({
      topics: function() {
        return Topics.find({}, {sort: {name:1}});
      }
    });
  })

  .controller('TopicController', function($scope, $stateParams, $meteor) {
    $scope.subscribe('topic', function() {return [$stateParams.topicId]; });
    $scope.subscribe('threads', function() {return [$stateParams.topicId]; });
    $scope.helpers({
      topic: function() {
        return Topics.findOne({_id: $stateParams.topicId});
      },
      threads: function() {
        return Threads.find({topicId: $stateParams.topicId});
      }
    });

    $scope.createThread = function(thread) {
      $meteor.call('createThread', $stateParams.topicId, thread.content).then(function() {
        thread.content = '';
      }).catch(function(error) {
        alert('An error occured while creating a thread! ' + error)
      });
    };

    $scope.removeThread = function(threadId) {
      $meteor.call('removeThread', threadId).then(function() {
      }).catch(function(error) {
        alert('An error occured while deleting a thread! ' + error)
      });
    };
  })

  .controller('ThreadController', function($scope, $stateParams, $meteor) {
    $scope.subscribe('thread', function() {return [$stateParams.threadId]});
    $scope.helpers({
      thread: function() {
        return Threads.find({threadId: $stateParams.threadId});
      }
    });
  })
