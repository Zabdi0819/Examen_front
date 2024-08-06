<template>
    <div class="container mt-4">
      <h2>Lista de Clientes</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Domicilio</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.firstName }}</td>
            <td>{{ customer.lastName }}</td>
            <td>{{ customer.middleName }}</td>
            <td>{{ customer.address }}</td>
            <td>{{ customer.email }}</td>
            <td>
              <button @click="editCustomer(customer)" class="btn btn-warning">Editar</button>
              <button @click="deleteCustomer(customer.id)" class="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import api from '../services/api';
  
  export default {
    setup(props, { emit }) {
      const customers = ref([]);
      const selectedCustomer = ref(null);
  
      const fetchCustomers = async () => {
        try {
          const response = await api.get('/customer-addresses');
          customers.value = response.data;
        } catch (error) {
          console.error('Error fetching customers:', error);
        }
      };
  
      const editCustomer = (customer) => {
        selectedCustomer.value = customer;
        emit('edit-customer', customer); // Emitir evento para seleccionar cliente
      };
  
      const deleteCustomer = async (id) => {
        try {
          await api.delete(`/customer-addresses/${id}`);
          fetchCustomers(); // Actualiza la lista después de eliminar
        } catch (error) {
          console.error('Error deleting customer:', error);
        }
      };
  
      onMounted(fetchCustomers); // Cargar clientes cuando el componente se monta
  
      return { customers, editCustomer, deleteCustomer, selectedCustomer };
    }
  };
  </script>
  
  <style scoped>
  /* Agrega tus estilos aquí */
  </style>
  