const { Pool } = require('pg')

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'abc12345',
    database: 'company',
    port: '5432'
})


const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
}


const getUser = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.status(200).json(response.rows[0]);
}


const createUser = async (req, res) => {
    const { name, email } = req.body;
    await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email])
    res.json({msg: 'User created'});
}


const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id])
    res.json({msg: 'User updated'})
}


const deleteUser = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = $1', [id])
    res.json({msg: 'User deleted'})
}

module.exports = {
    getUsers,
    createUser,
    getUser,
    deleteUser,
    updateUser
}