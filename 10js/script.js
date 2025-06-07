const authSection = document.getElementById('auth-section');
const searchSection = document.getElementById('search-section');
const userPanel = document.getElementById('user-panel');
const usersContainer = document.getElementById('users');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const filterAge = document.getElementById('filter-age');
const filterLocation = document.getElementById('filter-location');
const pagination = document.getElementById('pagination');
const favoritesSection = document.getElementById('favorites-section');
const favoritesUsers = document.getElementById('favorites-users');

let allUsers = [], filteredUsers = [], currentPage = 1, usersPerPage = 30;
const countries = ['Україна', 'Польща', 'Німеччина', 'Франція'];
const cities = {
 'Україна': ['Київ', 'Львів', 'Одеса'],
 'Польща': ['Варшава', 'Краків', 'Гданськ'],
 'Німеччина': ['Берлін', 'Мюнхен', 'Гамбург'],
 'Франція': ['Париж', 'Ліон', 'Марсель']
};

const debounce = (fn, delay) => {
 let timeout;
 return (...args) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => fn(...args), delay);
 };
};

const validateField = (field, condition, errorMessage, emptyMessage) => {
 const errorDiv = field.nextElementSibling?.classList.contains('error-message') ? field.nextElementSibling : field.parentElement.nextElementSibling;
 if (!condition()) {
  field.classList.remove('valid');
  field.classList.add('invalid');
  field.setAttribute('aria-invalid', 'true');
  errorDiv.textContent = errorMessage;
  return false;
 } else {
  field.classList.remove('invalid');
  field.classList.add('valid');
  field.setAttribute('aria-invalid', 'false');
  errorDiv.textContent = '';
  return true;
 }
};

const showSuccessMessage = (message) => {
 const div = document.createElement('div');
 div.className = 'success-message';
 div.textContent = message;
 document.body.appendChild(div);
 setTimeout(() => div.remove(), 3000);
};

window.showForm = (formId) => {
 document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
 document.querySelector(`[onclick="showForm('${formId}')"]`).classList.add('active');
 document.querySelectorAll('form').forEach(form => form.classList.add('hidden'));
 const activeForm = document.getElementById(formId);
 activeForm.classList.remove('hidden');
 activeForm.querySelector('input, select').focus();
};

