import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import autocolors from 'chartjs-plugin-autocolors';
import { SocketContext } from '../context/SocketContext';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  autocolors
);

export const BandChart = () => {

  const [bands, setBands] = useState([])

  const { socket } = useContext(SocketContext)

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands.bands)
    })

    return () => socket.off('current-bands')
  }, [socket])

  const options = {
    animation: false,
    padding: 10,
    responsive: true,
    plugins: {
      autocolors: {
        mode: 'data',
        offset: 0
      },
      legend: {
        display: false,
        position: '',
      },
      title: {
        display: true,
        text: 'Bandas votadas',
      },
    },
  };


  const data = {
    labels: bands.map(band => band.name),

    datasets: [
      {
        label: bands.map(band => band.name),
        data: bands.map(band => band.votes),
      },
    ],
  }

  return(
    <Bar
      options = { options }
      data = { data }
    />
  )
  }
