import { useContext } from "react"
import BandAdd from "../components/BandAdd"
import { BandList } from "../components/BandList"
import '../App.css';
import { SocketContext } from "../context/SocketContext";
import { BandChart } from "../components/BandChart";

function HomePage() {

  const { online } = useContext(SocketContext)

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

        <div className="row mb-4">
          <div className="col-12">
            <BandChart />
          </div>
        </div>

        <div className="row">
          <div className="col-8">
            <BandList />
          </div>
          <div className="col-4">
            <BandAdd />
          </div>
        </div>

      </div>
    </>
  )
}

export default HomePage