const renderAuth = () => {
 const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
 if (currentUser) {
  authSection.classList.add('hidden');
  searchSection.classList.remove('hidden');
  userPanel.innerHTML = `
   <button class="favorites-btn" onclick="showFavorites()" aria-label="Переглянути обраних користувачів">Переглянути обраних</button>
   <button onclick="logout()" aria-label="Вийти з облікового запису">Вийти (${currentUser})</button>
  `;
  fetchUsers();
  updateURL();
  return;
 }

 authSection.innerHTML = `

  <form id="login-form" aria-labelledby="login-title">
      <div class="tab-buttons">
   <button class="tab active" onclick="showForm('login-form')" aria-label="Перейти до форми авторизації">Авторизація</button>
   <button class="tab" onclick="showForm('register-form')" aria-label="Перейти до форми реєстрації">Реєстрація</button>
  </div>
   <h3 id="login-title">Авторизація</h3>
   <input type="text" id="login-username" placeholder="Ім'я" required aria-label="Ім'я" aria-describedby="login-username-error" />
   <div class="error-message" id="login-username-error"></div>
   <div class="password-toggle">
    <input type="password" id="login-password" placeholder="Пароль" required aria-label="Пароль" aria-describedby="login-password-error" />
    <span id="toggle-login" role="button" aria-label="Показати або приховати пароль">👁</span>
   </div>
   <div class="error-message" id="login-password-error"></div>
   <label><input type="checkbox" id="remember-me" aria-label="Запам’ятати мене" /> Запам’ятати мене</label>
   <button type="submit" aria-label="Увійти">Увійти</button>
  </form>
  <form id="register-form" class="hidden" novalidate aria-labelledby="register-title">
      <div class="tab-buttons">
   <button class="tab active" onclick="showForm('login-form')" aria-label="Перейти до форми авторизації">Авторизація</button>
   <button class="tab" onclick="showForm('register-form')" aria-label="Перейти до форми реєстрації">Реєстрація</button>
  </div>
   <h3 id="register-title">Реєстрація</h3>
   <input type="text" id="first-name" placeholder="Ім'я" required aria-label="Ім'я" aria-describedby="first-name-error" />
   <div class="error-message" id="first-name-error"></div>
   <input type="text" id="last-name" placeholder="Прізвище" required aria-label="Прізвище" aria-describedby="last-name-error" />
   <div class="error-message" id="last-name-error"></div>
   <input type="email" id="email" placeholder="Email" required aria-label="Email" aria-describedby="email-error" />
   <div class="error-message" id="email-error"></div>
   <div class="password-toggle">
    <input type="password" id="password" placeholder="Пароль" required aria-label="Пароль" aria-describedby="password-error" />
    <span id="toggle-password" role="button" aria-label="Показати або приховати пароль">👁</span>
   </div>
   <div class="error-message" id="password-error"></div>
   <div class="password-toggle">
    <input type="password" id="confirm-password" placeholder="Підтвердити пароль" required aria-label="Підтвердити пароль" aria-describedby="confirm-password-error" />
    <span id="toggle-confirm" role="button" aria-label="Показати або приховати підтвердження пароля">👁</span>
   </div>
   <div class="error-message" id="confirm-password-error"></div>
   <input type="text" id="phone" placeholder="Телефон (+380...)" required aria-label="Телефон" aria-describedby="phone-error" />
   <div class="error-message" id="phone-error"></div>
   <input type="date" id="dob" required aria-label="Дата народження" aria-describedby="dob-error" />
   <div class="error-message" id="dob-error"></div>
   <select id="sex" required aria-label="Стать" aria-describedby="sex-error">
    <option value="">Стать</option>
    <option value="male">Чоловік</option>
    <option value="female">Жінка</option>
   </select>
   <div class="error-message" id="sex-error"></div>
   <select id="country" required aria-label="Країна" aria-describedby="country-error">
    <option value="">Країна</option>
    ${countries.map(c => `<option value="${c}">${c}</option>`).join('')}
   </select>
   <div class="error-message" id="country-error"></div>
   <select id="city" disabled required aria-label="Місто" aria-describedby="city-error">
    <option value="">Місто</option>
   </select>
   <div class="error-message" id="city-error"></div>
   <button type="submit" aria-label="Зареєструватися">Зареєструватися</button>
  </form>`;

 const loginForm = document.getElementById('login-form');
 const registerForm = document.getElementById('register-form');
 const toggleLogin = document.getElementById('toggle-login');
 const togglePassword = document.getElementById('toggle-password');
 const toggleConfirm = document.getElementById('toggle-confirm');
 const loginUsername = document.getElementById('login-username');
 const loginPassword = document.getElementById('login-password');
 const firstName = document.getElementById('first-name');
 const lastName = document.getElementById('last-name');
 const email = document.getElementById('email');
 const password = document.getElementById('password');
 const confirmPassword = document.getElementById('confirm-password');
 const phone = document.getElementById('phone');
 const dob = document.getElementById('dob');
 const sex = document.getElementById('sex');
 const country = document.getElementById('country');
 const city = document.getElementById('city');

 const validateOnInput = (field, condition, errorMessage, emptyMessage) => {
  field.addEventListener('input', () => validateField(field, condition, errorMessage, emptyMessage));
  field.addEventListener('change', () => validateField(field, condition, errorMessage, emptyMessage));
 };

 validateOnInput(loginUsername, () => loginUsername.value.length >= 3 && loginUsername.value.length <= 15, 'Ім’я повинно містити від 3 до 15 символів');
 validateOnInput(loginPassword, () => loginPassword.value.length >= 6, 'Пароль повинен містити щонайменше 6 символів');
 validateOnInput(firstName, () => firstName.value.length >= 3 && firstName.value.length <= 15, 'Ім’я повинно містити від 3 до 15 символів');
 validateOnInput(lastName, () => lastName.value.length >= 3 && lastName.value.length <= 15, 'Прізвище повинно містити від 3 до 15 символів');
 validateOnInput(email, () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value), 'Введіть коректний email');
 validateOnInput(password, () => password.value.length >= 6, 'Пароль повинен містити щонайменше 6 символів');
 validateOnInput(confirmPassword, () => confirmPassword.value === password.value, 'Паролі не збігаються');
 validateOnInput(phone, () => /^\+380\d{9}$/.test(phone.value), 'Введіть коректний номер телефону (+380...)');
 validateOnInput(dob, () => {
  const birthDate = new Date(dob.value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const isValidDate = !isNaN(birthDate);
  const isFuture = birthDate > today;
  const isUnderage = age < 12;
  return isValidDate && !isFuture && !isUnderage;
 }, 'Виберіть дату народження');
 validateOnInput(sex, () => sex.value === 'male' || sex.value === 'female', 'Виберіть стать');
 validateOnInput(country, () => country.value, 'Виберіть країну');
 validateOnInput(city, () => city.value && !city.disabled, 'Виберіть місто');

 toggleLogin.addEventListener('click', () => {
  loginPassword.type = loginPassword.type === 'password' ? 'text' : 'password';
  toggleLogin.textContent = loginPassword.type === 'password' ? '👁' : '🙈';
  toggleLogin.setAttribute('aria-label', loginPassword.type === 'password' ? 'Показати пароль' : 'Приховати пароль');
 });

 togglePassword.addEventListener('click', () => {
  password.type = password.type === 'password' ? 'text' : 'password';
  togglePassword.textContent = password.type === 'password' ? '👁' : '🙈';
  togglePassword.setAttribute('aria-label', password.type === 'password' ? 'Показати пароль' : 'Приховати пароль');
 });

 toggleConfirm.addEventListener('click', () => {
  confirmPassword.type = confirmPassword.type === 'password' ? 'text' : 'password';
  toggleConfirm.textContent = confirmPassword.type === 'password' ? '👁' : '🙈';
  toggleConfirm.setAttribute('aria-label', confirmPassword.type === 'password' ? 'Показати підтвердження пароля' : 'Приховати підтвердження пароля');
 });

 country.addEventListener('change', () => {
  city.disabled = !country.value;
  city.innerHTML = '<option value="">Місто</option>';
  if (country.value) {
   cities[country.value].forEach(c => {
    city.innerHTML += `<option value="${c}">${c}</option>`;
   });
  }
  validateField(city, () => city.value && !city.disabled, 'Виберіть місто');
 });

 loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const usernameValid = validateField(loginUsername, () => loginUsername.value.length >= 3 && loginUsername.value.length <= 15, 'Ім’я повинно містити від 3 до 15 символів');
  const passwordValid = validateField(loginPassword, () => loginPassword.value.length >= 6, 'Пароль повинен містити щонайменше 6 символів');

  if (usernameValid && passwordValid) {
   const users = JSON.parse(localStorage.getItem('users') || '[]');
   const found = users.find(u => u.firstName === loginUsername.value && u.password === loginPassword.value);
   if (found) {
    const remember = document.getElementById('remember-me').checked;
    if (remember) localStorage.setItem('currentUser', `${found.firstName} ${found.lastName}`);
    else sessionStorage.setItem('currentUser', `${found.firstName} ${found.lastName}`);
    showSuccessMessage('Авторизація успішна!');
    renderAuth();
   } else {
    loginUsername.nextElementSibling.textContent = 'Невірне ім’я або пароль';
    loginUsername.classList.add('invalid');
    loginUsername.setAttribute('aria-invalid', 'true');
    loginUsername.focus();
   }
  } else {
   const firstInvalid = loginForm.querySelector('.invalid');
   if (firstInvalid) firstInvalid.focus();
  }
 });

 registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const validations = [
   validateField(firstName, () => firstName.value.length >= 3 && firstName.value.length <= 15, 'Ім’я повинно містити від 3 до 15 символів'),
   validateField(lastName, () => lastName.value.length >= 3 && lastName.value.length <= 15, 'Прізвище повинно містити від 3 до 15 символів'),
   validateField(email, () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value), 'Введіть коректний email'),
   validateField(password, () => password.value.length >= 6, 'Пароль повинен містити щонайменше 6 символів'),
   validateField(confirmPassword, () => confirmPassword.value === password.value, 'Паролі не збігаються'),
   validateField(phone, () => /^\+380\d{9}$/.test(phone.value), 'Введіть коректний номер телефону (+380...)'),
   validateField(dob, () => {
    const birthDate = new Date(dob.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const isValidDate = !isNaN(birthDate);
    const isFuture = birthDate > today;
    const isUnderage = age < 12;
    return isValidDate && !isFuture && !isUnderage;
   }, 'Виберіть дату народження'),
   validateField(sex, () => sex.value === 'male' || sex.value === 'female', 'Виберіть стать'),
   validateField(country, () => country.value, 'Виберіть країну'),
   validateField(city, () => city.value && !city.disabled, 'Виберіть місто')
  ];

  if (validations.every(v => v)) {
   const users = JSON.parse(localStorage.getItem('users') || '[]');
   if (users.some(u => u.email === email.value)) {
    email.nextElementSibling.textContent = 'Цей email уже зареєстровано';
    email.classList.add('invalid');
    email.setAttribute('aria-invalid', 'true');
    email.focus();
    return;
   }
   if (users.some(u => u.firstName === firstName.value)) {
    firstName.nextElementSibling.textContent = 'Це ім’я уже зареєстровано';
    firstName.classList.add('invalid');
    firstName.setAttribute('aria-invalid', 'true');
    firstName.focus();
    return;
   }
   const user = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    phone: phone.value,
    dob: dob.value,
    sex: sex.value,
    country: country.value,
    city: city.value,
    registrationDate: new Date().toISOString()
   };
   users.push(user);
   localStorage.setItem('users', JSON.stringify(users));
   showSuccessMessage('Реєстрація успішна! Увійдіть, використовуючи ваше ім’я.');
   registerForm.reset();
   city.disabled = true;
   city.innerHTML = '<option value="">Місто</option>';
   showForm('login-form');
  } else {
   const firstInvalid = registerForm.querySelector('.invalid');
   if (firstInvalid) firstInvalid.focus();
  }
 });
};

