$(function () {
  function submitFormHandler(formValue) {
    localStorage.clear(); //Clears storage for next request
    email = formValue.email.toLowerCase();
    const proxyurl = "";
    const url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
    fetch(proxyurl + url)
      .then((response) => response.text())
      .then(function (contents) {
        localStorage.setItem("userObject", contents);
        window.location.href = "search-result.html";
      })
      .catch((e) => console.log(e));
  }

  utils.setFormValidation('#search-form', submitFormHandler);
});
