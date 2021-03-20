window.utils = (function utils() {

  // ===========================================================================================
  function setFormValidation(formSelector, submitHandler) {
    var $form = $(formSelector);
    var formHTMLElement = $form[0];
    var $formInputs = $form.find('input');

    function inputValidationOnSubmit(index, input) {
      var $input = $(input);
      input.checkValidity() ? $input.removeClass('invalid') : $input.addClass('invalid');
    }

    function serializeFormObject() {
      var serializedArray = $form.serializeArray();
      var serializedObject = {};
      serializedArray.forEach(function (formItem) {
        serializedObject[formItem.name] = formItem.value;
      });
      return serializedObject;
    }

    $formInputs.on('input', function () {
      if (this.checkValidity()) $(this).removeClass('invalid');
    });

    $form.submit(function (event) {
      event.preventDefault();
      $formInputs.each(inputValidationOnSubmit);
      if (formHTMLElement.checkValidity()) {
        var formValue = serializeFormObject()
        submitHandler(formValue)
      }
    });
  }

  // ===========================================================================================
  function searchRecord(searchData) {
    var searchQueryString = $.param(searchData);
    var url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?' + searchQueryString;
    return $.get(url);
  }

  // ===========================================================================================
  function formatPhoneNumber(phoneNumber) {
    return '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + "-" + phoneNumber.substring(6, 10);
  }

  return {
    setFormValidation: setFormValidation,
    searchRecord: searchRecord,
    formatPhoneNumber: formatPhoneNumber
  }
})();

