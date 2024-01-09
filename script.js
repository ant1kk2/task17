"use strict";

const wrapper = document.querySelector(".wrapper");

const form = document.createElement("form");
form.className = "form";

const text = document.createElement("p");
text.className = "text";

const input = document.createElement("input");
input.className = "input";

const btn = document.createElement("button");
btn.className = "btn";
btn.textContent = "OK";

const btnClear = document.createElement("button");
btnClear.className = "btn";
btnClear.textContent = "Clear name field in Local Storage";

function checkInput({ target: { value } }) {
  if (value.trim() === "") {
    input.classList.add("invalid");
  } else {
    input.classList.remove("invalid");
  }
}

function askName(e) {
  e.preventDefault();
  const name = input.value;
  if (name.trim() === "") {
    input.classList.add("invalid");
    return;
  }
  window.localStorage.setItem("name", name);
  form.removeEventListener("submit", askName);
  input.removeEventListener("input", checkInput);
  input.remove();
  btn.remove();
  text.textContent = `Hello ${name}!`;
}

function showForm() {
  const storage = window.localStorage;
  const { name } = storage;
  if (name) {
    wrapper.append(form);
    text.textContent = `Hello ${name}!`;
    form.append(text);
    wrapper.append(btnClear);
  } else {
    wrapper.prepend(form);
    text.textContent = "Hi, whats your name?";
    form.append(text);
    form.append(input);
    form.append(btn);
    wrapper.append(btnClear);
    input.addEventListener("input", checkInput);
    form.addEventListener("submit", askName);
  }
}

window.onload = showForm;

function clearStorage() {
  window.localStorage.removeItem("name");
  showForm();
}

btnClear.addEventListener("click", clearStorage);
