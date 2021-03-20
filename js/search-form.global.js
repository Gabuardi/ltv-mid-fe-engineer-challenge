$(function () {
  // --------------------- INIT ---------------------------------------------
  var $formSwitchButtons = $('.js-form-switch-btn');
  var $formSwitchTargets = $('.js-form-switch-target');
  $formSwitchButtons.click(formSwitchTriggerClickHandler);
  utils.setFormValidation('#email-form', formSubmitHandler);
  utils.setFormValidation('#phone-form', formSubmitHandler);
  // -------------------------------------------------------------------------
  function formSwitchTriggerClickHandler() {
    $formSwitchButtons.toggleClass('active')
    $formSwitchTargets.toggleClass('d-none');
  }

  function formSubmitHandler(formValue) {
    localStorage.clear();
    localStorage.setItem("searchData", JSON.stringify(formValue));
    window.location.href = "search-result.html";
  }
});
