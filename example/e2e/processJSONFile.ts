import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const deepMerge = (target: any, source: any) => {
  _.merge(target, source);
};

const processJSONFile = (
  fileName: string,
  replacements: { [key: string]: any }
) => {
  try {
    const filePath = path.resolve(__dirname, fileName);

    const rawData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(rawData);

    deepMerge(jsonData, replacements);

    const jsonString = JSON.stringify(jsonData);
    const base64Settings = Buffer.from(jsonString).toString('base64');

    return base64Settings;
  } catch (error) {
    console.error('Error processing JSON file:', error);
    return '';
  }
};

export { processJSONFile };
