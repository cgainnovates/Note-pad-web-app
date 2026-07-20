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
  
  form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if(!isEmailValid || !isPasswordValid){
      return;
    }
    try{
      const res = await fetch('/loginDetails', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'user-email':emailInput.value.trim(),
          'user-password': passwordInput.value
          
        })
      })
      if(res.status === 401){
        alert("Invalid email or password");
        window.location.href = '/login';
        return;
      }
      if(res.status === 400){
        alert("Email and password are required!");
        window.location.href = '/login';
        return;
      }
      if(!res.ok){
        const msg = await res.text();
        alert(msg);
        return;
      }
      window.location.href = '/';
    }catch(err){
      console.error(err);
      alert("Something went wrong, please try again!");
    }
  });
});