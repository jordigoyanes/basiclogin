<template>
    <div class="login-page">
    <div class="form">
        <form class="register-form">
          <legend>Sign up</legend>
        <input type="text" placeholder="name"/>
        <input type="password" placeholder="password"/>
        <input type="text" placeholder="email address"/>
        <button>create</button>
        <p class="message">Already registered? <a href="#">Sign In</a></p>
        </form>
        <form class="login-form">
          <legend>Login</legend>
        <input type="text" placeholder="email"/>
        <input type="password" placeholder="password"/>
        <button>login</button>
        <p class="message">Not registered? <a href="#">Create an account</a></p>
        </form>
    </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #4CAF50;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    &:hover, &:active, &:focus {
      background: #43A047;
    }
  }
  .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
    a {
      color: #4CAF50;
      text-decoration: none;
    }
  }
  legend{
    text-align: center;
    font-weight: 300;
    color: #444;
    margin: 0 auto 45px;
    font-size: 35px;
    line-height: 38px;
    text-transform: none;
    letter-spacing: 0;
  }
  .register-form {
    display: none;
  }
}
</style>