const logout = () => {
 localStorage.removeItem('currentUser');
 sessionStorage.removeItem('currentUser');
 location.reload();
};

const renderUsers = (users) => {
 usersContainer.innerHTML = '';
 const start = (currentPage - 1) * usersPerPage;
 const paginated = users.slice(start, start + usersPerPage);
 paginated.forEach(user => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
   <img src="${user.picture?.medium || 'https://via.placeholder.com/100'}" alt="Аватар ${user.name?.first || user.firstName} ${user.name?.last || user.lastName}" />
   <h3>${user.name?.first || user.firstName} ${user.name?.last || user.lastName}</h3>
   <p>Вік: ${user.dob?.age || Math.floor((new Date() - new Date(user.dob)) / (365.25 * 24 * 60 * 60 * 1000))}</p>
   <p>Email: ${user.email}</p>
   <p>Телефон: ${user.phone}</p>
   <p>Місто: ${user.city || user.location?.city || 'Невідомо'}</p>
   <button onclick="toggleFavorite('${user.email}')" aria-label="${isFavorite(user.email) ? 'Видалити з обраного' : 'Додати до обраного'}">${isFavorite(user.email) ? '★' : '☆'} Обране</button>
  `;
  usersContainer.appendChild(card);
 });
 renderPagination(users.length);
};

const renderFavorites = () => {
 favoritesUsers.innerHTML = '';
 const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
 const favoriteUsers = allUsers.filter(user => favorites.includes(user.email));
 if (favoriteUsers.length === 0) {
  favoritesUsers.innerHTML = '<p>Немає обраних користувачів.</p>';
 } else {
  favoriteUsers.forEach(user => {
   const card = document.createElement('div');
   card.className = 'card';
   card.innerHTML = `
    <img src="${user.picture?.medium || 'https://via.placeholder.com/100'}" alt="Аватар ${user.name?.first || user.firstName} ${user.name?.last || user.lastName}" />
    <h3>${user.name?.first || user.firstName} ${user.name?.last || user.lastName}</h3>
    <p>Вік: ${user.dob?.age || Math.floor((new Date() - new Date(user.dob)) / (365.25 * 24 * 60 * 60 * 1000))}</p>
    <p>Email: ${user.email}</p>
    <p>Телефон: ${user.phone}</p>
    <p>Місто: ${user.city || user.location?.city || 'Невідомо'}</p>
    <button onclick="toggleFavorite('${user.email}'); renderFavorites();" aria-label="${isFavorite(user.email) ? 'Видалити з обраного' : 'Додати до обраного'}">${isFavorite(user.email) ? '★' : '☆'} Обране</button>
   `;
   favoritesUsers.appendChild(card);
  });
 }
};

const showFavorites = () => {
 usersContainer.classList.add('hidden');
 pagination.classList.add('hidden');
 favoritesSection.classList.remove('hidden');
 renderFavorites();
};

const closeFavorites = () => {
 favoritesSection.classList.add('hidden');
 usersContainer.classList.remove('hidden');
 pagination.classList.remove('hidden');
 renderUsers(filteredUsers);
};

const renderPagination = (total) => {
 const pages = Math.ceil(total / usersPerPage);
 pagination.innerHTML = '';
 for (let i = 1; i <= pages; i++) {
  const btn = document.createElement('button');
  btn.textContent = i;
  btn.setAttribute('aria-label', `Перейти до сторінки ${i}`);
  if (i === currentPage) btn.classList.add('active-page');
  btn.onclick = () => {
   currentPage = i;
   renderUsers(filteredUsers);
   updateURL();
  };
  pagination.appendChild(btn);
 }
};

const isFavorite = (email) => {
 const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
 return favorites.includes(email);
};

const toggleFavorite = (email) => {
 let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
 if (favorites.includes(email)) {
  favorites = favorites.filter(f => f !== email);
 } else {
  favorites.push(email);
 }
 localStorage.setItem('favorites', JSON.stringify(favorites));
 renderUsers(filteredUsers);
};

const updateURL = () => {
 const params = new URLSearchParams();
 if (searchInput.value) params.set('search', searchInput.value);
 if (sortSelect.value) params.set('sort', sortSelect.value);
 if (filterAge.value) params.set('age', filterAge.value);
 if (filterLocation.value) params.set('location', filterLocation.value);
 if (currentPage > 1) params.set('page', currentPage);
 history.pushState({}, '', `?${params.toString()}`);
};

const applyFilters = () => {
 let list = [...allUsers];
 const term = searchInput.value.trim().toLowerCase();
 if (term) {
  list = list.filter(u => {
   const firstName = (u.name?.first || u.firstName || '').toLowerCase();
   return firstName.includes(term);
  });
 }
 if (filterAge.value) {
  const [min, max] = filterAge.value.split('-').map(Number);
  list = list.filter(u => {
   const age = u.dob?.age || Math.floor((new Date() - new Date(u.dob)) / (365.25 * 24 * 60 * 60 * 1000));
   return max ? age >= min && age <= max : age >= min;
  });
 }
 if (filterLocation.value) {
  list = list.filter(u => (u.city || u.location?.city || '').toLowerCase().includes(filterLocation.value.toLowerCase()));
 }

 switch (sortSelect.value) {
  case 'name-asc':
   list.sort((a, b) => {
    const nameA = (a.name?.first || a.firstName || '').toLowerCase();
    const nameB = (b.name?.first || b.firstName || '').toLowerCase();
    return nameA.localeCompare(nameB, 'uk');
   });
   break;
  case 'name-desc':
   list.sort((a, b) => {
    const nameA = (a.name?.first || a.firstName || '').toLowerCase();
    const nameB = (b.name?.first || b.firstName || '').toLowerCase();
    return nameB.localeCompare(nameA, 'uk');
   });
   break;
  case 'age-asc':
   list.sort((a, b) => (a.dob?.age || Math.floor((new Date() - new Date(a.dob)) / (365.25 * 24 * 60 * 60 * 1000))) - (b.dob?.age || Math.floor((new Date() - new Date(b.dob)) / (365.25 * 24 * 60 * 60 * 1000))));
   break;
  case 'age-desc':
   list.sort((a, b) => (b.dob?.age || Math.floor((new Date() - new Date(b.dob)) / (365.25 * 24 * 60 * 60 * 1000))) - (a.dob?.age || Math.floor((new Date() - new Date(a.dob)) / (365.25 * 24 * 60 * 60 * 1000))));
   break;
  case 'reg-date-asc':
   list.sort((a, b) => new Date(a.registrationDate || '2000-01-01') - new Date(b.registrationDate || '2000-01-01'));
   break;
  case 'reg-date-desc':
   list.sort((a, b) => new Date(b.registrationDate || '2000-01-01') - new Date(a.registrationDate || '2000-01-01'));
   break;
 }

 filteredUsers = list;
 currentPage = 1;
 renderUsers(filteredUsers);
 updateURL();
};

const fetchUsers = async () => {
 try {
  const res = await fetch('https://randomuser.me/api/?results=100');
  const data = await res.json();
  allUsers = [...data.results, ...JSON.parse(localStorage.getItem('users') || '[]')];
  const params = new URLSearchParams(window.location.search);
  searchInput.value = params.get('search') || '';
  sortSelect.value = params.get('sort') || '';
  filterAge.value = params.get('age') || '';
  filterLocation.value = params.get('location') || '';
  currentPage = parseInt(params.get('page')) || 1;
  applyFilters();
 } catch {
  usersContainer.innerHTML = '<p role="alert">Помилка завантаження користувачів.</p>';
 }
};

searchInput.addEventListener('input', debounce(applyFilters, 300));
sortSelect.addEventListener('change', applyFilters);
filterAge.addEventListener('change', applyFilters);
filterLocation.addEventListener('input', debounce(applyFilters, 300));

renderAuth();