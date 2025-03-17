<template>
  <form ref="formRef" @submit.prevent="isRegistering ? submitRegisterForm() : submitLoginForm()">
    <h2>{{ isRegistering ? 'Register' : 'Login' }}</h2>

    <div class="form-group">
      <label for="Email">Email address</label>
      <input v-model="emailRef" type="email" class="form-control" id="Email"
             aria-describedby="emailHelp"
             placeholder="Enter email" required>
    </div>

    <div class="form-group">
      <label for="Password">Password</label>
      <input v-model="passwordRef" type="password" class="form-control" id="Password"
             placeholder="Password" required>
    </div>

    <div class="form-group" v-if="isRegistering">
      <label for="ConfirmPassword">Confirm Password</label>
      <input v-model="confirmPasswordRef" type="password" class="form-control" id="ConfirmPassword"
             placeholder="Confirm Password" required>
    </div>

    <button type="submit" class="btn btn-primary">
      {{ isRegistering ? 'Register' : 'Login' }}
    </button>

    <p class="toggle-text" @click="toggleMode">
      {{ isRegistering ? 'Already have an account ? Login !' : 'Don\'t have an account ? Register !'
      }}
    </p>
  </form>
</template>

<style scoped>
form {
  margin: 0 auto;
  max-width: 320px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: .5rem;
}

input {
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
}

button {
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border-radius: .25rem;
  margin-top: 1rem;
}

.toggle-text {
  color: blue;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
}
</style>

<script setup>
import { AuthStore } from '@/stores/Auth'
import { ref } from 'vue'
import router from '@/router/index.js'

const isRegistering = ref(false)

const emailRef = ref('')
const passwordRef = ref('')
const confirmPasswordRef = ref('')

const formRef = ref(null)
const authStore = AuthStore()

function resetForm() {
  emailRef.value = ''
  passwordRef.value = ''
  confirmPasswordRef.value = ''
  formRef.value?.reset()
}

function toggleMode() {
  isRegistering.value = !isRegistering.value
  resetForm()
}

async function submitLoginForm() {
  await authStore.login(emailRef.value, passwordRef.value)

  if (authStore.isAuthenticated) {
    await router.push({ path: '/profile' })
  } else {
    alert('Login failed')
    resetForm()
  }
}

async function submitRegisterForm() {
  if (passwordRef.value.length < 8) {
    alert('Password must be at least 8 characters long')
    return
  }

  if (!/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(passwordRef.value)) {
    alert('Password must contain at least one special character')
    return
  }

  if (!/[A-Z]/.test(passwordRef.value)) {
    alert('Password must contain at least one uppercase letter')
    return
  }

  if (!/\d/.test(passwordRef.value)) {
    alert('Password must contain at least one number')
    return
  }

  if (passwordRef.value !== confirmPasswordRef.value) {
    alert('Passwords do not match')
    return
  }

  await authStore.register(emailRef.value, passwordRef.value)

  if (authStore.isAuthenticated) {
    await router.push({ path: '/profile' })
  } else {
    alert('Registration failed')
    resetForm()
  }
}
</script>
