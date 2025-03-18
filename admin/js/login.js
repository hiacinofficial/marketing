checkLogin();

function checkLogin() {
  if (localStorage.getItem('adminLogin') === null) {
      localStorage.setItem('adminLogin',JSON.stringify(""));
      adminLogin = "";
  }
  else adminLogin = JSON.parse(localStorage.getItem("adminLogin"));

  if (adminLogin === "" && !location.pathname.includes("admin.html")) {
    document.body.innerHTML = `
      <div class="admin-error">
        ĐÂY LÀ TRANG CỦA QUẢN TRỊ VIÊN
      </div>
    `;
  }
  document.body.style.display = "initial";
}

const checkValidation = () => {
  let valid = true;
  valid &= kiemTraRong("userNameLG", 'error_userNameLG');
  valid &= kiemTraRong("passwordLG", 'error_passwordLG');
  valid &= kiemTraDangNhap("userNameLG", 'error_userNameLG', "passwordLG", 'error_passwordLG');
  
  
  if (valid) {
    localStorage.setItem('adminLogin', JSON.stringify(document.getElementById("userNameLG").value));
    window.location.href = "./products.html";
  }
}

const kiemTraRong = (idValue, idError) => {
  let inputText = document.getElementById(idValue);
  if (inputText.value.trim() === '') {
      document.getElementById(idError).innerHTML = inputText.name + ' không được bỏ trống !';
      document.getElementById(idError).style.display = 'block';
      document.getElementById(idError).style.fontSize = "10px";
      document.getElementById(idError).style.color = "red";
      return false;
  } else {
      document.getElementById(idError).innerHTML = '';
      document.getElementById(idError).style.display = 'none';
      return true;
  }
}

const kiemTraDangNhap = (loginInput, loginError, passwordInput, passwordError) => {
  if (document.getElementById(loginInput).value === "") return false;

  if (document.getElementById(loginInput).value !== "admin") {
      document.getElementById(loginError).innerHTML = "Phải nhập user có phân quyền quản trị viên";
      document.getElementById(loginError).style.display = 'block';
      document.getElementById(loginError).style.fontSize = "10px";
      document.getElementById(loginError).style.color = "red";
      return false;
  }
  if (document.getElementById(passwordInput).value !== "admin") {                
      document.getElementById(passwordError).innerHTML = "Nhập sai password!!!";
      document.getElementById(passwordError).style.display = 'block';
      document.getElementById(passwordError).style.fontSize = "10px";
      document.getElementById(passwordError).style.color = "red";
      return false;
  }
  return true;
}

function dangXuat() {
  localStorage.removeItem("adminLogin");
  window.location.href = "./admin.html";
}