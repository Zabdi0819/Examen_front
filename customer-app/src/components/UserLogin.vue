<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-dark">
    <div class="card p-4 bg-dark text-light" style="width: 20rem; border-color: #00d1b2;">
      <h2 class="text-center" style="color: #00d1b2;">Login</h2>
      <form @submit.prevent="login">
        <div class="form-group mb-3">
          <label for="username" style="color: #00d1b2;">Usuario:</label>
          <input type="text" id="username" v-model="username" class="form-control bg-dark text-light" required />
        </div>
        <div class="form-group mb-3">
          <label for="password" style="color: #00d1b2;">Contraseña:</label>
          <input type="password" id="password" v-model="password" class="form-control bg-dark text-light" required />
        </div>
        <button type="submit" class="btn btn-primary w-100" style="background-color: #00d1b2; border-color: #00d1b2;">Ingresar</button>
      </form>
    </div>
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

<style scoped>
.card {
  border-width: 2px;
}
</style>
