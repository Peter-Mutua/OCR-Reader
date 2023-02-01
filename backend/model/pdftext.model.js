module.exports = (sequelize, Sequelize) => {
    const PdfText = sequelize.define("pdftext", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        serial_number: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            unique: {
                args: 'serial_number',
                msg: 'Serial Number Exists!'
              }
        },
        company_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        company_registration_date: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        names: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        nationality: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        shares: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        names2: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: false,
            },
        },
        address2: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: false,
            }
        },
        nationality2: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: false,
            }
        },
        shares2: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false,
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
    }, {
        freezeTableName: false
    });

    return PdfText;
};