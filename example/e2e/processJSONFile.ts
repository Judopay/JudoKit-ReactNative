import fs from 'fs';
import path from 'path';

const deepMerge = (target: any, source: any) => {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && target[key] instanceof Object) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
};

const processJSONFile = (
  fileName: string,
  replacements: { [key: string]: any }
) => {
  const filePath = path.resolve(__dirname, fileName);

  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(rawData);

  deepMerge(jsonData, replacements);

  const jsonString = JSON.stringify(jsonData);
  const base64Settings = Buffer.from(jsonString).toString('base64');

  return base64Settings;
};

export { processJSONFile };
