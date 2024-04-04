const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: ["https://call.noppy.link", "http://localhost:3001"],
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
	socket.emit("me", socket.id)
	console.log(socket.id);

	socket.on("disconnect", () => {
		console.log("disconnect");
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		console.log("callUser" + data);
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		console.log("answerCall" + data);
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(5050, () => console.log("server is running on port 5050"))
