const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
server.setMaxListeners(150);
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
    // console.log("gkko")
	socket.emit("me", socket.id)

    socket.emit("connected");

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(7000, () => console.log("server is running on port 7000"))