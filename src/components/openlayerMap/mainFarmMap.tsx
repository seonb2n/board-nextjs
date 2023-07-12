import {Map, Overlay, View} from "ol";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import {defaults as defaultControls} from 'ol/control';
import Feature from 'ol/Feature.js';
import {useEffect, useRef, useState} from "react";
import "ol/ol.css"
import {Point} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Fill, Icon, Stroke, Style, Text} from "ol/style";
import {Cluster, TileWMS} from "ol/source";
import CircleStyle from "ol/style/Circle";


export default function MainFarmMap({zoom, centerX, centerY, targetFarm}: any) {
    const [markerFeatures, setMarkerFeatures]: any[] = useState([]);
    const [legendData, setLegendData]: any[] = useState([]);

    useEffect(() => {
    }, []);

    return (
        <div className="flex-grow h-full">
            <div className="w-full h-full">
                <MapView zoom={zoom} centerX={centerX} centerY={centerY} targetFarm={targetFarm}
                         markerFeatures={markerFeatures} legendDto={legendData}/>
            </div>
        </div>
    );
}

function MapView({zoom, centerX, centerY, targetFarm, markerFeatures, legendDto}: any) {
    const farmMarkerFeatureLayer = new VectorSource();
    const GEOSERVER_TILE_URL = "";
    if (markerFeatures !== undefined) {
        markerFeatures.map((state: any) => farmMarkerFeatureLayer.addFeature(new Feature({
            geometry: new Point([state.longitude, state.latitude]),
            name: state.farmName,
        })));
    }

    const clusterSource = new Cluster({
        distance: 300,
        source: farmMarkerFeatureLayer
    });

    const clusterLayer = new VectorLayer({
        source: clusterSource,
        style: function (feature) {
            const size = feature.get('features').length;
            let style = new Style({
                image: new CircleStyle({
                    radius: 15,
                    stroke: new Stroke({
                        color: 'rgba(35,26,26,0.1)',
                    }),
                    fill: new Fill({
                        color: size > 100 ? '#E7AD1D' : '#FEF179'
                    }),
                }),
                text: new Text({
                    text: size > 1 ? size.toString() : '',
                    fill: new Fill({
                        color: '#000000',
                    }),
                })
            });
            return style;
        }
    });

    const unClusteredLayer = new VectorLayer({
        source: farmMarkerFeatureLayer,
        style: function () {
            let style = new Style({
                image: new CircleStyle({
                    radius: 7,
                    stroke: new Stroke({
                        color: '#fff',
                    }),
                    fill: new Fill({
                        color: '#ffb21b'
                    }),
                }),
            });
            return style;
        }
    });

    const container = document.createElement("div");
    container.innerText = "Popup 입니다.";
    container.id = "popup";
    document.body.appendChild(container);
    const popupOverlay = new Overlay({
        element: container,
        autoPan: {
            animation: {
                duration: 250,
            }
        }
    })

    const geoServerTileMap = new TileLayer({
        properties: {
            id: "geoServerTileLayer"
        },
        source: new TileWMS({
            url: [GEOSERVER_TILE_URL],
            params: {

            }
        })
    });

    geoServerTileMap.setVisible(false);

    const commonTileLayer = new TileLayer({
        properties: {
            id: "tileLayer_satellite",
        }, source: new OSM({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
    });


    const ref = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<Map | null>(null);
    if (ref.current && !mapRef.current) {
        mapRef.current = new Map({
            layers: [
                commonTileLayer,
                geoServerTileMap
            ],
            view: new View({center: [centerX, centerY], zoom: 10, minZoom: 8, maxZoom: 16, projection: "EPSG:4326"}),
            target: ref.current,
            controls: defaultControls().extend([]),
        });
        const map = mapRef.current;
    }

    useEffect(() => {
        centerX = targetFarm.farmsLongitude;
        centerY = targetFarm.farmsLatitude;
        // mapRef.current?.getView().animate({center: [centerX, centerY]}, {zoom: 14}, {duration: 500});
        const markerFeature = new Feature({
            geometry: new Point([centerX, centerY]),
            desc: targetFarm.farmsNm
        })
        const markerVectorSource = new VectorSource({
            features: [markerFeature]
        });

        //저번에 만들어둔 farmMarker 삭제
        mapRef.current?.setLayers(mapRef.current?.getLayers().getArray().filter(layer => layer.getProperties().id !== 'farmMarker'));
        mapRef.current?.addLayer(
            new VectorLayer({
                properties: {
                    id: "farmMarker"
                },
                source: markerVectorSource,
                style: new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: "/images/selected_farm.svg"
                    })
                }),
            })
        );
        const extent = markerVectorSource.getExtent();
        mapRef.current?.getView().fit(extent, {
            duration: 500
        });
    }, [targetFarm]);

    return (
        <div className="w-full h-full relative">
            <div ref={ref} style={{width: "100%", height: "100%"}}/>
        </div>
    );
}