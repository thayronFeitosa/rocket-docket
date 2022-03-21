const socket = io("http://localhost:3000");
let idChatRoom = "";
function onLoad() {

  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const avatar = urlParams.get("avatar");
  const email = urlParams.get("email");

  socket.emit("start", {
    email,
    name,
    avatar,
  });

  document.querySelector(".user_logged").innerHTML += `
  <img
    class="avatar_user_logged"
    src=${avatar}
  />
  <strong id="user_logged">${name}</strong>

`;

  socket.on("new_users", (user) => {
    const existInDiv = document.getElementById(`user_${user._id}`);
    if (!existInDiv) {
      addUser(user);
    }
  });

  socket.emit("get_users", (users) => {
    users.map((user) => {
      if (user.email !== email) {
        addUser(user);
      }
    });
  });

  socket.on("message", (data) => {
    addMessage(data);
  })

  function addMessage(data) {
    const divMessageUser = document.getElementById('message_user');
    divMessageUser.innerHTML += `
    <span class="user_name user_name_date">
      <img
        class="img_user"
        src=${data.user.avatar_url}
      />
      <strong>${data.user.name}</strong>
      <span> ${dayjs(data.message.created_at).format('DD/MM/YYYY HH:mm')}</span>
      </span>
      
    <div class="messages">
      <span class="chat_message"> ${data.message.text}</span>
    </div>`
  }

  function addUser(user) {
    const usersList = document.getElementById("users_list");
    usersList.innerHTML += ` 
    <li
      class="user_name_list"
      id="user_${user._id}"
      idUser="${user._id}"
      >
        <img
          class="nav_avatar"
          src=${user.avatar_url}
        />
        ${user.name}
    </li>
  `;
  }
  document.getElementById('users_list').addEventListener('click', (event) => {
    document.getElementById('message_user').innerHTML = "";
    if (event.target && event.target.matches('li.user_name_list')) {
      const idUser = event.target.getAttribute('idUser');
      socket.emit('start_chat', { idUser }, (response) => {
        idChatRoom = response.room.idChatRoom,
          response.messages.forEach((message) => {
            const data = {
              message,
              user: message.to
            };
            addMessage(data)
          })
      })
    }
  });

  document.getElementById('user_message').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const message = event.target.value;
      event.target.value = "";

      const data = {
        message,
        idChatRoom
      }
      socket.emit("message", data);
    }

  })
}

onLoad();