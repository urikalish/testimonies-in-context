function initTic() {
  setTimeout(function() {
        angular.element(document.body).injector().get('ticServ').init();
      }, 1000);
}
