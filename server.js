const express = require('express');
const database = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

const router = express.Router();
router.get('/furniture', (req, res) => {
  try {
    const data = database.furniture;
    return res.json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});
router.get('/users', (req, res) => {
  try {
    const data = database.users;
    return res.json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});
router.get('/likes', (req, res) => {
  try {
    const data = database.likes;
    return res.json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/likes', (req, res) => {
  try {
    const { furnitureIdFromUser, userId } = req.body;
    const like = {
      furnitureIdFromUser: furnitureIdFromUser,
      userId: userId,
    };
    database.likes.push(like);
    res.status(200).json(like);
  } catch (e) {
    res.status(500).json(e);
  }
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); //
