import { useEffect, useMemo, useState } from "react"
import io from "socket.io-client"

export const useSocket = (serverPath) => {
  const [online, setOnline] = useState(false)

  //Usamos useMemo para que solo se cree una instancia de socket
  //y no se cree cada vez que se renderiza el componente, 
  //solo se renderiza cuando cambia el serverPath
  const socket = useMemo(() => io.connect(serverPath,{
    transports: ['websocket']
  }), [serverPath])

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])

  return {
    socket,
    online
  }
}