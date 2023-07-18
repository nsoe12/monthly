const maleRadio = document.querySelector(".member-gender1");
const femaleRadio = document.querySelector(".member-gender2");

maleRadio.addEventListener("click", function () {
  femaleRadio.checked = false;
});

femaleRadio.addEventListener("click", function () {
  maleRadio.checked = false;
});

const allAgreeCheckbox = document.querySelector(".checkbox1");
const agreeCheckboxes = document.querySelectorAll(".agree-checkbox");

allAgreeCheckbox.addEventListener("change", function () {
  const isChecked = allAgreeCheckbox.checked;

  agreeCheckboxes.forEach(function (checkbox) {
    checkbox.checked = isChecked;
  });
});

agreeCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    if (!this.checked) {
      allAgreeCheckbox.checked = false;
    } else {
      const isAllChecked = Array.from(agreeCheckboxes).every(function (
        checkbox
      ) {
        return checkbox.checked;
      });
      allAgreeCheckbox.checked = isAllChecked;
    }
  });
});

const memberIDInput = document.querySelector(".member-id");
const warning1 = document.querySelector(".warning1");
const warning5 = document.querySelector(".warning5");
const info1 = document.querySelector(".info1");

memberIDInput.addEventListener("input", function () {
  const inputText = memberIDInput.value.trim();
  const inputLength = inputText.length;
  const hasEnglish = /[a-zA-Z]/.test(inputText);
  const hasNumber = /[0-9]/.test(inputText);
  const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(inputText);

  if (inputText === "") {
    warning5.style.display = "none";
    warning1.style.display = "none";
    info1.style.display = "none";
  } else if (inputLength < 4 || !hasEnglish || !hasNumber || isKorean) {
    warning1.style.display = "block";
    warning5.style.display = "none";
    info1.style.display = "none";
  } else {
    $.ajax({
      url: '/users/checkId',
      type: 'get',
      data: {userId: inputText},
      success: function (result) {
        if (result == 1) {
          warning1.style.display = "none";
          info1.style.display = "none";
          warning5.style.display = "block";
        } else {
          warning1.style.display = "none";
          warning5.style.display = "none";
          info1.style.display = "block";
        }
      },
      error: function (a, b, c) {
        console.log(c);
      }
    });
  }
});

memberIDInput.addEventListener("blur", function () {
  const inputText = memberIDInput.value.trim();
  if (inputText === "") {
    warning1.style.display = "none";
    info1.style.display = "none";
  }
});

const memberPasswordInput = document.querySelector(".member-password");
const warning2 = document.querySelector(".warning2");
const info2 = document.querySelector(".info2");

memberPasswordInput.addEventListener("input", function () {
  const password = memberPasswordInput.value;

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const lengthValid = password.length >= 8 && password.length <= 16;
  const complexityValid =
    hasLowerCase + hasUpperCase + hasNumber + hasSpecialChar >= 3;

  if (password === "") {
    warning2.style.display = "none";
    info2.style.display = "none";
  } else if (!lengthValid || !complexityValid) {
    warning2.style.display = "block";
    info2.style.display = "none";
  } else {
    warning2.style.display = "none";
    info2.style.display = "block";
  }
});

memberPasswordInput.addEventListener("blur", function () {
  const password = memberPasswordInput.value;

  if (password === "") {
    warning2.style.display = "none";
    info2.style.display = "none";
  }
});

function validatePassword() {
  var password = document.querySelector(".member-password").value;
  var confirmPassword = document.querySelector(
    ".member-password_confirm"
  ).value;
  var warningMsg = document.querySelector(".warning3");
  var infoMsg = document.querySelector(".info3");

  if (confirmPassword === "") {
    warningMsg.style.display = "none";
    infoMsg.style.display = "none";
  } else if (password === confirmPassword) {
    warningMsg.style.display = "none";
    infoMsg.style.display = "block";
  } else {
    warningMsg.style.display = "block";
    infoMsg.style.display = "none";
  }
}

