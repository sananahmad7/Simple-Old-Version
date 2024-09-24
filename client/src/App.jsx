import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header';
import { BrowserRouter, Route, Router } from 'react-router-dom';

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-full'>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
