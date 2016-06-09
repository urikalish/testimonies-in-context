function getMapStyles() {
  return [
    {
      'featureType':'administrative.country',
      'elementType':'labels',
      'stylers': [
        {
          'weight':'0.40'
        },
        {
          'color':'#fefcfc'
        }
      ]
    },
    {
      'featureType':'administrative.country',
      'elementType':'labels.text',
      'stylers': [
        {
          'weight':'0.28'
        }
      ]
    },
    {
      'featureType':'administrative.province',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'administrative.province',
      'elementType':'labels',
      'stylers': [
        {
          'weight':'0.08'
        },
        {
          'color':'#e2e2e2'
        }
      ]
    },
    {
      'featureType':'administrative.locality',
      'elementType':'labels',
      'stylers': [
        {
          'color':'#bdbdbd'
        },
        {
          'weight':'0.01'
        }
      ]
    },
    {
      'featureType':'administrative.land_parcel',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'off'
        },
        {
          'color':'#e81e1e'
        }
      ]
    },
    {
      'featureType':'administrative.land_parcel',
      'elementType':'labels',
      'stylers': [
        {
          'weight':'0.01'
        }
      ]
    },
    {
      'featureType':'landscape',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'on'
        },
        {
          'color':'#413f3f'
        }
      ]
    },
    {
      'featureType':'poi',
      'elementType':'all',
      'stylers': [
        {
          'saturation': -100
        },
        {
          'lightness': 51
        },
        {
          'visibility':'off'
        },
        {
          'color':'#dee2e4'
        }
      ]
    },
    {
      'featureType':'poi.attraction',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'poi.business',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'poi.business',
      'elementType':'labels.icon',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'poi.government',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'poi.medical',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'poi.park',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'poi.place_of_worship',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'poi.school',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'poi.sports_complex',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'road',
      'elementType':'labels',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'road.highway',
      'elementType':'all',
      'stylers': [
        {
          'saturation': -100
        },
        {
          'visibility':'off'
        },
        {
          'color':'#a9a9a9'
        }
      ]
    },
    {
      'featureType':'road.highway',
      'elementType':'labels',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'road.highway.controlled_access',
      'elementType':'all',
      'stylers': [
        {
          'visibility':'off'
        },
        {
          'color':'#555555'
        }
      ]
    },
    {
      'featureType':'road.arterial',
      'elementType':'all',
      'stylers': [
        {
          'saturation': -100
        },
        {
          'lightness': 30
        },
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'road.local',
      'elementType':'all',
      'stylers': [
        {
          'saturation': -100
        },
        {
          'lightness': 40
        },
        {
          'visibility':'off'
        },
        {
          'color':'#00f1ff'
        }
      ]
    },
    {
      'featureType':'transit',
      'elementType':'all',
      'stylers': [
        {
          'saturation': -100
        },
        {
          'visibility':'simplified'
        }
      ]
    },
    {
      'featureType':'transit',
      'elementType':'labels',
      'stylers': [
        {
          'visibility':'off'
        }
      ]
    },
    {
      'featureType':'water',
      'elementType':'all',
      'stylers': [
        {
          'color':'#757b7f'
        }
      ]
    },
    {
      'featureType':'water',
      'elementType':'geometry',
      'stylers': [
        {
          'lightness': -25
        },
        {
          'saturation': -97
        },
        {
          'color':'#616161'
        }
      ]
    },
    {
      'featureType':'water',
      'elementType':'labels',
      'stylers': [
        {
          'visibility':'on'
        },
        {
          'lightness': -25
        },
        {
          'saturation': -100
        },
        {
          'weight':'0.10'
        }
      ]
    }
  ];
}
