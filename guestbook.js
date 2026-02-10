document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guestbook');
  
    // canvas
    const canvas = document.getElementById("draw");
    const ctx = canvas.getContext("2d");
    let drawing = false;
  
    canvas.addEventListener("mousedown", () => drawing = true);
    canvas.addEventListener("mouseup", () => drawing = false);
    canvas.addEventListener("mousemove", e => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      ctx.fillStyle = "#000";
      ctx.fillRect(
        e.clientX - rect.left,
        e.clientY - rect.top,
        2,
        2
      );
    });
  
    // localtime
    const now = new Date();
    const local = now.toLocaleString();
    const localtimeInput = document.getElementById("localtime");
    if (localtimeInput) localtimeInput.value = local;
  
    // submit
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // canvas → base64
      document.getElementById("drawing-data").value =
        canvas.toDataURL("image/png");
  
      // 每次 submit 重新构建
      const formData = new URLSearchParams();
      formData.append('name', form.elements['name'].value);
      formData.append('localtime', form.elements['localtime'].value);
      formData.append('message', form.elements['message'].value);
      formData.append('drawing', form.elements['drawing'].value);
  
      try {
        await fetch('https://script.google.com/macros/s/AKfycbx70mczE5FXRP6r9TsgChKgw41dHCxZgsFEG1GCjDWw/exec', {
          method: 'POST',
          body: formData
        });
        alert('Submitted! Thanks (｀ω´ )');
        form.reset();
      } catch (err) {
        alert('Failed… (｡•́︿•̀｡)');
      }
    });
  
    // mock render
    const messages = [
      {
        name: "Neo",
        localtime: "local test",
        message: "local test",
        drawing: "data:image/gif;base64,R0lGODlhAQABAAAAACw="
      }
    ];
  
    const board = document.getElementById("message-board");
    messages.forEach(msg => {
      const card = document.createElement("div");
      card.className = "message-card";
      card.innerHTML = `
        <strong>${msg.name}</strong>
        <span class="time">${msg.localtime ?? ""}</span><br>
        ${msg.message}
        ${msg.drawing ? `<img class="drawing-preview" src="${msg.drawing}">` : ""}
      `;
      board.appendChild(card);
    });
  });
  