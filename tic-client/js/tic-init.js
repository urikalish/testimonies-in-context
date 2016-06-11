function initTic() {
  setTimeout(function() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      var errMsgCtrl = document.getElementById('browser-not-supported');
      errMsgCtrl.style.display = 'none';
      document.getElementById('tic-container').style.display = 'block';
      angular.element(document.body).injector().get('ticServ').init();
    }
  }, 1000);
}
