$(function () {
  // --------------------- INIT ---------------------------------------------
  var recordsData = getRecordData();
  if (recordsData.length !== 0) {
    $('#result-count').text("1 Result");
    $('#result-subtext').text('Look at the result below to see the details of the person you’re searched for.');
    writeResultCard(recordsData[0]);
    $('#result-card').removeClass('d-none');
  } else {
    $('#result-count').text("0 Results");
    $("#result-subtext").text("Try starting a new search below");
  }
  // -------------------------------------------------------------------------

  function getRecordData() {
    var localStorageItem = localStorage.userObject;
    var recordsData = localStorageItem ? JSON.parse(localStorageItem) : [];
    if (!Array.isArray(recordsData)) recordsData = [recordsData];
    return recordsData;
  }

  function writeResultCard(record) {
    $('#record-name').text(record['first_name'] + ' ' + record['last_name']);
    $('#record-description').text(record['description']);
    $('#record-address').text(record['address']);
    $("#record-email").text(record['email']);

    var $recordPhoneNumbersList = $('#record-phones-list');
    record['phone_numbers'].forEach(function (phoneNumber) {
      var formattedPhone = window.utils.formatPhoneNumber(phoneNumber);
      var phoneElement = '<a href="tel: ' + phoneNumber + '">' + formattedPhone + '</a>';
      $recordPhoneNumbersList.append('<li>' + phoneElement + '</li>');
    });

    var $recordEmailList = $('#record-relatives-list');
    record['relatives'].forEach(function (relative) {
      $recordEmailList.append('<li>' + relative + '</li>');
    });
  }
});
