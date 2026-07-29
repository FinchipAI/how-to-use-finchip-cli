#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { createReadStream, realpathSync, statSync } from 'node:fs';

function emit(payload, exitCode) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
  process.exitCode = exitCode;
}

function normalizeExpected(value) {
  const normalized = String(value || '').trim().toLowerCase().replace(/^0x/, '');
  if (!/^[0-9a-f]{64}$/.test(normalized)) {
    throw new Error('Expected SHA-256 must be 64 hexadecimal characters, with an optional 0x prefix.');
  }
  return normalized;
}

async function sha256(path) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest('hex');
}

async function main() {
  const [file, expectedValue, ...extra] = process.argv.slice(2);
  if (!file || !expectedValue || extra.length) {
    emit({
      ok: false,
      code: 'SHA256_VERIFY_INVALID',
      error: 'Usage: node verify-sha256.mjs <file> <expected-sha256>',
    }, 2);
    return;
  }

  try {
    const path = realpathSync(file);
    if (!statSync(path).isFile()) throw new Error('Target must be a regular file.');
    const expected = normalizeExpected(expectedValue);
    const actual = await sha256(path);
    const matched = actual === expected;
    emit({
      ok: matched,
      code: matched ? 'SHA256_MATCH' : 'SHA256_MISMATCH',
      path,
      expected: `0x${expected}`,
      actual: `0x${actual}`,
    }, matched ? 0 : 1);
  } catch (error) {
    emit({
      ok: false,
      code: 'SHA256_VERIFY_FAILED',
      error: error instanceof Error ? error.message : 'SHA-256 verification failed.',
    }, 2);
  }
}

await main();
