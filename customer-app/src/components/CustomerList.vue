<template>
    <div class="container mt-4 bg-dark">
      <h2>Lista de Clientes</h2>
      <table class="table table-bordered-blue">
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

    .table-bordered-blue {
            border: 2px solid transparent;
            border-radius: 4px; /* Opcional: para bordes redondeados */
            background-color: #4b5655; /* Fondo blanco para la tabla */
            box-shadow: 0 0 8px rgba(3, 183, 204, 0.8); /* Sombra azul con difuminado */
    }

    .table-bordered-blue th, .table-bordered-blue td {
        border: 2px solid #035348 !important;
    }

    .table-bordered-blue thead th {
        border-bottom: 2px solid #035348 !important;
        background-color: #101111;
        color: white;
    }
  </style>
  