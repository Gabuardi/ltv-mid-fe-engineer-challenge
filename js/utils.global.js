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

  return {
    setFormValidation: setFormValidation
  }
})();

