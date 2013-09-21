var fs   = require('fs')
  , path = require('path');

module.exports = function(dir, search, exclude) {
  var fullPath    = null
    , stat        = null
    , directories = []
    , directory, contents, i, j;

  exclude = exclude || [];
  if (typeof exclude === 'string' && exclude.length > 0) exclude = [exclude];

  if (!fs.existsSync(dir)) return null;

  if (fs.statSync(dir).isFile()) {
    if (dir === search) return dir;
    return null;
  }

  contents = fs.readdirSync(dir);

  for (i = 0; i < contents.length; i++) {
    if (exclude.indexOf(contents[i]) >= 0) continue;

    fullPath = path.join(dir, contents[i]);
    stat = fs.lstatSync(fullPath);

    if (stat.isSymbolicLink()) continue;

    if (stat.isDirectory()) {
      directories.push(fullPath);
      continue;
    }

    if (contents[i] === search) return fullPath;
  }

  while ((directory = directories.pop())) {
    contents = fs.readdirSync(directory);

    for (j = 0; j < contents.length; j++) {
      if (exclude.indexOf(contents[j]) >= 0) continue;

      fullPath = path.join(directory, contents[j]);
      stat = fs.lstatSync(fullPath);

      if (stat.isSymbolicLink()) continue;

      if (stat.isDirectory()) {
        directories.push(fullPath);
        continue;
      }

      if (contents[j] === search) return path.join(directory, contents[j]);
    }
  }

  return null;
};
