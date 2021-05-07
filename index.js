const btnConnect = document.querySelector('.btnConnect');
const btnMsg = document.querySelector('.btnMsg');

btnConnect.onclick = startConnection;
btnMsg.onclick = sendingMessage;

// Create peer connection
const peer = new Peer();

// Get peer id
peer.on('open', function(id) {
  console.log('My peer ID: ', id);
});

/*  
'peer.connect' and the callback of the 'connection' event will both provide a dataConnection object. 
This object will allow you to send and receive data:
*/
let dataConnection;

// Connect from side A to B
function startConnection() {
	const partnerPeerId = document.querySelector('.partnerPeerId').value;

	console.log('Connect from side A to B');

	// Open connection with side B
	dataConnection = peer.connect(partnerPeerId);

	// Getting messages from side B
	dataConnection.on('data', (data) => {
		console.log('Getting messages from side B:', '\n', data);
	});
}

// Receive connection from side A
peer.on('connection', function(connection) { 
	console.log('Connection with side A - works good');
	dataConnection = connection;
	console.log(dataConnection);

	// Getting messages from side A
	dataConnection.on('data', function(data) {
		console.log('Getting messages from side A:', '\n', data);
	});
});

function sendingMessage() {
	const message = document.querySelector('.msg').value;
	if (dataConnection) {
		console.log('Sending message to partner'); 
		dataConnection.send(message);
	}
}
