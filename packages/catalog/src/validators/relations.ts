import { CatalogData } from '../types/index.js';

export function validateRelations(catalog: CatalogData): void {
  const { organizations, sources, datasets, layers } = catalog;

  const orgIds = new Set<string>();
  const sourceIds = new Set<string>();
  const datasetIds = new Set<string>();
  const layerIds = new Set<string>();
  const allIds = new Set<string>();

  const checkDuplicate = (id: string, type: string) => {
    if (allIds.has(id)) throw new Error(`Duplicate ID detected across catalog: ${id} (${type})`);
    allIds.add(id);
  };

  organizations.forEach(o => { checkDuplicate(o.id, 'Organization'); orgIds.add(o.id); });
  sources.forEach(s => { checkDuplicate(s.id, 'Source'); sourceIds.add(s.id); });
  datasets.forEach(d => { checkDuplicate(d.id, 'Dataset'); datasetIds.add(d.id); });
  layers.forEach(l => { checkDuplicate(l.id, 'Layer'); layerIds.add(l.id); });

  // Validate Sources reference Organizations
  sources.forEach(s => {
    if (!orgIds.has(s.organizationId)) {
      throw new Error(`Broken reference: Source ${s.id} references missing Organization ${s.organizationId}`);
    }
  });

  // Validate Datasets reference Sources
  datasets.forEach(d => {
    if (!sourceIds.has(d.sourceId)) {
      throw new Error(`Broken reference: Dataset ${d.id} references missing Source ${d.sourceId}`);
    }
  });

  // Validate Layers reference Datasets
  layers.forEach(l => {
    l.datasetIds.forEach(did => {
      if (!datasetIds.has(did)) {
        throw new Error(`Broken reference: Layer ${l.id} references missing Dataset ${did}`);
      }
    });
  });
}
