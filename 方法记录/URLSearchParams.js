/*
 * @Author: guo.mk 
 * @Date: 2018-03-13 18:28:52 
 * @Last Modified by: guo.mk
 * @Last Modified time: 2018-03-13 20:56:00
 */
if (URLSearchParams) {
  return URLSearchParams;
} else {
  return URLParams;
}

/**
 * Creates an instance of URLParams.
 * simulation URLSearchParams api
 * @param {string} [str="?"]  location.search
 * @memberof URLParams
 */
class URLParams {
  constructor(str = "?") {
    this.params = null;
    this.ini(str)
  }
  ini(str) {
    const ret = str.substring(1).split("&").reduce((obj, i) => {
      let m = i.split("=");
      let key = m[0];
      let val = m[1];

      if (obj[key]) {
        val = [...obj[key], val]
      }

      obj[key] = val;
      return obj
    }, {});
    this.params = ret;
  }
  get(paramStr = "") {
    return this.params[paramStr] && this.params[paramStr][0];
  }
  getAll(paramStr = "") {
    return this.params[paramStr];
  }
  has(paramStr = "") {
    return Boolean(this.params[paramStr]);
  }
  _keysArr() {
    let keys = []
    for (let i in this.params) {
      if (Array.isArray(this.params[i])) {
        keys = [...keys, ...Array(this.params[i].length).fill(i)]
      } else {
        keys.push(i)
      }
    }
    return keys
  }
  * keys() {
    return yield* this._keysArr()
  }
  toString() {
    const values = this._keysArr()
    const keys = this._valuesArr();
    const strArr = keys.reduce((m, i, idx) => {
      m.push(values[idx] + '=' + keys[idx])
      return m;
    }, [])
    return strArr.join("&")
  }
  _valuesArr() {
    return [].concat(...Object.values(this.params))
  }
  *values() {
    return yield* this._valuesArr()
  }
  append(key, value) {
    if (this.params[key]) {
      this.params[key].push(value)
    } else {
      this.params[key] = value
    }
  }
  delete(paramStr = "") {
    delete this.params[paramStr]
  }
  set(key, value) {
    if (this.params[key]) {
      this.params[key] = value
    } else {
      this.append(key, value)
    }
  }
  entries() {
    const values = this._keysArr()
    const keys = this._valuesArr();
    const strArr = keys.reduce((m, i, idx) => {
      let ret = [values[idx], keys[idx]];
      m.push(ret);
      return m;
    }, [])
    return strArr
  }
}