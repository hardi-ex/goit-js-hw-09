const formEl = document.querySelector('.feedback-form');

const LS_KEY = 'feedback-form-state';
let formData = { email: '', message: '' };

const savedFormData = getDataFromLocalStorage(LS_KEY);
if (savedFormData) {
  formData = savedFormData;
  formEl.elements.email.value = savedFormData.email;
  formEl.elements.message.value = savedFormData.message;
}

formEl.addEventListener('input', handleInput);

function handleInput(evt) {
  const { name, value } = evt.target;
  formData[name] = value;
  addDataToLocalStorage(LS_KEY, formData);
}

formEl.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(evt) {
  evt.preventDefault();

  const emailValue = evt.target.elements.email.value;
  const messageValue = evt.target.elements.message.value;

  if (!emailValue.trim() || !messageValue.trim()) {
    return alert('Fill please all fields');
  }

  console.log(formData);

  removeDataFromLocaleStorage(LS_KEY);
  formData = { email: '', message: '' };

  formEl.reset();
}

function addDataToLocalStorage(key, value) {
  try {
    const stringifyFromData = JSON.stringify(value);
    localStorage.setItem(key, stringifyFromData);
  } catch (error) {
    console.log(error.message);
  }
}

function getDataFromLocalStorage(key) {
  try {
    const getData = localStorage.getItem(key);
    return getData === null ? undefined : JSON.parse(getData);
  } catch (error) {
    console.log(error.message);
  }
}

function removeDataFromLocaleStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
}
