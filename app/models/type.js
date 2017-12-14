function Type (opts) {
  if(!opts) opts = {};
  this.name = opts.name || '';
  this.class = 'italic';
}

module.exports = Type;

