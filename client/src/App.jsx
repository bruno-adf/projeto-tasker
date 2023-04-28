import React from 'react'
import Dashboard from './Pages/Dashboard'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'

function App() {

    const PrivateRoutes = () => {
        const user = '1'

        return user ? <Outlet /> : <Navigate to='/signup' />
    }

    return (
        <div>
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                    </Route>
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App