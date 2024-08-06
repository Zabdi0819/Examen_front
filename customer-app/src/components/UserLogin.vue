<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import { login } from '../services/auth';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const token = await login(this.username, this.password);
        this.$emit('login', token); // Emitir evento de login
      } catch (error) {
        console.error('Login failed:', error);
        // Manejo de errores para mostrar un mensaje al usuario
        alert('Login failed. Please check your credentials.');
      }
    }
  }
};
</script>
