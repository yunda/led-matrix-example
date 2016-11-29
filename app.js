const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const paper = require('paper');

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

const canvas = new paper.Canvas(128, 32);

paper.setup(canvas);

// const circle = new paper.Path.Circle({
//     center: paper.view.center,
//     radius: 5,
//     fillColor: 'black'
// });

// const text = new paper.PointText(paper.view.center);
// text.content = 'Hello world.';
// text.style = {
//     fontFamily: 'Courier New',
//     fontWeight: 'bold',
//     fontSize: 12,
//     fillColor: 'red',
//     justification: 'center'
// };

const raster = new paper.Raster({
    source: './images/buses-logo.png',
    position: [19, 16]
});

raster.onLoad = function() {

    paper.view.draw();
    io.on('connection', function(socket){
        console.log('user connected');

        io.emit('matrix redraw', {
            dataUrl: canvas.toDataURL(),
            imageData: canvas.getContext('2d').getImageData(0,0, 128, 32)
        });
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
};




