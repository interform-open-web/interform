class Cache {
  constructor() {
    this.c = {}
  }

  notEmpty() {
    return Object.keys(this.c).length !== 0;
  }

  entries() {
    return Object.entries(this.c);
  }

  has(key) {
    return this.c.hasOwnProperty(key)
  }

  set(key, value) {
    this.c[key] = value
  }

  get(key) {
    return this.c[key]
  }
}

module.exports = Cache
