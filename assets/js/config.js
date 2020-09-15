// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ2luYW5qYXJwYW11bmdrYXMiLCJhIjoiY2swbmg3eTM0MDdzMjNjbXcyN21qamJnYiJ9.qYAJ-y6QU7ZuzBJ8Q-OEuQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [106.75502, -6.41706],
        zoom: 8.5,
        pitch: 0.00,
        bearing: 0.00
    });

    map.on('load', function () {
        // Add a source for the state polygons.
        map.addSource('states', {
            'type': 'geojson',
            'data':
                'jabodetabek.json'
        });

        // Add a layer showing the state polygons.
        map.addLayer({
            'id': 'states-layer',
            'type': 'fill',
            'source': 'states',
            'layout': {},
            'paint': {
                'fill-color': '#627BC1',
                'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    0.5,
                    0
                ]
            }
        });

        // When a click event occurs on a feature in the states layer, open a popup at the
        // location of the click, with description HTML from its properties.
        map.on('click', 'states-layer', function (e) {
            console.log(e.features[0].properties.NAME_2)
            switch (e.features[0].properties.NAME_2) {
                case 'Bogor':
                    map.flyTo({
                        center: [106.79986, -6.60225],
                        zoom: 10.21,
                        pitch: 0.00,
                        bearing: 0.00
                    })
                    break;
                case 'Depok':
                    map.flyTo({
                        center: [106.81935, -6.38910],
                        zoom: 11.61,
                        pitch: 0.00,
                        bearing: 0.00
                    })
                    break
                case 'Tangerang':
                    map.flyTo({
                        center: [106.56698, -6.17144],
                        zoom: 10.71,
                        pitch: 0.00,
                        bearing: 0.00
                    })
                    break
                case 'Bekasi':
                    map.flyTo({
                        center: [107.13045, -6.27156],
                        zoom: 10.14,
                        pitch: 0.00,
                        bearing: 0.00
                    })
                    break
                default:
                    map.flyTo({
                        center: [106.84682, -6.22630],
                        zoom: 10.56,
                        pitch: 0.00,
                        bearing: 0.00
                    })
                    break;
            }
        });
        var hoveredStateId = null;
        map.on("mousemove", "states-layer", function (e) {
            map.getCanvas().style.cursor = 'pointer';
            if (e.features.length > 0) {
                if (hoveredStateId) {
                    map.setFeatureState({ source: "states", id: hoveredStateId }, { hover: false });
                }
                hoveredStateId = e.features[0].id;
                map.setFeatureState({ source: "states", id: hoveredStateId }, { hover: true });
            }
        });
        
        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on("mouseleave", "states-layer", function () {
            map.getCanvas().style.cursor = '';
            if (hoveredStateId) {
                map.setFeatureState({ source: "states", id: hoveredStateId }, { hover: false });
            }
            hoveredStateId = null;
        });

        
        // map.on("mousemove", "states-layer", function (e) {
        //     map.getCanvas().style.cursor = 'pointer';
        //     map.setFeatureState(
        //         { source: 'states', id: e.features[0].id },
        //         { hover: true }
        //     );
        //     hoveredStateId = e.features[0].id
        // });

        // map.on("mouseleave", "states-layer", function (e) {
        //     map.getCanvas().style.cursor = '';
        //     map.setFeatureState(
        //         { source: 'states', id: hoveredStateId },
        //         { hover: false }
        //     );
        // });
        

    });
