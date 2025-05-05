function showTab(tab) {
    document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
    
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelector(`.tab-button[onclick="showTab('${tab}')"]`).classList.add('active');
  }
  
  function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
  }
  
  function validateSignup(event) {
    event.preventDefault();
    let valid = true;
  
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const phone = document.getElementById('phone');
    const birthDate = document.getElementById('birthDate');
    const sex = document.getElementById('sex');
    const country = document.getElementById('country');
    const city = document.getElementById('city');
  
    // Валідація
    valid &= validateField(firstName, val => val.length >= 3 && val.length <= 15, "First Name must be 3-15 characters");
    valid &= validateField(lastName, val => val.length >= 3 && val.length <= 15, "Last Name must be 3-15 characters");
    valid &= validateField(email, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Invalid Email");
    valid &= validateField(password, val => val.length >= 6, "Password must be at least 6 characters");
    valid &= validateField(confirmPassword, val => val === password.value, "Passwords do not match");
    valid &= validateField(phone, val => /^\+380\d{9}$/.test(val), "Phone must be in format +380...");
    valid &= validateField(birthDate, val => validateAge(val), "Invalid birth date");
    valid &= validateField(sex, val => val !== "", "Select your sex");
    valid &= validateField(country, val => val !== "", "Select a country");
    valid &= validateField(city, val => val !== "", "Select a city");
  
    if (valid) {
      alert('Successfully Registered!');
      document.getElementById('signup').reset();
      document.querySelectorAll('input, select').forEach(el => {
        el.classList.remove('valid', 'invalid');
      });
    }
  }
  
  function validateLogin(event) {
    event.preventDefault();
    let valid = true;
  
    const username = document.getElementById('loginUsername');
    const password = document.getElementById('loginPassword');
  
    valid &= validateField(username, val => val.trim() !== '', "Username is required");
    valid &= validateField(password, val => val.length >= 6, "Password must be at least 6 characters");
  
    if (valid) {
      alert('Successfully Logged In!');
      document.getElementById('login').reset();
    }
  }
  
  function validateField(input, validation, errorMsg) {
    const small = input.nextElementSibling;
    if (validation(input.value)) {
      input.classList.add('valid');
      input.classList.remove('invalid');
      small.innerText = '';
      return true;
    } else {
      input.classList.add('invalid');
      input.classList.remove('valid');
      small.innerText = errorMsg;
      return false;
    }
  }
  
  function validateAge(date) {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (birthDate > today) return false;
    if (age < 12) {
      alert('You must be at least 12 years old to register.');
      return false;
    }
    return true;
  }
  
  function loadCities() {
    const city = document.getElementById('city');
    city.innerHTML = '<option value="">Select city</option>';
    if (document.getElementById('country').value === 'Ukraine') {
      ['Chernivtsi','Kyiv', 'Lviv', 'Odesa', 'Kharkiv'].forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.innerText = c;
        city.appendChild(opt);
      });
      city.disabled = false;
    } else {
      city.disabled = true;
    }
  }
  