<template>
  <div id="app" class="bg-dark" data-bs-theme="dark">
    <Login v-if="!isAuthenticated" @login="handleLogin" />
    <div v-else>
      <nav class="navbar">
        <div class="container d-flex justify-content-end">
          <button @click="logout" class="btn btn-secondary">Cerrar sesión</button>
        </div>
      </nav> 
      <CustomerForm 
        :customer="selectedCustomer" 
        :isEditing="isEditing" 
        @form-submitted="refreshCustomerList" 
        @form-reset="resetSelectedCustomer" />
      <CustomerList 
        @edit-customer="setCustomerForEditing"
        ref="customerList" />
    </div>
  </div>
</template>

<script>
import Login from './components/UserLogin.vue';
import CustomerList from './components/CustomerList.vue';
import CustomerForm from './components/CustomerForm.vue';
import api from './services/api';

export default {
  components: {
    Login,
    CustomerList,
    CustomerForm
  },
  data() {
    return {
      isAuthenticated: false,
      selectedCustomer: null,
      isEditing: false
    };
  },
  methods: {
    handleLogin(token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.isAuthenticated = true;
    },
    logout() {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      this.isAuthenticated = false;
    },
    setCustomerForEditing(customer) {
      this.selectedCustomer = customer;
      this.isEditing = true;
    },
    refreshCustomerList() {
      this.$refs.customerList.fetchCustomers();
      this.resetSelectedCustomer();
    },
    resetSelectedCustomer() {
      this.selectedCustomer = null;
      this.isEditing = false;
    }
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.isAuthenticated = true;
    }
  }
};
</script>

<style>
  body {
    background-color: #343a40;
    color: #ffffff;
  }

  .navbar{
    background-color: #12A0A0;
  }

</style>
