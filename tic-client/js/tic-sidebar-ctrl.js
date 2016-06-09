angular.module('ticApp').controller('ticSidebarCtrl', function ticSidebarCtrl($scope, ticVariables, ticMapServ) {

  function updateVisibleTypes() {
    var dataTypes, activeTypes = [];
    _.forEach($scope.model.entities, function(e) {
      if (e.isActive) {
        dataTypes = e.dataTypes.split(',');
        _.forEach(dataTypes, function(dt) {
          activeTypes.push(dt);
        });
      }
    });
    ticVariables.visibleTypes = activeTypes;
  }

  function onItemClick(id) {
    var found;
    _.forEach($scope.model.entities, function(e) {
      if (!found && e.id === id) {
        found = true;
        e.isActive = !e.isActive;
      }
    });
    updateVisibleTypes();
    ticMapServ.updateMarkers(ticVariables.markersData, ticVariables.visibleTypes);
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
