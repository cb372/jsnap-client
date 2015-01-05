angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  var onFail = function(message) {
    alert('Failed because: ' + message);
  };
  var onPhotoDataSuccess = function(imageData) {
    $scope.imgSrc = "data:image/jpeg;base64," + imageData;
  };

  $scope.takePhoto = function() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
      quality: 50, 
      allowEdit: true, 
      destinationType: navigator.camera.DestinationType.DATA_URL 
    });
  };

  $scope.choosePhoto = function() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
      quality: 50, 
      allowEdit: true, 
      destinationType: navigator.camera.DestinationType.DATA_URL,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: navigator.camera.MediaType.PICTURE
    });
  };

  $scope.uploadPhoto = function() {
    $scope.status = 'Translating ...';
    $http.post('http://192.168.3.6:3000/upload', {photo: $scope.imgSrc}).
      success(function(data, status, headers, config) {
        // TODO change location
        $scope.status = 'Translated! Response from server: ' + data;
      }).
      error(function(data, status, headers, config) {
        $scope.status = 'Upload or translation failed. Response from server (status=' + status + ': ' + data;
      });
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
