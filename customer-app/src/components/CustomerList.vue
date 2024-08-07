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
            <button @click="confirmDelete(customer.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import Swal from 'sweetalert2';

export default {
  setup(props, { emit }) {
    const customers = ref([]);
    const selectedCustomer = ref(null);

    // Función para obtener la lista de clientes
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/customer-addresses');
        customers.value = response.data;
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    // Función para editar un cliente
    const editCustomer = (customer) => {
      selectedCustomer.value = customer;
      emit('edit-customer', customer); // Emitir evento para seleccionar cliente
    };

    // Función para confirmar eliminación de un cliente
    const confirmDelete = async (id) => {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Este registro será eliminado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00d1b2',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        deleteCustomer(id);
      }
    };

    // Función para eliminar un cliente
    const deleteCustomer = async (id) => {
      try {
        await api.delete(`/customer-addresses/${id}`);
        fetchCustomers(); // Actualiza la lista después de eliminar
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        );
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    };

    // Cargar clientes cuando el componente se monta
    onMounted(fetchCustomers);

    return { customers, editCustomer, confirmDelete, selectedCustomer, fetchCustomers };
  }
};
</script>

<style scoped>
  .container {
    padding-bottom: 100px;
  }

  .table-bordered-blue {
    border: 2px solid transparent;
    border-radius: 4px; /* Opcional: para bordes redondeados */
    background-color: #4b5655; /* Fondo blanco para la tabla */
    box-shadow: 0 0 8px rgba(3, 183, 204, 0.8); /* Sombra azul con difuminado */
  }

  .table-bordered-blue th, .table-bordered-blue td {
    border: 2px solid #00d1b2 !important;
  }

  .table-bordered-blue thead th {
    border-bottom: 2px solid #00d1b2 !important;
    background-color: #101111;
    color: white;
  }

  .btn-danger {
    margin-left: 20px;
    background-color: #640217;
  }

  .btn-warning {
    margin-left: 20px;
    background-color: #685400;
    color: white;
  }
</style>
