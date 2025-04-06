import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
// const port = process.env.PORT || 3000;

// Construct __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "dist" directory after building
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by serving the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Frontend server started on port ${port}`);
});
