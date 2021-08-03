/*
This file is generated manually. The migration script was later created
from sequelize-cli migration:generate command, and updated manually.
See: https://sequelize.org/master/manual/migrations.html#migration-skeleton
*/

/*

In both ways, sequelize.define will call Model.init
See: https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init
for all the available settings.

It's not required to define the table name explicitly. By default, Sequelize 
automatically pluralizes the model name and uses that as the table name. 
This pluralization is done under the hood by a library called inflection, 
so that irregular plurals (such as person -> people) are computed correctly.
See: https://sequelize.org/master/manual/model-basics.html#table-name-inference

*/

const modelName = "user";

/* 
The optional options to be passed to Model.init(), which is then used by Sequelize 
to configure the table naming etc.
 */
const options = {
  freezeTableName: true,  // Use the same name as modelName for the table, instead of pluralize it
  // tableName: 'Users'   // Simply tell the table name
}

export default (sequelize, Sequelize) => sequelize.define(modelName, {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  firstName: {
    type: Sequelize.STRING,
    allowNull: false // allowNull defaults to true
  },
  lastName: {
    type: Sequelize.STRING
  }
}, options);
