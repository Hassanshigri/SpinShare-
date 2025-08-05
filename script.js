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
  $("#user-circle").addClass("d-none");
}

function restoreUserState() {
  const userState = JSON.parse(localStorage.getItem("userState"));
  if (userState && userState.isLoggedIn) {
    $("#user-name").text(userState.username);
    $("#user-details").html(
      `Name: ${userState.username}<br>Email: ${userState.email}<br>Coins: ${userState.coins}`
    );
    $("#auth-container").addClass("d-none");
    $("#user-circle").removeClass("d-none");
  } else {
    $("#user-name").text("");
    $("#user-details").text("");
    $("#auth-container").removeClass("d-none");
    $("#user-circle").addClass("d-none");
  }
}

// Initialize on page load
$(document).ready(function () {
  restoreUserState();
});
