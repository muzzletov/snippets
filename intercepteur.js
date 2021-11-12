
/*
* 
* 
*/

(() => {
   
   console.log("-*-INTERCEPTEUR LOADED-*-");
   
   const _XMLHttpRequest = XMLHttpRequest;
   
   class XMLHttpRequestIntercepteur {
      
     constructor() {                   
       // Let's constructeur our intercepteuring class - I feel much 🥖 (baguette) lately
       this.requestObject = new _XMLHttpRequest();
     }

     addEventListener(eventName, func) {
       this.requestObject.addEventListener(eventName, (...e)=>func(...e));
     }

     removeEventListener(eventName, func) {
      this.requestObject.removeEventListener(eventName, (...e)=>func(...e));
     }

     overrideMimeType(mimetype) { this.requestObject.overrideMimeType(mimetype); }

     abort() { this.requestObject.abort(); }

     getAllResponseHeaders() { return this.requestObject.getAllResponseHeaders(); }

     set ontimeout(callback) {
      this.requestObject.ontimeout = (e)=>callback(e);
    }

     set onerror(callback) {
      this.requestObject.onerror = (e)=>callback(e);
    }

     set onabort(callback) {
      this.requestObject.onabort = (e)=>callback(e);
    }

     set onloadstart(callback) {
      this.requestObject.onloadstart = (e)=>callback(e);
    }

     set onload(callback) {
       this.requestObject.onload = (e)=>callback(e);
     }

     set onloadend(callback) {
       this.requestObject.onloadend = (e)=>callback(e);
     }

     sendAsBinary(data) {
       this.requestObject.sendAsBinary(data);
     }

     setRequestHeader(name, value) {
       this.requestObject.setRequestHeader(name, value);
     }

     open(...args) {
       this.requestObject.open(...args);
     }

     get status() {
         return this.requestObject.status; 
     }
     
     get statusText() {
      return this.requestObject.statusText; 
      }
     get response() {
        return this.requestObject.response;
     }

     get onreadystatechange() {
       return this.requestObject.onreadystatechange;
     }

     send(body) {
       this.requestObject.send(body);
     }
   }
   
   XMLHttpRequest = XMLHttpRequestIntercepteur;

 })();
