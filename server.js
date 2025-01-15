const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Menyajikan file statis jika ada
app.use(express.static('public'));

// Endpoint untuk mendapatkan IP
app.get('/get-ip', (req, res) => {
    // Cek jika header 'X-Real-IP' ada, jika tidak fallback ke 'x-forwarded-for' atau remoteAddress
    const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send(`IP Pengunjung: ${ip}`);
});

// Endpoint utama
app.get('/', (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Selamat datang!</h1>
                <p>Untuk mengetahui IP Anda, kunjungi <a href="/get-ip">/get-ip</a></p>
            </body>
        </html>
    `);
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});