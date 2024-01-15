import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {

  const [bands, setBands] = useState([])
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands.bands)
    })

    return () => socket.off('current-bands')
  }, [socket])

  const addVote = (id) => {
    socket.emit('add-vote', id)
  }

  const changeName = (e, id) => {
    const newName = e.target.value
    setBands(bands => bands.map(band => {
      if (band.id === id) {
        band.name = newName
      }
      return band
    }))
  }

  const onLostFocus = (id, newName) => {
    socket.emit('change-name', { id, newName })
  }

  const removeBand = (id) => {
    socket.emit('remove-band', id)
  }

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            bands.map(band => (
              <tr key={band.id}>
                <td>
                  <button className="btn btn-primary" onClick={() => { addVote(band.id) }}>
                    +1
                  </button>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={band.name}
                    onChange={(e) => { changeName(e, band.id) }}
                    onBlur={() => { onLostFocus(band.id, band.name) }}
                  />
                </td>
                <td>
                  <h3>{band.votes}</h3>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => {removeBand(band.id)}}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}


