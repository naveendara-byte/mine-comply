import { readFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('./src/frontend/node_modules/xlsx/xlsx.js');

const wb = XLSX.readFile('/home/ubuntu/workspace/app/air-report.xlsx');
console.log('Sheets:', wb.SheetNames);
wb.SheetNames.forEach(name => {
  const ws = wb.Sheets[name];
  const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
  console.log('\n=== Sheet:', name, '===');
  if (data.length > 0) {
    console.log('Columns:', Object.keys(data[0]));
    console.log('Row count:', data.length);
    console.log('All rows:', JSON.stringify(data, null, 2));
  }
});
