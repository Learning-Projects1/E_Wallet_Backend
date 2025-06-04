const userService = require('../services/userService');

class UserController {
  async signUp(req, res) {
    try {
      const { email, phone, cnic, password } = req.body;

      // Basic validation (you can improve this)
      if (!email || !phone || !cnic || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await userService.signUp({ email, phoneNumber, cnic, password });

      res.status(201).json({
        message: 'User created successfully',
        userId: user._id,
        email: user.email,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
