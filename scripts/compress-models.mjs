/**
 * compress-models.mjs
 * Applies Draco compression + mesh optimization to all GLB models.
 * Run: node scripts/compress-models.mjs
 */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { draco, dedup, prune, resample, quantize } from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelsDir = path.join(__dirname, '../public/model_glb');

const MODELS = [
  { in: 'ship.glb',      out: 'ship_c.glb' },
  { in: 'man.glb',       out: 'man_c.glb' },
  { in: 'blackhole.glb', out: 'blackhole_c.glb' },
];

async function compress() {
  const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({
      'draco3d.encoder': await draco3d.createEncoderModule(),
      'draco3d.decoder': await draco3d.createDecoderModule(),
    });

  for (const { in: inFile, out: outFile } of MODELS) {
    const inPath  = path.join(modelsDir, inFile);
    const outPath = path.join(modelsDir, outFile);

    if (!fs.existsSync(inPath)) {
      console.warn(`⚠ ${inFile} not found, skipping.`);
      continue;
    }

    console.log(`\n🔧 Compressing ${inFile} ...`);
    const inSize = (fs.statSync(inPath).size / 1024 / 1024).toFixed(1);

    const doc = await io.read(inPath);

    await doc.transform(
      dedup(),                  // remove duplicate meshes/textures
      prune(),                  // remove unused nodes
      resample(),               // resample animations
      draco({                   // Draco geometry compression
        compressionLevel: 7,
        quantizationVolume: 'mesh',
      }),
    );

    await io.write(outPath, doc);
    const outSize = (fs.statSync(outPath).size / 1024 / 1024).toFixed(1);
    console.log(`  ✓ ${inFile}: ${inSize} MB → ${outSize} MB`);
  }

  console.log('\n✅ All models compressed!\n');
}

compress().catch(err => {
  console.error('Compression failed:', err);
  process.exit(1);
});
