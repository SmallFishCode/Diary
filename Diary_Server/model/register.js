const { STRING } = require('sequelize')


module.exports = {
	schema: {
		iddddd: {
			type: STRING(50),
			primaryKey: true
		},
		username: STRING(100),
		password: STRING(100),
		firstName: {
			type: STRING(100),
			allowNull: false
		  },
	},
	options: {
		timestamps: false,
	},
}
