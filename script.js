"use strict";

// Authentication Modal
function showAuthModal() {
  $("#authModal").fadeIn(300); // Fade-in animation for modal
  $(".overlay").addClass("active");
}

function closeModal() {
  $("#authModal").fadeOut(300); // Fade-out animation for modal
  $(".overlay").removeClass("active");
}

function openTab(tabName) {
  $(".tab-link").removeClass("active");
  $(".tab-content").removeClass("active");
  $(`.tab-link[onclick="openTab('${tabName}')"]`).addClass("active");
  $(`#${tabName}`).addClass("active");
}

function login() {
  const email = $("#loginEmail").val();
  const password = $("#loginPassword").val();
  if (email && password) {
    // Basic validation
    // Save user state to localStorage
    localStorage.setItem(
      "userState",
      JSON.stringify({
        isLoggedIn: true,
        username: email.split("@")[0],
        email: email,
        coins: 5000,
      })
    );
    // Update UI
    $("#user-name").text(email.split("@")[0]);
    $("#user-details").text(
      `Name: ${email.split("@")[0]}\nEmail: ${email}\nCoins: 5000`
    );
    $("#auth-container").addClass("d-none");
    $("#user-circle").removeClass("d-none");
    closeModal();
  } else {
    alert("Please enter both email and password.");
  }
}

function register() {
  const username = $("#registerUsername").val();
  const email = $("#registerEmail").val();
  const password = $("#registerPassword").val();
  if (username && email && password) {
    // Basic validation
    // Save user state to localStorage
    localStorage.setItem(
      "userState",
      JSON.stringify({
        isLoggedIn: true,
        username: username,
        email: email,
        coins: 5000,
      })
    );
    // Update UI
    $("#user-name").text(username);
    $("#user-details").text(`Name: ${username}\nEmail: ${email}\nCoins: 5000`);
    $("#auth-container").addClass("d-none");
    $("#user-circle").removeClass("d-none");
    closeModal();
  } else {
    alert("Please fill in all fields.");
  }
}

function logout() {
  // Clear user state from localStorage
  localStorage.removeItem("userState");
  // Reset UI
  $("#user-name").text("");
  $("#user-details").text("");
  $("#auth-container").removeClass("d-none");
  $("#user-circle").addClass("d-none").removeClass("show"); // Changed from removeClass("d-none") to addClass("d-none")
}

function restoreUserState() {
  const userState = JSON.parse(localStorage.getItem("userState"));
  if (userState && userState.isLoggedIn) {
    $("#user-name").text(userState.username);
    $("#user-details").text(
      `Name: ${userState.username}\nEmail: ${userState.email}\nCoins: ${userState.coins}`
    );
    $("#auth-container").addClass("d-none");
    $("#user-circle").removeClass("d-none");
  } else {
    $("#user-name").text("");
    $("#user-details").text("");
    $("#auth-container").removeClass("d-none");
    $("#user-circle").addClass("d-none").removeClass("show");
  }
}

function toggleDropdown(event) {
  event.stopPropagation(); // Prevent click from bubbling to document
  $("#user-circle").toggleClass("show");
}

// Initialize on page load
$(document).ready(function () {
  restoreUserState();
  // Toggle dropdown on user circle click
  $("#user-circle").on("click", toggleDropdown);
  // Close dropdown when clicking outside
  $(document).on("click", function (event) {
    if (!$(event.target).closest("#user-circle").length) {
      $("#user-circle").removeClass("show");
    }
  });
});
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    $('#cookiePopup').fadeOut(300);
}
function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    $('#cookiePopup').fadeOut(300);
}
$(document).ready(function() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        $('#cookiePopup').fadeIn(300);
    }
});