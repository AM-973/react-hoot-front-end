import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import HootList from './components/HootList/HootList'
import HootDetails from './components/HootDetails/HootDetails'
import HootForm from './components/HootForm/HootForm'
import CommentForm from './components/CommentForm/CommentForm';
import { Route, Routes, useNavigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import * as hootService from './services/hootService'
import { useState, useEffect } from 'react'
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';


const App = () => {

  // src/App.jsx

const navigate = useNavigate();

  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)
  const [hoots, setHoots] = useState([])

  useEffect(() => {
    // going to run a service to fetch all hoots
    const fetchAllHoots = async () => {
      try {
        const hootsData = await hootService.index()
        setHoots(hootsData || [])
      } catch (err) {
        console.error('Failed to fetch hoots:', err)
        setHoots([])
      }
    }
    fetchAllHoots()
  }, [])


  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      // return success
      return { success: true }
    } catch(err){
      // return failure flag (then signup form can display message)
      // add message?
      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData)
    setUser(res)
  }

  const handleAddHoot = async(formData) => {
    try {
      const newHoot = await hootService.create(formData)
      setHoots([newHoot, ...hoots])
      navigate('/hoots');
    } catch (err) {
      console.error('Failed to create hoot:', err)
    }
  }

  const handleDeleteHoot = async(hootId) => {
    try {
      await hootService.deleteHoot(hootId)
      setHoots(hoots.filter((hoot) => hoot._id !== hootId))
      navigate('/hoots')
    } catch (err) {
      console.error('Failed to delete hoot:', err)
    }
  }

  const handleUpdateHoot = async(formData, hootId) => {
    const updatedHoot = await hootService.update(formData, hootId)
    navigate(`/hoots/${hootId}`)
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          {user ? (
            // Protected Routes
            <>
              <Route path='/dashboard' element={<Dashboard user={user} />} />
              <Route path='/hoots/new' element={<HootForm handleAddHoot={handleAddHoot} />} />
              <Route path='/hoots/:hootId/edit' element={<HootForm handleUpdateHoot={handleUpdateHoot} />} />
              <Route path="/hoots/:hootId/comments/:commentId/edit" element={<CommentForm />}
/>
            </>
          ) : (
            // Public Routes
            <> 
              <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
              <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
            </>
          )}
          <Route path='/' element={<Landing />} />
          <Route path='/hoots' element={<HootList hoots={hoots} />} />
          <Route path='/hoots/:hootId' element={<HootDetails user={user} handleDeleteHoot={handleDeleteHoot} />} />
          <Route path='*' element={<h1>404 PAGE NOT FOUND</h1>} />
      </Routes>
    </>

  )
}

export default App

