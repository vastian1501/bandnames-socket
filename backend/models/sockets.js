const BandList = require('./band-list');

class Sockets {

    constructor( io ) {

        this.io = io;

        this.bandList = new BandList()

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('Cliente conectado');
            this.io.emit('current-bands', this.bandList)
            
            socket.on('add-vote', (id) => {
                console.log(id)
                this.bandList.increaseVotes(id)
                this.io.emit('current-bands', this.bandList)
            })

            socket.on('remove-band', (id) => {
                this.bandList.removeBand(id)
                this.io.emit('current-bands', this.bandList)
            })

            socket.on('change-name', ({id, newName}) => {
                this.bandList.changeName(id, newName)
                this.io.emit('current-bands', this.bandList)
            })

            socket.on('create-band', (name) => {
                this.bandList.addBand(name)
                this.io.emit('current-bands', this.bandList)
            })
        });

    }


}


module.exports = Sockets;