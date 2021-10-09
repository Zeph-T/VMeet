const express = require('express')
const http = require('http')
let cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
let xss = require('xss')
const mongoose = require('mongoose');
const student = require('./src/api/models/student.js')
const Attendance = require('./src/api/models/attendance');
mongoose
  .connect(process.env.VMEET_DB_CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected')
  })
  .catch((err) => {
    console.log('Error connecting to muxdb' + err.stack)
  })

app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.send('connected!')
})
var auth = express.Router()
require('./src/routes/auth.js')(auth)
app.use('/auth', auth)
// app.set('port', process.env.PORT || 8000)

const port = 8000;
var server = app.listen(port,()=>{
    console.log('Server connected at Port 8000');
});
let io = require('socket.io')(server);
sanitizeString = (str) => {
    return xss(str)
  }

connections = {}
messages = {}
timeOnline = {}
studentIdsAndDurations = [];
io.on('connection', (socket) => {

	socket.on('join-call', (path) => {
		if(connections[path] === undefined){
			connections[path] = []
		}
		connections[path].push(socket.id);
		const studentId = path.split('/')[4];
		const subjectId = path.split('/')[3];
		studentIdsAndDurations.push({
			socketId : socket.id,
			_id : studentId,
			subjectId : subjectId
		})
		timeOnline[socket.id] = new Date()

		for(let a = 0; a < connections[path].length; ++a){
			io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
		}

		if(messages[path] !== undefined){
			for(let a = 0; a < messages[path].length; ++a){
				io.to(socket.id).emit("chat-message", messages[path][a]['data'], 
					messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
			}
		}

		console.log(path, connections[path])
	})

	socket.on('signal', (toId, message) => {
		io.to(toId).emit('signal', socket.id, message)
	})

	socket.on('disconnect', async() => {
		let diffTime = Math.abs(timeOnline[socket.id] - new Date());
		// let student =  studentIdsAndDurations.find(oSocket => oSocket.socketId === socket.id);
		let key;
		// await Attendance.findOneAndUpdate({subjectId : mongoose.Types.ObjectId(student.subjectId),date : new Date().toLocaleDateString()},{$push  : {attendees :{_id  : mongoose.Types.ObjectId(student._id) , duration : diffTime} }},{upsert : true});
		for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
			for(let a = 0; a < v.length; ++a){
				if(v[a] === socket.id){
					key = k

					for(let a = 0; a < connections[key].length; ++a){
						io.to(connections[key][a]).emit("user-left", socket.id)
					}
			
					var index = connections[key].indexOf(socket.id)
					connections[key].splice(index, 1)

					console.log(key, socket.id, Math.ceil(diffTime / 1000))

					if(connections[key].length === 0){
						delete connections[key]
					}
				}
			}
		}
	})
})





