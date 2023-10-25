"use client";
import React, { FormEvent } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";

function setCookie(name: string, value: string, minutes: number) {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
async function onSubmit(event: any) {
  event.preventDefault();
  const target = event.target;
  const data = {
    email: target.email.value,
    password: target.password.value,
  };
  const url = `https://drab-jade-bunny-sari.cyclic.app/api/v1/users/login`;
  axios
    .post(url, data)
    .then((res) => {
      const data = res.data;
      setCookie("jwt", data.token, 15);
      window.alert("Logged In");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    })

    .catch(function (err) {
      console.log(err.message);
    });
}
export default function page() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
          <form onSubmit={onSubmit} className="form form-login">
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="form__input"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form__group ma-bt-md">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form__input"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
