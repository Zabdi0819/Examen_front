'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('CustomerAddresses', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    });
    await queryInterface.changeColumn('CustomerAddresses', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      onUpdate: Sequelize.NOW // Actualiza automáticamente
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('CustomerAddresses', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
    await queryInterface.changeColumn('CustomerAddresses', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};
