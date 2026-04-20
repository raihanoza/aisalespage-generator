import fs from 'fs';
import path from 'path';
import stripComments from 'strip-comments';

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walkSync(filepath, filelist);
    } else {
      filelist.push(filepath);
    }
  }
  return filelist;
};

const dirsToClean = [
  'app',
  'routes',
  'resources/js'
];

dirsToClean.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const isFile = fs.statSync(dir).isFile();
  const files = isFile ? [dir] : walkSync(dir);
  
  files.forEach(file => {
    if (file.endsWith('.php') || file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.jsx')) {
      const code = fs.readFileSync(file, 'utf8');
      
      // Menggunakan regex untuk PHP agar tidak menghapus comment dari blade atau framework jika error parsing
      let stripped = code;
      try {
        stripped = stripComments(code, { keepProtected: false });
      } catch (e) {
        console.error(`Failed to parse comments in ${file}`);
        return;
      }
      
      const cleanEmptyLines = stripped.replace(/\n\s*\n\s*\n/g, '\n\n');
      
      if (code !== cleanEmptyLines) {
        fs.writeFileSync(file, cleanEmptyLines, 'utf8');
        console.log(`Stripped comments in: ${file}`);
      }
    }
  });
});
