var curDateStr;

function registerDateChangeListener() {
  $(ctrlSelector.DATE_SLIDER).on('input', function() {
    onDateChange(this.value);
  });
}

function onDateChange(value) {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var year = Math.trunc(value / 12) + 1936;
  var month = value % 12 + 1;
  curDateStr = monthNames[month - 1] + ' ' + year;
  $(ctrlSelector.MAP_PANEL_TEXT)[0].innerHTML = curDateStr;
  var fromDate = year + (month < 10 ? '0' : '') + month + '01';
  var toDate = year + (month < 10 ? '0' : '') + month + '31';
  sendServerRequest(fromDate, toDate);
}
