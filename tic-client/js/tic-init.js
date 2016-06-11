function initTic() {
  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    document.getElementById('tic-container').style.display = 'block';
    setTimeout(function() { angular.element(document.body).injector().get('ticServ').init(); }, 1000);
  } else {
    var errMsgCtrl = document.getElementById('error-message');
    errMsgCtrl.innerHTML = 'Your browser type is not yet supported, please use Chrome.';
    errMsgCtrl.style.display = 'inline';
  }
}
