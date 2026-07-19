document.addEventListener('DOMContentLoaded', () =>{
  console.log("Alert and running");
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  
  function setError(el, msg){
    el.textContent = msg;
  };
  
  function clearError(el){
    el.textContent = "";
  }
  
  function validateEmail(){
    value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value){
      setError(emailError, "Enter your email!");
      return false;
    };
    if (!emailRegex.test(value)){
      setError(emailError, "Enter a valid email address");
      return false;
    };
    clearError(emailError);
    return true;
  };
  function validatePassword(){
    value = passwordInput.value;
    if (!value){
      setError(passwordError, "Password is required!");
      return false;
    };
    if(value.length < 6){
      setError(passwordError, 'Password should be more than 6 characters!');
      return false;
    };
    if(!/[a-zA-Z]/.test(value)){
      setError(passwordError, "Password should include alphabets!");
      return false;
    };
    if (!/[0-9]/.test(value)){
      setError(passwordError, "Password should include numbers!")
      return false;
    };
    clearError(passwordError);
    return true;
  }
  
  emailInput.addEventListener('blur', validateEmail);
  passwordInput.addEventListener('blur', validatePassword);
  
  form.addEventListener('submit', (e) =>{
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if(!isEmailValid || !isPasswordValid){
      e.preventDefault();
    };
  });
});