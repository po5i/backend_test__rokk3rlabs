function Brand (opts) {
  if(!opts) opts = {};
  this.name = opts.name || '';
  this.class = opts.class || 'bold';
}

module.exports = Brand;

