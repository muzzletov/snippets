
const networkSettledEvent = new Event('networkSettled');

initInterceptor = () => {

   var connectionCounter = 0;
   const _open = XMLHttpRequest.prototype.open;
   const _onloadend = XMLHttpRequest.prototype.onloadend;

   XMLHttpRequest.prototype.open = function (data) {
      connectionCounter++;
      _open.call(this, data);
   };

   XMLHttpRequest.prototype.onloadend = function (data) {
      connectionCounter--;
      if (connectionCounter == 0) document.dispatchEvent(networkSettledEvent);
      _onloadend.call(this, data);
   };

   const _fetch = window.fetch;
   window.fetch = function () {
      connectionCounter++;
      return _fetch.apply(this, arguments).then((result)=> {
         connectionCounter--;
         if (connectionCounter == 0) document.dispatchEvent(networkSettledEvent);
         return result;
      });
   }
}
