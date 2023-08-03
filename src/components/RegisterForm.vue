<template>
    <form class="form">
        <p class="title">Register</p>
        <p class="message">Registra un nuevo usuario o administrador. </p>
            <div class="flex">
            <label>
                <input required placeholder="" type="text" class="input">
                <span>Username</span>
            </label>
    
            <label>
                <input required placeholder="" type="text" class="input">
                <span>Role</span>
            </label>
        </div>
    
        <label>
            <input required placeholder="" type="email" class="input">
            <span>Email</span>
        </label>
    
        <label>
            <input required placeholder="" type="password" class="input">
            <span>Password</span>
        </label>
        <label>
            <input required placeholder="" type="password" class="input">
            <span>Confirm password</span>
        </label>
        <button class="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
}

.title {
  font-size: 28px;
  color: $blue;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  font-family: $font-title;
}

.title::before,.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: $blue;
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: $blue;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.message, .signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: $blue;
}

.signin a:hover {
  text-decoration: underline $blue;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}

.form label .input {
  width: 100%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,.form label .input:valid + span {
  top: 30px;
  font-size: 1em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: $green;
}

.submit {
  border: none;
  outline: none;
  background-color: $blue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: .3s ease;
  cursor: pointer;
  transition: .6s;
}

.submit:hover {
  background-color: $red;
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}

</style>