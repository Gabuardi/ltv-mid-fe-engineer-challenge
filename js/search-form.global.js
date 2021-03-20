$(function () {
  // --------------------- INIT ---------------------------------------------
  utils.setFormValidation('#email-form', emailFormSubmitHandler);
  // utils.setFormValidation('#phone-form', )
  // -------------------------------------------------------------------------

  function emailFormSubmitHandler(formValue) {
    var email = formValue.email.toLowerCase();
    var searchData = {email: email};
    localStorage.clear();
    localStorage.setItem("searchData", JSON.stringify(searchData));
    window.location.href = "search-result.html";
  }
});
