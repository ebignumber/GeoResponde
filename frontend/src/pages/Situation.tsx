import { useState, useEffect } from 'react';
import { useCatalog } from '../hooks/useCatalog';
import { MapViewer } from '../components/Map/MapViewer';
import { Sidebar } from '../components/Sidebar/Sidebar';

export function Situation() {
  const { layers } = useCatalog();
  const [activeLayerIds, setActiveLayerIds] = useState<Set<string>>(new Set());
  const [unavailableLayerIds, setUnavailableLayerIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Determine which layers are missing their datasets
    const checkAvailability = async () => {
      const newUnavailable = new Set<string>();
      
      for (const layer of layers) {
        let sourceUrl = '/data/earthquakes.geojson';
        if (layer.id === 'layer-funvisis') sourceUrl = '/data/funvisis-earthquakes.geojson';
        else if (layer.id === 'layer-hospitals') sourceUrl = '/data/hospitals.geojson';
        else if (layer.id === 'layer-faults') sourceUrl = '/data/faults.geojson';
        else if (layer.id === 'layer-geologic-units') sourceUrl = '/data/geologic_units.geojson';
        else if (layer.id === 'layer-copernicus-ground-movement') sourceUrl = '/data/copernicus/groundMovement.geojson';
        else if (layer.id === 'layer-citizen-reports') sourceUrl = '/data/citizen-reports.geojson';
        else if (layer.id === 'layer-nasa-sentinel-damage') sourceUrl = ''; // dynamic
        else if (layer.visualization?.type === 'raster') sourceUrl = layer.visualization.url;
        else if (layer.id === 'layer-earthquakes') sourceUrl = '/data/earthquakes.geojson';
        else sourceUrl = '';
        
        if (sourceUrl && sourceUrl.startsWith('/data/')) {
          try {
            const res = await fetch(sourceUrl, { method: 'HEAD' });
            if (!res.ok) {
              newUnavailable.add(layer.id);
            }
          } catch (e) {
            newUnavailable.add(layer.id);
          }
        }
      }
      setUnavailableLayerIds(newUnavailable);
    };

    if (layers.length > 0) {
      checkAvailability();
    }
  }, [layers]);

  const toggleLayer = (id: string) => {
    setActiveLayerIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
      <MapViewer 
        activeLayerIds={activeLayerIds} 
        setUnavailableLayerIds={setUnavailableLayerIds} 
        unavailableLayerIds={unavailableLayerIds} 
      />
      <Sidebar 
        activeLayerIds={activeLayerIds} 
        onToggleLayer={toggleLayer} 
        unavailableLayerIds={unavailableLayerIds}
      />
    </div>
  );
}
