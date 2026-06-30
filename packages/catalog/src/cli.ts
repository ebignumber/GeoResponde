#!/usr/bin/env node
import { Command } from 'commander';
import { buildCatalog, validateCatalog } from './index.js';

const program = new Command();

program
  .name('geo-catalog')
  .description('CLI to manage the GeoResponde catalog')
  .version('1.0.0');

program.command('build')
  .description('Build the catalog and generate public JSON files')
  .action(async () => {
    try {
      await buildCatalog();
    } catch (err) {
      console.error('Build failed:', (err as Error).message);
      process.exit(1);
    }
  });

program.command('validate')
  .description('Validate the YAML files against JSON Schema and relations')
  .action(async () => {
    try {
      await validateCatalog();
    } catch (err) {
      console.error('Validation failed:', (err as Error).message);
      process.exit(1);
    }
  });

program.parse();
