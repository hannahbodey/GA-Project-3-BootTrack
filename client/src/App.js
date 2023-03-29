//Components in Use
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Days from './components/days/Days'
import SingleDay from './components/days/SingleDay'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PageNotFound from './components/common/PageNotFound'
import PageNavBar from './components/common/PageNavBar'
import ProfileView from './components/days/ProfileView'
import Teacher from './components/days/Teacher'

const App = () => {
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <PageNavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/days' element={<Days />} />
          <Route path='/days/:dayId' element={<SingleDay />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<ProfileView />} />
          <Route path='/teacher' element={<Teacher />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
