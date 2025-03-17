import { defineStore } from 'pinia'
import { ref } from 'vue'
import GetProfile from '@/utils/requests/GetProfile.js'
import PostLogin from '@/utils/requests/PostLogin.js'
import PostRegister from '@/utils/requests/PostRegister.js'

export const AuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(null)

  async function check() {
    if (!localStorage.getItem('token')) {
      isAuthenticated.value = false;
      return;
    }

    try {
      const response = await GetProfile();

      switch (response.status) {
        case 200:
          isAuthenticated.value = true;
          break;
        default:
          isAuthenticated.value = false;
          localStorage.removeItem('token'); // remove token if it's invalid or expired
          break;
      }
    } catch (error) {
      isAuthenticated.value = false;
    }
  }


  async function login(email, password) {
    const loginData = { email, password };
    try {
      const response = await PostLogin(loginData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        await check();
      } else {
        isAuthenticated.value = false;
      }
    } catch (error) {
      isAuthenticated.value = false;
      console.error('Login failed:', error);
    }
  }

  async function register(email, password) {
    const registerData = { email, password };
    try {
      const response = await PostRegister(registerData);
      console.log(response);
      console.log('TOKEN:', response.token);
      if (response.token) {
        console.log('SET TOKEN');
        localStorage.setItem('token', response.token);
        await check();
      } else {
        isAuthenticated.value = false;
      }
    } catch (error) {
      isAuthenticated.value = false;
      console.error('Registration failed:', error);
    }
  }

  function logout() {
    localStorage.removeItem('token')
    isAuthenticated.value = false
  }

  async function profile() {
    const profileData = await GetProfile()
    console.log('PROFILE DATA: ' + profileData);

    return {
      id: profileData.data.id,
      email: profileData.data.email,
      password: profileData.data.password,
    }
  }

  return { isAuthenticated, check, login, register, logout, profile }
})
