import userModel from '../models/userModel.js';

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
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default UserController;