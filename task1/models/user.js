const Sequelize = require('sequelize');

export const User = sequelize.define('notes', { note: Sequelize.TEXT, tag: Sequelize.STRING });
