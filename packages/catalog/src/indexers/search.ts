import { CatalogData, SearchIndexEntry } from '../types/index.js';

export function buildSearchIndex(catalog: CatalogData): SearchIndexEntry[] {
  const index: SearchIndexEntry[] = [];

  catalog.organizations.forEach(o => {
    index.push({ id: o.id, title: o.name, type: 'organization', description: o.type });
  });

  catalog.sources.forEach(s => {
    index.push({ id: s.id, title: s.name, type: 'source' });
  });

  catalog.datasets.forEach(d => {
    index.push({ id: d.id, title: d.title, type: 'dataset', description: d.description });
  });

  catalog.layers.forEach(l => {
    index.push({ id: l.id, title: l.name, type: 'layer' });
  });

  return index;
}
