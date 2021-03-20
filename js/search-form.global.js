$(function () {
  // --------------------- INIT ---------------------------------------------
  utils.setFormValidation('#email-form', formSubmitHandler);
  utils.setFormValidation('#phone-form', formSubmitHandler)
  // -------------------------------------------------------------------------

  function formSubmitHandler(formValue) {
    localStorage.clear();
    localStorage.setItem("searchData", JSON.stringify(formValue));
    window.location.href = "search-result.html";
  }
});
