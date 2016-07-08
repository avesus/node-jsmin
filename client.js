var jsmin = require('./jsmin').jsmin;

var fs = require('fs');

var combineSMap = require('combine-source-map');

// This can be unnecessary in piping bundler use case
var inlineSourceMapComment = require('inline-source-map-comment');

var SourceMapGenerator = require('./lib/sourcemap');

var origSourceAndMap = fs.readFileSync('./src.js', 'utf-8');

var origSource = combineSMap.removeComments(origSourceAndMap);

var origSMap = JSON.parse(fs.readFileSync('./src.js.map', 'utf-8'));




var sMap = SourceMapGenerator({
  orig: origSMap,
  orig_line_diff: 0,
  dest_line_diff: 0,

  file: "script.js",
  root: "http://example.com/app/js/"
});

/*
sMap.addMapping({
  generated: {
    line: 10,
    column: 35
  },
  source: "foo.js",
  original: {
    line: 33,
    column: 2
  },
  name: "christopher"
});
*/

// process.exit(0);

var minimized = jsmin(origSource, 2,
  function onNewPart (gen_line, gen_col, orig_line, orig_col, name) {
    // sMap.add('./src.js', gen_line, gen_col, orig_line, orig_col, name);
  });

var result = minimized + '\n' + inlineSourceMapComment(sMap.get(), { sourcesContent: true });

fs.writeFileSync('./script.js', result, 'utf-8');

/*
if (comment) {
    // var sMapOffset = require('combine-source-map').create();
    // sMapOffset.addFile();
    
    return comment + '\n' + ret;
  }
*/


