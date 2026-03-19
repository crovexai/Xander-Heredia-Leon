document.getElementById("loginBtn").addEventListener("click", function () {
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const messageEl = document.getElementById("loginMessage");

  const email = (emailInput?.value || "").trim();
  const password = passwordInput?.value || "";

  if (!email || !password) {
    if (messageEl) {
      messageEl.textContent = "Please enter email and password.";
    }
    return;
  }

  const auth = firebase.auth();
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      if (messageEl) {
        messageEl.style.color = "#6bff95";
        messageEl.textContent = "Login successful. Redirecting...";
      }
      window.location.href = "admin.html";
    })
    .catch(function (error) {
      if (messageEl) {
        messageEl.style.color = "#ff6b6b";
        messageEl.textContent = error.message;
      }
    });
});

document.getElementById("forgotPassword").addEventListener("click", function () {
  const emailInput = document.getElementById("loginEmail");
  const messageEl = document.getElementById("loginMessage");
  const email = (emailInput?.value || "").trim();

  if (!email) {
    if (messageEl) {
      messageEl.style.color = "#ff6b6b";
      messageEl.textContent = "Enter your email first to reset password.";
    }
    return;
  }

  const auth = firebase.auth();
  auth
    .sendPasswordResetEmail(email)
    .then(function () {
      if (messageEl) {
        messageEl.style.color = "#6bff95";
        messageEl.textContent = "Password reset email sent.";
      }
    })
    .catch(function (error) {
      if (messageEl) {
        messageEl.style.color = "#ff6b6b";
        messageEl.textContent = error.message;
      }
    });
});
