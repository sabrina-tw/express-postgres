import { Router } from 'express';
import handleError from '../../utils/error-handlers.js';

const router = Router();

// dependencies to get Sequelize models
import { User } from '../../sequelize.js';

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.use(handleError);

export default router;
