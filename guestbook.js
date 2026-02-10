const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mousemove", e => {
    if (!drawing)
        return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#000";
    ctx.fillRect(e.clientX - rect.left, e.clientY - rect.top, 2, 2);
});

document.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    const local = now.toLocaleString();
    const input = document.getElementById("localtime");
    if (input) input.value = local;
});



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guestbook');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        try {
            await fetch(form.action, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
            alert('Submitted. Thanks.');
            form.reset();
        } catch (err) {
            alert('Failed…… report a problem?(｡•́︿•̀｡)');
        }
    });
});


document
    .querySelector("form")
    .addEventListener("submit", () => {
        document
            .getElementById("drawing-data")
            .value = canvas.toDataURL("image/png");
    });

//reply diction
const replies = {
  "Test|test": "Thank you for testing. It wasn't completely set up before... It's live on https://voidhead.net/guest/ now. (I moved to GitHub)"
};

const key = `${msg.name}|${msg.message}`;
const reply = replies[key] ?? "";

function renderMessages(messages) {
    const board = document.getElementById("message-board");
    board.innerHTML = "";
    messages.forEach(msg => {
      const card = document.createElement("div");
      card.className = "message-card";
      card.innerHTML = `
        <strong>${msg.name}</strong>&nbsp;<span class="time">${msg.localtime ?? ""}</span>
        <br>
        ${msg.message}
        ${msg.drawing && msg.drawing.length > 100
          ? `<img class="drawing-preview" src="${msg.drawing}" alt="drawing" />`
          : ""}
            const reply = replies[key] ?? ""; 
            card.innerHTML += reply ? `<div class="reply">Reply：${reply}</div>` : "";
      `;
      board.appendChild(card);
    });
  }
  
fetch('https://script.google.com/macros/s/AKfycby04ZVpJSOEWR6dpMJ7eeF4H_9J1LPNe1rz5GyaMDx-Ug37FlbBfAIrCzp3ftSivuSR/exec')
  .then(res => {
    if (!res.ok) throw new Error('fetch failed');
    return res.json();
  })
  .then(messages => {
    renderMessages(messages.reverse());
  })
  .catch(err => {
    console.warn('Fetch 失败，加载本地测试数据', err);
    const mockMessages = [
      {
        name: "Neo",
        localtime: "local test",
        message: "这是本地测试消息",
        drawing: "data:image/gif;base64,R0lGODlhAQABAAAAACw="
      }
    ];
    renderMessages(mockMessages);
  });

  
