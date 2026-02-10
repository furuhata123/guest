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



//handle no drawing comment
const knownEmptyDrawings = [
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAF2UlEQVR4AezU227bOhAFUOP8/0efvDhokNiWRJGcyyoKtLElcmbtYP/38IcAAQJJBBRWkqCMSYDA46Gw/BYQIJBGQGGliWp8UCcQyC6gsLInaH4CjQQUVqOwrUogu4DCyp6g+Qn8JVD0M4VVNFhrEagooLAqpmonAkUFFFbRYK1FoKKAwvorVZ8RIBBSQGGFjMVQBAj8JaCw/lLxGQECIQUUVshYDLVOwE2ZBBRWprTMSqC5gMJq/gtgfQKZBBRWprTMSqC5wGBhNdezPgECSwUU1lJulxEgMCKgsEb0vEuAwFIBhbWUO/VlhiewXUBhbY/AAAQIHBVQWEelPEeAwHYBhbU9AgMQiCcQdSKFFTUZcxEg8EtAYf0i8QEBAlEFFFbUZMxFgMAvAYX1i2T8AycQIDBHQGHNcXUqAQITBBTWBFRHEiAwR0BhzXF1ahcBey4VUFhLuV1GgMCIgMIa0fMuAQJLBRTWUm6XESAwIrC3sEYm9y4BAu0EFFa7yC1MIK+AwsqbnckJtBNQWO0i37WwewmMCyiscUMnECCwSEBhLYJ2DQEC4wIKa9zQCQQI/BSY9pPCmkbrYAIE7hZQWHeLOo8AgWkCCmsarYMJELhbQGHdLTp+nhMIEHghoLBewPiYAIF4AgorXiYmIkDghYDCegHjYwIrBNxxTkBhnfPyNAECGwUU1kZ8VxMgcE5AYZ3z8jQBAhsFUhfWRjdXEyCwQUBhbUB3JQEC1wQU1jU3bxEgsEFAYW1Ad+UFAa8Q+BJQWF8I/hIgkENAYeXIyZQECHwJKKwvBH8JEIgk8HoWhfXaxjcECAQTUFjBAjEOAQKvBRTWaxvfECAQTEBhBQtkfBwnEKgroLDqZmszAuUEFFa5SC1EoK6Awqqbrc3qC7TbUGG1i9zCBPIKKKy82ZmcQDsBhdUucgsTyCvQubDypmZyAk0FFFbT4K1NIKOAwsqYmpkJNBVQWE2D77a2fWsIKKwaOdqCQAsBhdUiZksSqCGgsGrkaAsCLQQOFVYLCUsSIBBeQGGFj8iABAg8BRTWU8K/BAiEF1BY4SNaPKDrCAQWUFiBwzEaAQI/BRTWTw8/ESAQWEBhBQ7HaATmCuQ7XWHly8zEBNoKKKy20VucQD4BhZUvMxMTaCugsC5H70UCBFYLKKzV4u4jQOCygMK6TOdFAgRWCyis1eLuyyhg5iACCitIEMYgQOCzgML6bOQJAgSCCCisIEEYgwCBzwIrCuvzFJ4gQIDAAQGFdQDJIwQIxBBQWDFyMAUBAgcEFNYBJI8cF/AkgZkCCmumrrMJELhVQGHdyukwAgRmCiismbrOJlBZYMNuCmsDuisJELgmoLCuuXmLAIENAgprA7orCRC4JqCwrrmNv+UEAgROCyis02ReIEBgl4DC2iXvXgIETgsorNNkXiBwVsDzdwkorLsknUOAwHQBhTWd2AUECNwloLDuknQOAQLTBRIU1nQDFxAgkERAYSUJypgECDweCstvAQECaQQUVpqoWgxqSQJvBRTWWx5fEiAQSUBhRUrDLAQIvBVQWG95fEmAwCyBK+cqrCtq3iFAYIuAwtrC7lICBK4IKKwrat4hQGCLgMLawj5+qRMIdBRQWB1TtzOBpAIKK2lwxibQUUBhdUzdzrkETPstoLC+KfyHAIHoAgorekLmI0DgW0BhfVP4DwEC0QXqF1b0BMxHgMBhAYV1mMqDBAjsFlBYuxNwPwEChwUU1mEqD8YXMGF1AYVVPWH7ESgkoLAKhWkVAtUFFFb1hO1HoJDAP4VVaCurECBQUkBhlYzVUgRqCiismrnaikBJAYVVMtaPS3mAQEoBhZUyNkMT6CmgsHrmbmsCKQUUVsrYDE3guEClJxVWpTTtQqC4gMIqHrD1CFQSUFiV0rQLgeICCutDwL4mQCCOgMKKk4VJCBD4IKCwPgD5mgCBOAIKK04WJtkt4P7wAgorfEQGJEDgKaCwnhL+JUAgvIDCCh+RAQkQeAr8DwAA//+Cw3OPAAAABklEQVQDAOx/AS0pote3AAAAAElFTkSuQmCC" 
];
function isMeaningfulDrawing(data) {
  return data && !knownEmptyDrawings.includes(data);
}

function renderMessages(messages) {
  const board = document.getElementById("message-board");
  board.innerHTML = "";
  
  messages.forEach(msg => {
    const card = document.createElement("div");
    card.className = "message-card";

    card.innerHTML = `
      <strong>${msg.name}</strong>&nbsp;<span class="time">${msg.localtime ?? ""}</span><br>
      ${msg.message}
      ${isMeaningfulDrawing(msg.drawing)
  ? `<img class="drawing-preview" src="${msg.drawing}" alt="drawing" />`
  : ""}

    `;

    const key = `${msg.name}|${msg.message}`;
    const reply = replies[key] ?? "";

    if (reply) {
      const replyDiv = document.createElement("div");
      replyDiv.className = "reply";
      replyDiv.textContent = `Reply：${reply}`;
      card.appendChild(replyDiv);
    }

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

  
