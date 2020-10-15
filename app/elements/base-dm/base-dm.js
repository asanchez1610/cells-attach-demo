export class BaseDm {

  constructor(element) {
    this.ctts = window.AppConfig.ctts;
    this.events = window.AppConfig.events;
    this.services = window.AppConfig.services;
    this.element = element;
  }

  getUrlParams(path, params) {
    let urlParams = Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');
    return `${path}?${urlParams}`;
  }

  getJsonFromUrl(path) {
    let query = path;
    let result = {};
    query.split('&').forEach(function(part) {
      let item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }

  extract(data, keys, value) {
    let ret;
    if (!this.isEmpty(data) && !this.isEmpty(keys)) {
      let split = keys.split('.');
      ret = data[split.shift()];
      while (ret && split.length) {
        ret = ret[split.shift()];
      }
    }
    return this.isEmpty(ret) && value !== null ? value : ret;
  }

  isEmpty(evaluate) {
    switch (typeof(evaluate)) {
      case 'object':
        return evaluate === null || Object.keys(evaluate).length === 0;
      case 'string':
        return evaluate === '';
      case 'undefined':
        return true;
      default:
        return false;
    }
  }

  dispatch(name, detail) {
    const val = typeof detail === 'undefined' ? null : detail;
    this.element.dispatchEvent(new CustomEvent(name, {
      composed: true,
      bubbles: true,
      detail: val
    }));
  }

  requestAwait(settings) {
    return new Promise(async(resolve, reject) => {
      let settingsAwait = settings;
      settingsAwait.onSuccess = (response) => {
        resolve(response);
      };
      settingsAwait.onError = (error) => {
        reject(error);
      };
      this.element.dispatch(this.events.globalInvokeRequest, settingsAwait);
    });
  }
}