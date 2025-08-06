"use strict";

// Authentication Modal
function showAuthModal() {
    $("#authModal").fadeIn(300);
    $(".overlay").addClass("active");
    openTab("login");
    $("#modalTitle").text("Sign In");
}

function closeModal() {
    $("#authModal").fadeOut(300);
    $(".overlay").removeClass("active");
}

function showAlertModal(message) {
    $("#alertMessage").text(message);
    $("#alertModal").fadeIn(300);
    $(".overlay").addClass("active");
}

function closeAlertModal() {
    $("#alertModal").fadeOut(300);
    $(".overlay").removeClass("active");
}

function closeSuccessPopup() {
    $("#successPopup").fadeOut(300);
    $(".overlay").removeClass("active");
}

function openTab(tabName) {
    $(".tab-link").removeClass("active");
    $(".tab-content").removeClass("active");
    $(`.tab-link[onclick="openTab('${tabName}')"]`).addClass("active");
    $(`#${tabName}`).addClass("active");
    $("#modalTitle").text(tabName === "login" ? "Sign In" : "Register");
}

function login() {
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();
    if (email && password) {
        localStorage.setItem(
            "userState",
            JSON.stringify({
                isLoggedIn: true,
                username: email.split("@")[0],
                email: email,
                coins: 5000,
            })
        );
        $("#user-name").text(email.split("@")[0]);
        $("#user-details").html(`Name: ${email.split("@")[0]}<br>Email: ${email}<br>5000 coins available`);
        $("#auth-container").addClass("d-none");
        $("#user-circle").removeClass("d-none");
        closeModal();
    } else {
        showAlertModal("Please enter both email and password.");
    }
}

function register() {
    const username = $("#registerUsername").val();
    const email = $("#registerEmail").val();
    const password = $("#registerPassword").val();
    if (username && email && password) {
        localStorage.setItem(
            "userState",
            JSON.stringify({
                isLoggedIn: true,
                username: username,
                email: email,
                coins: 5000,
            })
        );
        $("#user-details").html(`Name: ${username}<br>Email: ${email}<br>5000 coins available`);
        $("#user-name").text(username);
        $("#auth-container").addClass("d-none");
        $("#user-circle").removeClass("d-none");
        closeModal();
    } else {
        showAlertModal("Please fill in all fields.");
    }
}

function logout() {
    localStorage.removeItem("userState");
    $("#user-name").text("");
    $("#user-details").html("");
    $("#auth-container").removeClass("d-none");
    $("#user-circle").addClass("d-none").removeClass("show");
}

function restoreUserState() {
    const userState = JSON.parse(localStorage.getItem("userState"));
    if (userState && userState.isLoggedIn) {
        $("#user-name").text(userState.username);
        $("#user-details").html(`Name: ${userState.username}<br>Email: ${userState.email}<br>5000 coins available`);
        $("#auth-container").addClass("d-none");
        $("#user-circle").removeClass("d-none");
    } else {
        $("#user-name").text("");
        $("#user-details").html("");
        $("#auth-container").removeClass("d-none");
        $("#user-circle").addClass("d-none").removeClass("show");
    }
}

function toggleDropdown(event) {
    event.stopPropagation();
    console.log("User circle clicked, toggling dropdown");
    $("#user-circle").toggleClass("show");
}

function acceptCookies() {
    localStorage.setItem("cookieConsent", "accepted");
    $("#cookiePopup").fadeOut(300);
}

function declineCookies() {
    localStorage.setItem("cookieConsent", "declined");
    $("#cookiePopup").fadeOut(300);
}

function handleFormSubmission(event) {
    event.preventDefault();
    const fname = $("#fname").val();
    const lname = $("#lname").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    const msg = $("#msg").val();
    if (fname && lname && email && phone && msg) {
        $("#contactForm")[0].reset();
        $("#successPopup").fadeIn(300);
        $(".overlay").addClass("active");
    } else {
        showAlertModal("Please fill in all fields.");
    }
}

$(document).ready(function () {
    restoreUserState();
    $("#user-circle").on("click", toggleDropdown);
    $(document).on("click", function (event) {
        if (!$(event.target).closest("#user-circle").length) {
            console.log("Clicked outside user-circle, hiding dropdown");
            $("#user-circle").removeClass("show");
        }
    });
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
        $("#cookiePopup").fadeIn(300);
    }
});
