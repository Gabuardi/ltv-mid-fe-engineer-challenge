$(function () {
  // --------------------- INIT ---------------------------------------------
  var searchData = localStorage.searchData;

  (function initSearchResultPage(sectionTransition) {
    var records = getRecordData();
    if (records && records.length !== 0) {
      // User landing to search result page with a record found
      $('#result-count').text("1 Result");
      $('#result-subtext').text('Look at the result below to see the details of the person you’re searched for.');
      writeResultCard(records[0]);
      $('#result-card').removeClass('d-none');
      sectionTransition();
    } else if (records && records.length === 0) {
      // User landing to search result page with NO record found
      $('#result-count').text("0 Results");
      $("#result-subtext").text("Try starting a new search below");
      $('#result-card').addClass('d-none');
      sectionTransition();
    } else if (searchData) {
      // User landing to search result page with no record searched
      searchData = JSON.parse(searchData);
      var searchRequest = window.utils.searchRecord(searchData);
      searchRequest.done(function (requestResponse) {
        var searchResult = JSON.stringify(requestResponse);
        console.log(requestResponse);
        localStorage.setItem('recordsData', searchResult);
        initSearchResultPage(showResultTransition);
      });
    }
  })(showExistentRecordTransition);

  // -------------------------------------------------------------------------

  function getRecordData() {
    var localStorageItem = localStorage.recordsData;
    var recordsData = localStorageItem && JSON.parse(localStorageItem);
    if (recordsData && !Array.isArray(recordsData)) recordsData = [recordsData];
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

  function showExistentRecordTransition() {
    $('#searching-section').hide();
    $('#result-section').show();
  }

  function showResultTransition() {
    $('#searching-section').fadeOut();
    $('#result-section').fadeIn();
  }
});
