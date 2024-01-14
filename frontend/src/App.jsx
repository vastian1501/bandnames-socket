import { useEffect, useState } from "react"
import BandAdd from "./components/BandAdd"
import { BandList } from "./components/BandList"
import './App.css';
import { useSocket } from "./hooks/useSocket";

function App() {

  const [bands, setBands] = useState([])
  const {socket, online} = useSocket('http://localhost:8080')

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands.bands)
    })
  }, [socket])

  const addVote = (id) => {
    socket.emit('add-vote', id)
  }

  const removeBand = (id) => {
    socket.emit('remove-band', id)
  }

  const changeName = (id, newName) => {
    socket.emit('change-name', { id, newName })
  }

  return (
    <>
      <div className="container">

        <div className="alert">
          <p>
            Estado del servidor:
            {
              online
                ? <span className="text-success">Online</span>
                : <span className="text-danger">Offline</span>
            }
          </p>
        </div>

        <h1>BandNames</h1>
        <hr />

        <div className="row">
          <div className="col-8">
            <BandList
              bands={bands}
              addVote={addVote}
              removeBand={removeBand}
              changeName={changeName}
            />
          </div>
          <div className="col-4">
            <BandAdd />
          </div>
        </div>

      </div>
    </>
  )
}

export default App
