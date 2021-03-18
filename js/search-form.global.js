$(function () {
  // --------------------- INIT ---------------------------------------------
  utils.setFormValidation('#search-form', submitFormHandler);
  // -------------------------------------------------------------------------

  function submitFormHandler(formValue) {
    var email = formValue.email.toLowerCase();
    localStorage.clear();
    localStorage.setItem("searchEmail", email);
    window.location.href = "search-result.html";
  }
});
