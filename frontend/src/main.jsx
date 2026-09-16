import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BPRecording from './BPRecording.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
   <BPRecording/>
  </StrictMode>,
)
