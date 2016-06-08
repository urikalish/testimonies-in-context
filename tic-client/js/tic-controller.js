var ticApp = angular.module('ticApp', []);

ticApp.controller('ticController', function ticController($scope) {
  $scope.model = {
    entities: [
      {
        text: 'Jewish Ghettos',
        isLongText: true,
        dataTypes: 'ghetto',
        classStr: 'ghetto',
        isActive: true
      },
      {
        text: 'Camps',
        isLongText: false,
        dataTypes: 'camp',
        classStr: 'camp',
        isActive: true
      },
      {
        text: 'Pictures & Documents',
        isLongText: true,
        dataTypes: 'picture,document',
        classStr: 'testimony-written',
        isActive: true
      },
      {
        text: 'Video Testimonies',
        isLongText: true,
        dataTypes: 'video',
        classStr: 'testimony-video',
        isActive: true
      },
      {
        text: 'Audio Testimonies',
        isLongText: true,
        dataTypes: 'audio',
        classStr: 'testimony-audio',
        isActive: true
      },
      {
        text: 'Jewish Resistance',
        isLongText: true,
        dataTypes: 'resistance',
        classStr: 'resistance',
        isActive: true
      },
      {
        text: 'Righteous',
        isLongText: false,
        dataTypes: 'righteous',
        classStr: 'righteous',
        isActive: true
      },
      {
        text: 'Allied Forces',
        isLongText: true,
        dataTypes: 'allied',
        classStr: 'allied',
        isActive: true
      }
    ]
  };
});
