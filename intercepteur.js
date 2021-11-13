
/*
* 
*  Copyright muzzletov !!!
*/

  (() => {
     
    console.log("-*-INTERCEPTEUR LOADED-*-");

    class XMLHttpRequestIntercepteur extends XMLHttpRequest {
      static _XMLHttpRequest = XMLHttpRequest;

      constructor() {
        super();
      }

      addEventListener(eventName, func) {
        super.addEventListener(eventName, (...e)=>func(...e));
      }

      removeEventListener(eventName, func) {
        super.removeEventListener(eventName, (...e)=>func(...e));
      }

      overrideMimeType(mimetype) { super.overrideMimeType(mimetype); }

      abort() { super.abort(); }

      getAllResponseHeaders() { return super.getAllResponseHeaders(); }

      set ontimeout(callback) {
        super.ontimeout = (e)=>callback(e);
      }

      set onerror(callback) {
        super.onerror = (e)=>callback(e);
      }

      set onabort(callback) {
        super.onabort = (e)=>callback(e);
      }

      set onloadstart(callback) {
        super.onloadstart = (e)=>callback(e);
      }

      set onload(callback) {
        super.onload = (e)=>callback(e);
      }

      set onloadend(callback) {
        super.onloadend = (e)=>callback(e);
      }


      sendAsBinary(data) {
        super.sendAsBinary(data);
      }

      setRequestHeader(name, value) {
        super.setRequestHeader(name, value);
      }

      set onloadstart(callback) {
        super.onloadstart = (e)=>callback(e);
      }

      open(...args) {
        super.open(...args);

      }

      get status() {
        return super.status;
      }

      get statusText() {
        return super.statusText;
      }

      get response() {
        return super.response;
      }

      get responseText() {
        return super.responseText;
      }

      get responseURL() {
        return super.responseURL;
      }

      get responseXML() {
        return super.responseXML;
      }

      get bytesSeen() {
        return super.bytesSeen;
      }

      get responseType() {
        return super.responseType;
      }

      set onreadystatechange(callback) {
        super.onreadystatechange = callback;
      }

      get readyState() {
        return super.readyState;
      }

      send(body) {
        super.send(body);
      }
    }
    
    XMLHttpRequest = XMLHttpRequestIntercepteur;

  })();
