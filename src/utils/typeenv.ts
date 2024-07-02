import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import * as process from 'node:process';

// 加载 .env 文件中的环境变量
dotenv.config();

const env = process.env;
const envVariables = Object.keys(env)
  .filter((key) => {
    if (key.startsWith('VITE_') || ['MONGODB_URL'].includes(key)) {
      console.log(`Exporting ${key}`);
      return true;
    }
  })
  .map((key) => `export const ${key} = ${JSON.stringify(env[key])};`)
  .join('\n');

const outputDir = path.resolve(process.cwd(), 'src');
const outputFilePath = path.join(outputDir, 'const.ts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFilePath, envVariables);

console.log(`Environment constants generated at ${outputFilePath}`);
