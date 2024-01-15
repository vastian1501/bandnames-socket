import { useContext } from "react"
import { SocketContext } from "../context/SocketContext"

const BandAdd = () => {

  const { socket } = useContext( SocketContext )

  const addBand = (e) => {
    e.preventDefault()
    let name = e.target.name.value

    if (name.trim().length > 0) {
      socket.emit('create-band', name)
      e.target.name.value = ''
    }
  }

  return (
    <>
      <h3>Agegar Banda</h3>

      <form action="" className="my-3" onSubmit={addBand}>
        <div className="form-group">
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Nuevo nombre de banda"
            autoComplete="off"
          />
        </div>
      </form>
    </>
  );
}

export default BandAdd;