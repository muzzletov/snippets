
/*
* 
*  Copyright muzzletov !!!
*/

  (() => {

    console.log("-*-INTERCEPTEUR LOADED-*-");
    
    /**
     * TÖDÖ: implement granular urlMap, differentiate between HTTP METHODS > URLS > HEADERS
     * 
     */
    
    const urlMap = new Map();
    
    urlMap.set("https://www.google.de", {});

    class XMLHttpRequestIntercepteur extends XMLHttpRequest {
      static _XMLHttpRequest = XMLHttpRequest; // Huh?!
      
      fakeCall = false;
      fakeResult = null;
      fakeStatus;
      
      listeners = new Map();
    constructor() {
        super();
      }

      addEventListener(eventName, func) {
        this.listeners.set(eventName, func);
        super.addEventListener(eventName, (...e)=>func(...e));
      }

      removeEventListener(eventName, func) {
        this.listeners.delete(eventName);
        super.removeEventListener(eventName, (...e)=>func(...e));
      }

      overrideMimeType(mimetype) { super.overrideMimeType(mimetype); }

      abort() { super.abort(); }

      getAllResponseHeaders() { return super.getAllResponseHeaders(); }

      set ontimeout(callback) {
        if(this.fakeCall) this.listeners.set("timeout", callback);
        super.ontimeout = (e)=>callback(e);
      }

      set onerror(callback) {
        if(this.fakeCall) this.listeners.set("error", callback);
        super.onerror = (e)=>callback(e);
      }

      set onabort(callback) {
        if(this.fakeCall) this.listeners.set("abort", callback);
        super.onabort = (e)=>callback(e);
      }

      set onload(callback) {
        if(this.fakeCall) this.listeners.set("load", callback);
        super.onload = (e)=>callback(e);
      }

      set onloadend(callback) {
        if(this.fakeCall) this.listeners.set("loadend", callback);
        super.onloadend = (e)=>callback(e);
      }

      set onloadstart(callback) {
        if(this.fakeCall) this.listeners.set("loadstart", callback);
        super.onloadstart = (e)=>callback(e);
      }

      sendAsBinary(data) {
        super.sendAsBinary(data);
      }

      setRequestHeader(name, value) {
      if(!this.fakeCall)
        super.setRequestHeader(name, value);
      }

      open(...args) {
        const key = JSON.stringify(args);
        console.log(key);
        console.log(args);

        this.fakeResult = urlMap.get(key);
        this.fakeCall = this.fakeResult !== undefined;
        this.fakeStatus = this.fakeCall ? 0 : undefined;

        if(!this.fakeCall) super.open(...args);
      }

      get status() {
        return this.fakeStatus ?? super.status;
      }

      get response() {
        if(!this.fakeCall) console.log(super.response);
        return super.response;
      }

      get responseText() {
        if(!this.fakeCall) console.log(super.responseText);
        return this.fakeResult ?? super.responseText;
      }

      get responseURL() {
        return super.responseURL;
      }

      get responseXML() {
        if(!this.fakeCall) console.log(super.responseXML);
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

      fakeCalls() {
        const progressEvent = new ProgressEvent('ProgressEvent.STANDARD_OUTPUT_DATA', { });
        (this.listeners.get("loadstart") ?? ((...args) =>{})) (this, progressEvent);
        (this.listeners.get("loadend") ?? ((...args) =>{})) (this, progressEvent);
        (this.listeners.get("load") ?? ((...args) =>{})) (this, progressEvent);
      }

      send(body) {
        if(!this.fakeCall)
          super.send(body);
        else {
          this.fakeStatus = 200;
          setTimeout(this.fakeCalls.bind(this), 0);
        }
      }
    }

    XMLHttpRequest = XMLHttpRequestIntercepteur;

  })();
