import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Display, Form, List, GoogleMap } from './components'
import ResizePanel from "react-resize-panel";
import { exportPoints, importPoints } from './points'
import { AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai';
import { Calulate } from './algorithms'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import withObservables from '@nozbe/with-observables'
import { Draw } from './draw'



const App = () => {

  const [markersDriver, addMarkersDriver] = useState([])
  const [markersClient, addMarkersClient] = useState([])
  const [arrayMatch, setArrayMatch] = useState([])
  const [output, setOutput] = useState([])
  const [drawAPI, setDrawAPI] = useState(null)
  const [countDriver, setCountDriver] = useState(0)
  const [countClient, setCountClient] = useState(0)
  const inputFile = useRef(null)
  const markersDriverRef = useRef(markersDriver);
  const arrayMatchRef = useRef(arrayMatch);
  const countDriverRef = useRef(countDriver);
  const outputRef = useRef(output);


  const drawBuild = (bounds, timeIn, timeOut, options) => {
    const drawObject = drawAPI.drawBounds({ bounds, options })
    const delay = setTimeout(() => {
      drawObject.include()
      if (timeOut !== null) {
        setTimeout(() => {
          drawObject.getDrawPrev()?.getDrawPrev()?.exclude()
          drawObject.getDrawPrev()?.exclude()
        }, timeOut * drawObject.getIdx());
      }

    }, timeIn * ((drawObject.getIdx() - 1) * 2));
    drawAPI.addDelay(delay)
    return drawObject
  }

  const setDraw = async ({ type, coords, bounds }) => {
    if (drawAPI) {
      if (type === 'searchClient') {
        drawBuild(bounds, 400, 0, { color: '#800080' })

      } else if (type === 'searchDriver') {

        drawBuild(bounds, 400, 0, { color: '#FFFF00' })

      } else if (type === 'match') {
        const drawObject = drawBuild(bounds, 400, null, { color: '#00FF00' })
        if (coords) {
          const routeDrawObject = drawAPI.drawDirections({ origin: coords[0], destination: coords[1] })
          routeDrawObject.then(value => {
            const delay = setTimeout(() => {
              value.poly.include()
              value.marker.include()
            }, 400 * ((drawObject.getIdx() - 1) * 2));

            drawAPI.addDelay(delay)
          })
        }
      } else if (type === 'defaultPlace') {
        drawBuild(bounds, 0, null, { color: '#808080' })
        drawBuild(bounds, 0, null, { color: '#808080' })
        drawBuild(bounds, 0, null, { color: '#808080' })
      }

    }

  }


  useEffect(() => {
    markersDriverRef.current = markersDriver
    countDriverRef.current = countDriver
    arrayMatchRef.current = arrayMatch
    outputRef.current = output
  }, [setCountDriver, markersDriver, arrayMatch, output])


  return (
    <div id='container' className='flex' style={{ flex: 1, flexDirection: 'column' }}>
      <div className='flex' style={{ height: 50, width: '100%', backgroundColor: '#1111', boxShadow: 2 }}>
        <h3>&ensp;&ensp;&ensp;&ensp;&ensp;Match simulator</h3>
      </div>
      <div className='flex' style={{ flex: 1, flexDirection: 'row' }} >
        <ResizePanel direction="e" handleClass="customHandle" borderClass="customResizeBorder" className='flex' style={{ backgroundColor: '#1111' }} >
          <Form algorithms={['Based on geospatial index']} onSelectedAlgorithm={async (algo) => {
            if (drawAPI) { drawAPI.clearDraw() }
            Calulate[algo]({
              dataClients: [...markersClient].reverse(), dataDrivers: [...markersDriver].reverse(), output: outputRef, setOutput, arrayMatch: arrayMatchRef, setArrayMatch, setDraw,
              options: {
                initialResolution: 11,
                depthLimit: 5
              }
            })
          }} />
        </ResizePanel>
        <div className='flex' style={{ flex: 1 }}>
          <div className='flex' style={{ flex: 1, height: '100%', width: '100%' }}>
            <GoogleMap
              markersClient={markersClient}
              addMarkersClient={addMarkersClient}
              markersDriver={markersDriver}
              addMarkersDriver={addMarkersDriver}
              onGoogleApiLoaded={({ map, maps }) => {
                setDrawAPI(new Draw(map, maps))
              }}
              onClick={({ x, y, lat, lng, event }) => {
                addMarkersClient([{ id: 'C' + countClient, lat, lng, isDriver: false }, ...markersClient])
                setCountClient(countClient + 1)
              }}
              onRightClick={(event) => {
                const lat = event.latLng.lat()
                const lng = event.latLng.lng()
                addMarkersDriver(markersDriverRef.current = ([{ id: 'D' + countDriverRef.current, lat, lng, isDriver: true }, ...markersDriverRef.current]))
                setCountDriver(countDriverRef.current = countDriverRef.current + 1)
              }}
              arrayMatch={arrayMatch}
            />
          </div>
          <ResizePanel direction="n" className='flex' style={{ height: 50 }} >
            <Display results={output} />
          </ResizePanel>
        </div>

        <ResizePanel direction="w" handleClass="customHandle" borderClass="customResizeBorder" className='flex' style={{ height: '100vh', width: 300 }} >
          <div>
            <div >
              <input id="myInput" />
              <button onClick={() => exportPoints(markersClient, markersDriver, document.getElementById('myInput').value)}><AiOutlineDownload /></button>
              <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={(e) => e.target.files[0].text().then(value => importPoints(value, addMarkersClient, addMarkersDriver, setCountClient, setCountDriver, countDriverRef))} />
              <button onClick={() => inputFile.current.click()}><AiOutlineUpload /></button>
            </div>
            <List
              clients={markersClient}
              drivers={markersDriver}
              onCloseClient={(position) => addMarkersClient(markersClient.filter((value, idx) => position.id !== value.id))}
              onCloseDriver={(position) => addMarkersDriver(markersDriver.filter((value, idx) => position.id !== value.id))}
            />
          </div>

        </ResizePanel>
      </div >
    </div >
  );
}

const enhance = withObservables([], ({ database }) => ({
  draw1: database.collections.get('draw').query().observe(),
}))

export default withDatabase(enhance(App));
