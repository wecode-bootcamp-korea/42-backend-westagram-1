const { mysqlDataSource } = require('./datasource')

const createUser = async (name, password, email, profileImage) => {
    return await mysqlDataSource.query(
        `INSERT INTO users (
         name, 
         password, 
         email,
         profile_image
         ) 
         VALUES (?, ?, ?, ?);`,
        [name, password, email, profileImage]
    )
}


module.exports = {
    createUser
}
