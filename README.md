# 👾 GhostVoice — Discord AFK Selfbot

> Selfbot Discord yang menjaga akunmu tetap aktif di voice channel tanpa perlu online secara manual.

---

## 📌 Tentang

**GhostVoice** adalah Discord selfbot berbasis Node.js yang memanfaatkan library `discord.js-selfbot-v13` dan `@discordjs/voice` untuk menjaga akun Discord kamu tetap terhubung ke voice channel secara otomatis — sehingga kamu tidak akan di-kick karena AFK.

> ⚠️ **Disclaimer:** Penggunaan selfbot melanggar [Terms of Service Discord](https://discord.com/terms). Gunakan dengan risiko sendiri. Project ini hanya untuk keperluan edukasi.

---

## ✨ Fitur

| Fitur | Keterangan |
|-------|------------|
| 🎙️ Auto Join Voice Channel | Bot otomatis masuk ke voice channel yang ditentukan |
| 🔇 Silent Mode | Bergabung tanpa suara (muted & deafened) agar tidak mengganggu |
| 🔄 Auto Reconnect | Otomatis reconnect jika koneksi terputus |
| 💤 Anti-AFK | Mencegah akun di-kick karena tidak aktif di voice |
| ⚙️ Konfigurasi Mudah | Token dan channel ID langsung diisi di file konfigurasi |
| 🟢 Status Online | Menjaga status akun tetap terlihat online |

---

## 🛠️ Instalasi

### Prasyarat

- [Node.js](https://nodejs.org/) versi `>=16.9.0`
- npm

### Langkah-langkah

```bash
# 1. Clone repository ini
git clone https://github.com/FidenID/GhostVoice.git
cd GhostVoice

# 2. Install dependencies
npm install

# 3. Konfigurasi token dan channel (lihat bagian Konfigurasi)

# 4. Jalankan bot
npm start
# atau
node index.js
```

---

## ⚙️ Konfigurasi

Buka file `index.js` dan isi bagian berikut:

```js
const TOKEN = "USER_TOKEN_KAMU_DISINI";
const CHANNEL_ID = "VOICE_CHANNEL_ID_DISINI";
```

Cara mendapatkan **User Token** Discord:
1. Buka Discord di browser
2. Tekan `F12` → tab **Console**
3. Ketik: `webpackChunkdiscord_app.push([[Math.random()],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]);m.filter(m=>m?.exports?.default?.getToken!==void 0).map(m=>m.exports.default.getToken())`
4. Copy token yang muncul

---

## 📦 Dependencies

```json
{
  "@discordjs/voice": "^0.18.0",
  "discord.js-selfbot-v13": "3.1.0"
}
```

---

## 🚀 Cara Menjalankan

```bash
node index.js
```

Bot akan otomatis login menggunakan token yang dikonfigurasi dan bergabung ke voice channel yang ditentukan.

---

## 📁 Struktur File

```
GhostVoice/
├── index.js        # File utama bot
├── package.json    # Konfigurasi project & dependencies
└── README.md       # Dokumentasi
```

---

## ❗ Peringatan

- **Jangan pernah share token Discord kamu ke siapapun.**
- Selfbot bisa menyebabkan akun Discord kamu **dibanned permanen**.
- Project ini dibuat **hanya untuk tujuan belajar/edukasi**.

---

## 👤 Author

**FidenID** — [GitHub](https://github.com/FidenID)

---

## 📄 License

Project ini tidak memiliki lisensi resmi. Gunakan dengan bijak.
