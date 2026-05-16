const socket = io();
let username = "";
let room = "";

document.getElementById("join-btn").addEventListener("click", async () => {
  username = document.getElementById("username").value.trim();
  room     = document.getElementById("roomname").value.trim();
  if (!username || !room) return alert("Fill in both fields");

  document.getElementById("header").textContent = `Room: ${room}`;
  document.getElementById("join-screen").style.display = "none";

  // Load history
  const res  = await fetch(`/api/messages/${room}`);
  const msgs = await res.json();
  msgs.forEach(renderMessage);

  socket.emit("join", room);
});

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("msg-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const content = document.getElementById("msg-input").value.trim();
  if (!content) return;
  socket.emit("sendMessage", { room, user: username, content });
  document.getElementById("msg-input").value = "";
}

socket.on("message", renderMessage);

function renderMessage({ user, content, createdAt }) {
  const el  = document.createElement("div");
  el.className = `msg ${user === username ? "mine" : ""}`;
  el.innerHTML = `<div class="meta">${user} · ${new Date(createdAt).toLocaleTimeString()}</div>${content}`;
  document.getElementById("messages").appendChild(el);
  document.getElementById("messages").scrollTop = 9999;
}
