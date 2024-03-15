//the $ function
var $ = function (id) {
  return document.getElementById(id);
};

var processEntry = function () {
  isValid = true;

  //get the values for user entries
  var name = $("name").value;
  var email = $("email").value;
  var phone = $("phone").value;

  //check user entries for validity
  if (name == "" || !isNaN(name)) {
    $("name").nextElementSibling.firstChild.nodeValue =
      "Please enter a valid name";
    isValid = false;
  } else {
    $("name").nextElementSibling.firstChild.nodeValue = "";
  }

  if (email == "") {
    $("email").nextElementSibling.firstChild.nodeValue =
      "Please enter a valid email";
    isValid = false;
  } else {
    $("email").nextElementSibling.firstChild.nodeValue = "";
  }

  // Test the phoneNumber against the pattern

  var phonePattern = /^\d{3}-\d{3}-\d{4}$/;

  if (!phonePattern.test(phone)) {
    $("phone").nextElementSibling.firstChild.nodeValue =
      "Please enter a valid phone number";
    isValid = false;
  } else {
    $("phone").nextElementSibling.firstChild.nodeValue = "";
  }

  //validate the square foot entry
  var feet = parseFloat($("feet").value);
  if (isNaN(feet) || feet <= 0) {
    $("feet").nextElementSibling.firstChild.nodeValue =
      "Please enter a number greater than 0";
    isValid = false;
  } else {
    $("feet").nextElementSibling.firstChild.nodeValue = "";
  }
  if (isValid == true) {
    $("total").value = calculateTotal(feet);
  }
};

//once all fields are validated, calculate function
var calculateTotal = function (feet) {
  var total = feet * 75;
  total = total.toFixed(2);
  alert("Your estimate cost is $" + total);
  return total;
};

window.onload = function () {
  $("calculate").onclick = processEntry;
  $("name").focus();
};
