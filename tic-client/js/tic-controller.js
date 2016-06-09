angular.module('ticApp', []).controller('ticController', function ticController($scope) {

  function onItemClick(id) {
    var i, j, found, entity, dataTypes = [];
    for (i = 0; i < $scope.model.entities.length; i++) {
      entity = $scope.model.entities[i];
      if (!found && entity.id === id) {
        found = true;
        entity.isActive = !entity.isActive;
      }
    }
    updateVisibleTypes();
    UpdateMarkers();
  }

  function updateVisibleTypes() {
    var i, j, entity, dataTypes;
    visibleTypes = [];
    for (i = 0; i < $scope.model.entities.length; i++) {
      entity = $scope.model.entities[i];
      if (entity.isActive) {
        dataTypes = entity.dataTypes.split(',');
        for (j = 0; j < dataTypes.length; j++) {
          visibleTypes.push(dataTypes[j]);
        }
      }
    }
  }

  $scope.model = {
    entities: [
      {
        id: 'ghetto',
        text: 'Jewish Ghettos',
        isLongText: true,
        dataTypes: 'ghetto',
        classStr: 'ghetto',
        isActive: true
      },
      {
        id: 'camp',
        text: 'Camps',
        isLongText: false,
        dataTypes: 'camp',
        classStr: 'camp',
        isActive: true
      },
      {
        id: 'picsAndDocs',
        text: 'Pictures & Documents',
        isLongText: true,
        dataTypes: 'picture,document',
        classStr: 'testimony-written',
        isActive: true
      },
      {
        id: 'video',
        text: 'Video Testimonies',
        isLongText: true,
        dataTypes: 'video',
        classStr: 'testimony-video',
        isActive: true
      },
      {
        id: 'audio',
        text: 'Audio Testimonies',
        isLongText: true,
        dataTypes: 'audio',
        classStr: 'testimony-audio',
        isActive: true
      },
      {
        id: 'resistance',
        text: 'Jewish Resistance',
        isLongText: true,
        dataTypes: 'resistance',
        classStr: 'resistance',
        isActive: true
      },
      {
        id: 'righteous',
        text: 'Righteous',
        isLongText: false,
        dataTypes: 'righteous',
        classStr: 'righteous',
        isActive: true
      },
      {
        id: 'allied',
        text: 'Allied Forces',
        isLongText: true,
        dataTypes: 'allied',
        classStr: 'allied',
        isActive: true
      }
    ]
  };

  $scope.onItemClick = onItemClick;

  updateVisibleTypes();

});
