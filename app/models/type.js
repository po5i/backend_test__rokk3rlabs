function Type (opts) {
  if(!opts) opts = {};
  this.name = opts.name || '';
  this.class = opts.class || 'italic';
}

module.exports = Type;

