import { Layers, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { Layer } from '@georesponde/client';
import { useTranslation } from 'react-i18next';

interface Props {
  layer: Layer;
  dataset?: any;
  isActive: boolean;
  onToggle: (id: string) => void;
  isUnavailable?: boolean;
}

export function LayerToggle({ layer, dataset, isActive, onToggle, isUnavailable = false }: Props) {
  const { i18n, t } = useTranslation();
  
  // Determine icon based on category
  let Icon = Layers;
  if (layer.category === 'Earthquakes' || layer.category === 'Geology' || layer.category === 'Satellite') Icon = Activity;
  else if (layer.category === 'Humanitarian' || layer.category === 'Community') Icon = ShieldCheck;
  else if (layer.category === 'Infrastructure' || layer.category === 'Hazards') Icon = AlertTriangle;

  const currentLang = i18n.language.split('-')[0]; // e.g., 'es' from 'es-ES'

  const getName = (obj: any): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[currentLang] || obj.en || obj.es || Object.values(obj)[0] as string;
  };

  const displayName = getName(layer.name);
  const displayDescription = dataset?.description ? getName(dataset.description) : null;

  return (
    <div 
      className={`layer-item ${isActive ? 'active' : ''}`}
      onClick={() => onToggle(layer.id)}
    >
      <Icon className="layer-icon" size={20} />
      <div className="layer-info">
        <div className="layer-name">{displayName}</div>
        {displayDescription && (
          <div className="layer-description" style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px', marginBottom: '4px', lineHeight: '1.2' }}>
            {displayDescription}
          </div>
        )}
        <div className="layer-meta" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="layer-badge">{t(`sidebar.confidence.${layer.confidence}`) || layer.confidence}</span>
          {isUnavailable && <span className="layer-badge" style={{ backgroundColor: '#ef4444', color: 'white' }}>Unavailable</span>}
        </div>
      </div>
    </div>
  );
}
