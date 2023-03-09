#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';

const args = process.argv.slice(2);
const subdomain = args[0];

const child = spawn(
  path.join(process.cwd(), 'index.js'),
  [subdomain],
  { stdio: 'inherit' }
);

child.on('exit', (code) => {
  process.exit(code);
});