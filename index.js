"use strict";

// ─── KONFIGURASI ─────────────────────────────────────────────────────────────
const TOKEN    = process.env.DISCORD_TOKEN  || "your_user_token";
const OWNER_ID = process.env.OWNER_ID       || "allow_user";
const VC_ID    = process.env.VOICE_CHANNEL_ID || null; // Opsional, bisa di-set via !join
const DELAY_MS = 5000;
// ─────────────────────────────────────────────────────────────────────────────

const { Client } = require("discord.js-selfbot-v13");

const client = new Client({
  checkUpdate: false,
  readyStatus: false,
  intents: [
    "GUILDS",
    "GUILD_VOICE_STATES",
    "DIRECT_MESSAGES",
  ],
  partials: ["CHANNEL"],  // Wajib agar DM bisa diterima
});

const allowed = new Set([OWNER_ID]);
let currentVC  = VC_ID;
let reconnTimer = null;

// ── Join Voice ────────────────────────────────────────────────────────────────
async function joinVC(id) {
  try {
    const ch = await client.channels.fetch(id);
    if (!ch || ch.type !== "GUILD_VOICE") return "❌ Bukan voice channel.";
    const { joinVoiceChannel } = require("@discordjs/voice");
	joinVoiceChannel({
	 channelId: ch.id,
	 guildId: ch.guild.id,
	 adapterCreator: ch.guild.voiceAdapterCreator,
	 selfMute: true,
	 selfDeaf: true,
	});
    currentVC = id;
    return `✅ Join: #${ch.name} (${ch.guild.name})`;
  } catch (e) {
    return `❌ Gagal: ${e.message}`;
  }
}

// ── Leave Voice ───────────────────────────────────────────────────────────────
function leaveVC() {
  try {
    client.voice.adapters.forEach((_, gId) => {
      client.guilds.cache.get(gId)?.me?.voice?.disconnect();
    });
    currentVC = null;
    if (reconnTimer) { clearTimeout(reconnTimer); reconnTimer = null; }
    return "✅ Keluar dari voice.";
  } catch {
    return "⚠️ Tidak sedang di voice.";
  }
}

// ── Auto-reconnect ────────────────────────────────────────────────────────────
function scheduleReconn() {
  if (!currentVC || reconnTimer) return;
  reconnTimer = setTimeout(async () => {
    reconnTimer = null;
    await joinVC(currentVC);
  }, DELAY_MS);
}

// ── DM Handler ────────────────────────────────────────────────────────────────
// Perintah via DM ke akun ini:
//   !join <id>        → masuk voice channel
//   !leave            → keluar voice
//   !add <user_id>    → (owner) tambah user ke whitelist
//   !remove <user_id> → (owner) hapus user dari whitelist
//   !status           → cek status
client.on("messageCreate", async (msg) => {
  if (msg.guildId) return;
  if (!allowed.has(msg.author.id)) return;

  const parts = msg.content.trim().split(/\s+/);
  const cmd   = parts[0]?.toLowerCase();
  const arg   = parts[1];

  if (cmd === "!join") {
    if (!arg) return msg.channel.send("❌ `!join <channel_id>`");
    msg.channel.send(await joinVC(arg));

  } else if (cmd === "!leave") {
    msg.channel.send(leaveVC());

  } else if (cmd === "!add") {
    if (msg.author.id !== OWNER_ID) return msg.channel.send("❌ Hanya owner.");
    if (!arg) return msg.channel.send("❌ `!add <user_id>`");
    allowed.add(arg);
    msg.channel.send(`✅ \`${arg}\` ditambahkan.`);

  } else if (cmd === "!remove") {
    if (msg.author.id !== OWNER_ID) return msg.channel.send("❌ Hanya owner.");
    if (arg === OWNER_ID) return msg.channel.send("❌ Tidak bisa hapus owner.");
    allowed.delete(arg);
    msg.channel.send(`✅ \`${arg}\` dihapus.`);

  } else if (cmd === "!status") {
    const inVoice = (client.voice?.adapters?.size ?? 0) > 0;
    msg.channel.send(
      `📊 **Status**\n` +
      `Voice: ${inVoice ? `✅ di \`${currentVC}\`` : "❌ Tidak di voice"}\n` +
      `Whitelist: ${[...allowed].map(i => `\`${i}\``).join(", ")}`
    );
  }
});

// ── Deteksi disconnect dari voice ─────────────────────────────────────────────
client.on("voiceStateUpdate", (o, n) => {
  if (o.id !== client.user?.id) return;
  if (o.channelId === currentVC && !n.channelId) {
    console.log("[!] Disconnect dari voice, reconnect...");
    scheduleReconn();
  }
});

// ── Ready ─────────────────────────────────────────────────────────────────────
client.once("ready", async () => {
  console.log(`[✓] Login: ${client.user.tag}`);
  if (currentVC) {
    const res = await joinVC(currentVC);
    console.log(res);
  } else {
    console.log("[i] Kirim DM '!join <channel_id>' untuk mulai.");
  }
});

client.on("error", (e) => console.error("[ERR]", e.message));
process.on("unhandledRejection", (e) => console.error("[REJ]", e?.message ?? e));

client.login(TOKEN).catch((e) => {
  console.error("[!] Login gagal:", e.message);
  process.exit(1);
});
