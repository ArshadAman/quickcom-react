import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, 'src');

function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else if (file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = findFiles(directoryPath);

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('<motion.')) {
    if (!content.includes('import { motion } from \'framer-motion\'') && 
        !content.includes('import { motion,') && 
        !content.includes(', motion }')) {
      
      if (content.includes('import { AnimatePresence } from \'framer-motion\'')) {
        content = content.replace(
          'import { AnimatePresence } from \'framer-motion\'',
          'import { motion, AnimatePresence } from \'framer-motion\''
        );
      } else {
        // Just add to the top, after React import
        content = content.replace(
          /import React(.*) from 'react';/, 
          `import React$1 from 'react';\nimport { motion } from 'framer-motion';`
        );
      }
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Restored motion in ${file}`);
    }
  }
});
