import { Routes, Route, Navigate } from 'react-router-dom'
import RefactorPage from '../../pages/RefactorPage/index'
import UserPage from '../../pages/UserPage/index'
import './App.scss'
function App() {


  return(
    <>
    <Routes>
      <Route path="/" element={<UserPage/>}></Route>
      <Route path="/user/:id" element={<RefactorPage/>}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )

}

export default App
