import _Ajv from 'ajv';
import _addFormats from 'ajv-formats';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Fix ESM default import issues
const Ajv = (_Ajv as any).default || _Ajv;
const addFormats = (_addFormats as any).default || _addFormats;

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

async function loadSchema(schemaName: string) {
  const schemaPath = path.resolve(__dirname, `../../../../data/catalog/${schemaName}.schema.json`);
  const content = await fs.readFile(schemaPath, 'utf8');
  return JSON.parse(content);
}

export async function validateSchemas(data: any, schemaName: string): Promise<void> {
  const schema = await loadSchema(schemaName);
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    const errors = validate.errors?.map((e: any) => `${e.instancePath} ${e.message}`).join(', ');
    throw new Error(`Schema validation failed for ${schemaName}: ${errors}`);
  }
}
