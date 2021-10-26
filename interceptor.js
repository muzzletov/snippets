initInterceptor = () => {
   var connectionCounter = 0;
   var _open = XMLHttpRequest.prototype.open;
   var _onloadend = XMLHttpRequest.prototype.onloadend;

   XMLHttpRequest.prototype.open = function (data) {
      connectionCounter++;
      _open.call(this, data);
   };

   XMLHttpRequest.prototype.onloadend = function (data) {
      connectionCounter--;
      if (connectionCounter == 0) document.dispatchEvent(new NetworkSettledEvent());
      _onloadend.call(this, data);
   };

   const _fetch = window.fetch;
   window.fetch = function () {
      connectionCounter++;
      return _fetch.apply(this, arguments).then((result)=> {
         connectionCounter--;
         return result;
      });
   }
}
