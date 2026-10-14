import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

const UserController = {
    // Összes felhasználó lekérése
    async getAll(req, res) {
        try {
            const users = await userModel.getAll(); 
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Felhasználó lekérése ID alapján
    async getById(req, res) {
        const { id } = req.params;
        try {
            const user = await userModel.getById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'Nincs ilyen felhasználó' });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Új felhasználó hozzáadása
    async create(req, res) {
        const { email, password, name, phone, profileimage } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Jelszó hash-elése
        try {
            const newUser = await userModel.create({ email, password: hashedPassword, name, phone, profileimage });
            res.status(201).json(newUser);
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ error: 'Ez az email cím már létezik' });
                return;
            }
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Login
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await userModel.getByEmail(email);
            if (!user) {
                res.status(404).json({ error: 'Nincs ilyen felhasználó' });
                return;
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ error: 'Hibás jelszó' });
                return;
            }
            res.json({ message: 'Sikeres bejelentkezés', user });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default UserController;