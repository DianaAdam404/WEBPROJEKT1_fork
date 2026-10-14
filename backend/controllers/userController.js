import '../models/userModel.js';

const UserController = {
    // Összes felhasználó lekérése
    async getAll(req, res) {
        try {
            const users = await UserModel.getAll(); 
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}