import pool from '../config/db.js';

const UserModel = {
  // Összes felhasználó lekérése az adatbázisból
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  },

    // Felhasználó lekérése ID alapján
    async getById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

    // Új felhasználó hozzáadása
    async create(user) {
    const {email, password, name, phone, profileimage } = user;
    const [result] = await pool.query('INSERT INTO users ( email, password, name, phone, profileimage) VALUES (?, ?, ?, ?, ?)', [email, password, name, phone, profileimage]);
    return { id: result.insertId, ...user };
  }
}

export default UserModel;