document
  .querySelector(".member-password_confirm")
  .addEventListener("input", validatePassword);

const memberEmailInput = document.querySelector(".member-email");
const warning4 = document.querySelector(".warning4");
const info4 = document.querySelector(".info4");
let isInputValid = false;

memberEmailInput.addEventListener("input", function () {
  const email = memberEmailInput.value.trim();
  const validEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (email === "") {
    warning4.style.display = "none";
    info4.style.display = "none";
  } else if (validEmailRegex.test(email)) {
    const domain = email.split("@")[1];
    const validDomains = [".com", ".net", ".org"];

    if (validDomains.some((validDomain) => domain.endsWith(validDomain))) {
      warning4.style.display = "none";
      info4.style.display = "block";
      isInputValid = true;
    } else {
      warning4.style.display = "block";
      info4.style.display = "none";
      isInputValid = false;
    }
  } else {
    warning4.style.display = "block";
    info4.style.display = "none";
    isInputValid = false;
  }
});

memberEmailInput.addEventListener("blur", function () {
  if (!isInputValid) {
    warning4.style.display = "none";
    info4.style.display = "none";
  }
});

const noSubmitButton = document.querySelector(".no-submit-button");
const submitButton = document.querySelector(".submit-button");

// 상위 버튼 및 하위 버튼들의 상태 확인
function checkAllAgree() {
  let allChecked = allAgreeCheckbox.checked;

  if (allChecked) {
    agreeCheckboxes.forEach(function (checkbox) {
      if (!checkbox.checked) {
        allChecked = false;
      }
    });
  }

  return allChecked;
}

function toggleSubmitButton() {
  const isGenderSelected = maleRadio.checked || femaleRadio.checked; // 성별 라디오 버튼 체크 여부 확인
  const yearSelect = document.querySelector(".member-birth-year");
  const monthSelect = document.querySelector(".member-birth-month");
  const daySelect = document.querySelector(".member-birth-day");
  const isBirthdayValid = yearSelect.value && monthSelect.value && daySelect.value;

  if (isGenderSelected && checkAllAgree() && isInfoVisible() && isBirthdayValid) {
    noSubmitButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    noSubmitButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
}

// 입력란 검증 함수
function validateForm() {
  var firstName = document.querySelector(".member-firstName").value;
  var lastName = document.querySelector(".member-lastName").value;
  var email = document.querySelector(".member-email").value;
  var password = document.querySelector(".member-password").value;
  var confirmPassword = document.querySelector(
    ".member-password_confirm"
  ).value;

  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    return false;
  } else {
    return true;
  }
}

// 정보문구가 보여지는지 확인하는 함수
function isInfoVisible() {
  var info1 = document.querySelector(".info1");
  var info2 = document.querySelector(".info2");
  var info3 = document.querySelector(".info3");
  var info4 = document.querySelector(".info4");

  return (
    info1.style.display === "block" &&
    info2.style.display === "block" &&
    info3.style.display === "block" &&
    info4.style.display === "block"
  );
}

// 상위 버튼 클릭 이벤트 처리
allAgreeCheckbox.addEventListener("change", function () {
  agreeCheckboxes.forEach(function (checkbox) {
    checkbox.checked = allAgreeCheckbox.checked;
  });

  toggleSubmitButton();
});

// 하위 버튼들의 체크 상태 변화 이벤트 처리
agreeCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    toggleSubmitButton();
  });
});

// 입력란 변화 이벤트 처리
const inputFields = document.querySelectorAll(".member-input");
inputFields.forEach(function (input) {
  input.addEventListener("input", function () {
    toggleSubmitButton();
  });
});

window.addEventListener("DOMContentLoaded", function () {
  var submitButton = document.querySelector(".no-submit-button");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // 기본 동작 방지

    alert(
      "완료되지 않은 항목이 있습니다. 기본 정보의 필수 항목이나 약관 동의 여부를 확인해주세요."
    );
  });
});