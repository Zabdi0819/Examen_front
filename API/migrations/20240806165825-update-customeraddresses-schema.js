'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cambiar las columnas existentes para añadir restricciones y validaciones
    await queryInterface.changeColumn('CustomerAddresses', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('CustomerAddresses', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('CustomerAddresses', 'middleName', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('CustomerAddresses', 'address', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('CustomerAddresses', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir los cambios si es necesario
    await queryInterface.changeColumn('CustomerAddresses', 'firstName', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('CustomerAddresses', 'lastName', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('CustomerAddresses', 'middleName', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('CustomerAddresses', 'address', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('CustomerAddresses', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false
    });
  }
};
