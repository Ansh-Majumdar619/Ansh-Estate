import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    // console.log(socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen("4000");
console.log("Socket.IO server running on port 4000");

// 4:39:48










// import { Server } from "socket.io";

// const io = new Server({
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

// let onlineUser = [];

// // Function to add a user to the online users array
// const addUser = (userId, socketId) => {
//   const userExists = onlineUser.find((user) => user.userId === userId);
//   if (!userExists) {
//     onlineUser.push({ userId, socketId });
//     console.log(`User added: ${userId} with socket ID: ${socketId}`);
//   } else {
//     console.log(`User ${userId} is already online.`);
//   }
// };

// // Function to remove a user from the online users array
// const removeUser = (socketId) => {
//   onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
//   console.log(`User with socket ID ${socketId} has disconnected.`);
// };

// // Function to get a user by their user ID
// const getUser = (userId) => {
//   const user = onlineUser.find((user) => user.userId === userId);
//   if (user) {
//     console.log(`Found user: ${userId} with socket ID: ${user.socketId}`);
//   } else {
//     console.log(`User ${userId} not found.`);
//   }
//   return user;
// };

// io.on("connection", (socket) => {
//   console.log(`Socket connected: ${socket.id}`);

//   socket.on("newUser", (userId) => {
//     console.log(`New user event received: ${userId}`);
//     addUser(userId, socket.id);
//   });

//   socket.on("sendMessage", ({ receiverId, data }) => {
//     console.log(`Message sent from ${data.senderId} to ${receiverId}: ${data.text}`);
//     const receiver = getUser(receiverId);
//     if (receiver) {
//       io.to(receiver.socketId).emit("getMessage", data);
//       console.log(`Message delivered to ${receiverId}`);
//     } else {
//       console.log(`Failed to deliver message: User ${receiverId} is offline.`);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log(`Socket disconnected: ${socket.id}`);
//     removeUser(socket.id);
//   });
// });

// io.listen("4000");
// console.log("Socket.IO server running on port 4000");
