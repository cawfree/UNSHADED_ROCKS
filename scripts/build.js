import child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

child_process.execSync('tsc && vite build', {stdio: 'inherit'});

fs.copyFileSync(path.resolve('404.html'), path.resolve('dist', '404.html'));
