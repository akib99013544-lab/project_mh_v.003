const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) results.push(file);
    }
  });
  return results;
}

const findStr = '`http://$(${window.location.hostname}):5000`';
const replaceStr = '(window.location.hostname === \'localhost\' || /^[0-9.]+$/.test(window.location.hostname) ? `http://${window.location.hostname}:5000` : \'\')';

walk('frontend/src').forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(findStr)) {
    content = content.split(findStr).join(replaceStr);
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
});
