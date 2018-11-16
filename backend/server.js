const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var SerialPort = require("serialport");
var serialPort = new SerialPort('COM3', 9600);

app.get('/api', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/fire', (req, res) => {
	console.log("firing!");

  serialPort.write((req.body.power + 65)+ "\n");	//lowercase

  serialPort.write((req.body.rof + 97) + "\n");	//uppercase


  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.write("255\n");
}); 

app.listen(port, () => console.log(`Listening on port ${port}`));
