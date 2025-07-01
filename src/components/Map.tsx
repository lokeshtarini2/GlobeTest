import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, Stack, Typography, useColorScheme } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CountriesMap = () => {
  const theme = useTheme();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { mode } = useColorScheme();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFpY2h1ciIsImEiOiJCX2J1Uk1jIn0.Dss8lGxgTYKK1jDusc4lJw';

    const styleUrl =
      mode === 'dark'
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      projection: 'globe',
      style: styleUrl,
      center: [0, 20],
      zoom: 1.2,
      scrollZoom: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      const secondsPerRevolution = 120;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      let spinEnabled = true;

      function spinGlobe() {
        const zoom = map.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.getCenter();
          center.lng -= distancePerSecond;
          map.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }

      map.on('mousedown', () => { userInteracting = true; });
      map.on('mouseup', () => { userInteracting = false; spinGlobe(); });
      map.on('dragend', () => { userInteracting = false; spinGlobe(); });
      map.on('pitchend', () => { userInteracting = false; spinGlobe(); });
      map.on('rotateend', () => { userInteracting = false; spinGlobe(); });
      map.on('moveend', () => { spinGlobe(); });

      spinGlobe();

      map.addSource('country-boundaries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1',
      });

      map.addLayer({
        id: 'highlighted-countries',
        type: 'fill',
        source: 'country-boundaries',
        'source-layer': 'country_boundaries',
        paint: {
          'fill-color': theme.palette.primary.main,
          'fill-opacity': 0.6,
        },
        filter: ['in', 'iso_3166_1_alpha_3',
          'CHL', 'ARG', 'PER', 'COL', 'TUR',
          'ROU', 'SGP', 'CHN', 'RUS', 'IND',
          'DEU', 'FRA', 'GBR', 'ITA', 'JPN',
          'AUS', 'EGY', 'ZAF', 'CAN', 'MEX',
          'BRA', 'CRI', 'KOR', 'THA'
        ],
      });
    });

    return () => map.remove();
  }, [theme.palette.mode, theme.palette.primary.main, mode]);

  useEffect(() => {
    if (mapRef.current) {
      const styleUrl =
        mode === 'dark'
          ? 'mapbox://styles/mapbox/dark-v11'
          : 'mapbox://styles/mapbox/light-v11';
      mapRef.current.setStyle(styleUrl);
    }
  }, [mode]);

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Map
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <div
            ref={mapContainerRef}
            style={{ width: '100%', height: '500px', borderRadius: '4px' }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CountriesMap;