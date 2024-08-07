<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div class="card p-4 bg-dark text-light" style="width: 90%; max-width: 800px;">
            <h2>Formulario de Cliente</h2>
            <form @submit.prevent="submitForm">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="firstName">Nombre:</label>
                        <input type="text" class="form-control" id="firstName" v-model="formData.firstName" required />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Apellido Paterno:</label>
                        <input type="text" class="form-control" id="lastName" v-model="formData.lastName" required />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="middleName">Apellido Materno:</label>
                        <input type="text" class="form-control" id="middleName" v-model="formData.middleName" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="address">Dirección:</label>
                        <input type="text" class="form-control" id="address" v-model="formData.address" required />
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="email">Correo Electrónico:</label>
                    <input type="email" class="form-control" id="email" v-model="formData.email" required />
                </div>
                <button type="submit" class="btn btn-custom w-100">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
            </form>
        </div>
    </div>
</template>

<script>
import api from '../services/api';

export default {
    props: {
        customer: Object,
        isEditing: Boolean
    },
    data() {
        return {
            formData: {
                firstName: '',
                lastName: '',
                middleName: '',
                address: '',
                email: ''
            }
        };
    },
    watch: {
        customer: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.formData = { ...newVal };
                }
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                if (this.isEditing) {
                    await api.put(`/customer-addresses/${this.formData.id}`, this.formData);
                } else {
                    await api.post('/customer-addresses', this.formData);
                }
                this.$emit('form-submitted');
                this.resetForm();
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
        resetForm() {
            this.formData = {
                firstName: '',
                lastName: '',
                middleName: '',
                address: '',
                email: ''
            };
            this.$emit('form-reset');
        }
    }
};
</script>

<style>
body {
    background-color: #212529;
    color: #f8f9fa;
}

.card {
    background-color: #343a40;
    border: 2px solid #035348 !important;
    border-radius: 4px; /* Opcional: para bordes redondeados */
    box-shadow: 0 0 8px rgba(3, 183, 204, 0.8); /* Sombra azul con difuminado */
    margin-top:50px;
}

.btn-custom{
    background-color: #12A0A0 !important;
    color: white !important;
}

.form-control {
    background-color: #495057;
    color: #f8f9fa;
    border: 1px solid #6c757d;
}

.form-control:focus {
    background-color: #495057;
    color: #f8f9fa;
    border-color: #007bff;
}
</style>