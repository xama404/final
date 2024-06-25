require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const { users_tbs, collections_tbs, task_tbs, sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views'))); // Untuk melayani file statis dari folder 'views'

// Konfigurasi session
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Pastikan secure: true jika menggunakan HTTPS
}));

// Endpoint untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Endpoint untuk login pengguna
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users_tbs.findOne({ where: { email, password } });
    if (user) {
      req.session.userId = user.id;
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Endpoint untuk logout pengguna
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Endpoint untuk registrasi pengguna baru
app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const newUser = await users_tbs.create({ email, username, password });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'User creation failed' });
  }
});

// Endpoint untuk menambahkan collections
app.post('/collections', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name } = req.body;
  try {
    const newCollection = await collections_tbs.create({ name, user_id: req.session.userId });
    res.status(201).json({ message: 'Collection created successfully', collection: newCollection });
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: 'Collection creation failed' });
  }
});

// Endpoint untuk mendapatkan semua collections
app.get('/collections', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const collections = await collections_tbs.findAll({ where: { user_id: req.session.userId } });
    res.status(200).json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ error: 'Fetching collections failed' });
  }
});

// Endpoint untuk menambahkan tasks
app.post('/tasks', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name, collections_id } = req.body;
  try {
    const newTask = await task_tbs.create({ name, is_done: false, collections_id });
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Task creation failed' });
  }
});

// Endpoint untuk mendapatkan semua tasks berdasarkan collections
app.get('/collections/:collectionId/tasks', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { collectionId } = req.params;
  try {
    const tasks = await task_tbs.findAll({ where: { collections_id: collectionId } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Fetching tasks failed' });
  }
});

// Endpoint untuk mengedit collections
app.put('/collections/:id', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.params;
  const { name } = req.body;

  try {
    const collection = await collections_tbs.findOne({ where: { id, user_id: req.session.userId } });
    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    collection.name = name;
    await collection.save();

    res.status(200).json({ message: 'Collection updated successfully', collection });
  } catch (error) {
    console.error('Error updating collection:', error);
    res.status(500).json({ error: 'Collection update failed' });
  }
});

// Endpoint untuk menghapus collections
app.delete('/collections/:id', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.params;

  try {
    const collection = await collections_tbs.findOne({ where: { id, user_id: req.session.userId } });
    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    await collection.destroy();
    res.status(200).json({ message: 'Collection deleted successfully' });
  } catch (error) {
    console.error('Error deleting collection:', error);
    res.status(500).json({ error: 'Collection deletion failed' });
  }
});

// Endpoint untuk menghapus tasks
app.delete('/tasks/:id', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.params;

  try {
    const task = await task_tbs.findOne({
      include: {
        model: collections_tbs,
        where: { user_id: req.session.userId },
      },
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Task deletion failed' });
  }
});


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
