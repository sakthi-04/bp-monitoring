import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BPRecording from './BPRecording.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
   {/* <Patient/> */}
   <BPRecording/>
  </StrictMode>,
)
