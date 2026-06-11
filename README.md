# AFK Self-Bot

## Install
npm install discord.js-selfbot-v13 @discordjs/voice

## Run
DISCORD_TOKEN=tokenmu OWNER_ID=idmu node index.js

# Dengan VC langsung join saat start:
DISCORD_TOKEN=tokenmu OWNER_ID=idmu VOICE_CHANNEL_ID=123456 node index.js

# Pakai PM2
pm2 start index.js --name afkbot \
  --env DISCORD_TOKEN=tokenmu \
  --env OWNER_ID=idmu
pm2 save && pm2 startup

## Perintah (via DM)
| Perintah         | Fungsi                          |
|------------------|---------------------------------|
| !join <id>       | Join voice channel              |
| !leave           | Keluar voice channel            |
| !claim           | Toggle auto-claim ON/OFF        |
| !status          | Cek status bot                  |
| !add <user_id>   | Tambah user ke whitelist        |
| !remove <user_id>| Hapus user dari whitelist       |

## Auto-Claim
Bot otomatis kirim /claim ke TempVoice ketika semua
user manusia keluar dari VC dan hanya bot yang tersisa.
Toggle dengan !claim (default: ON)

## Catatan
- Semua perintah hanya via DM
- Self-bot melanggar ToS Discord, gunakan dengan risiko sendiri
