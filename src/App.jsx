import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Header from './assets/components/Header'
// import Content from './assets/components/Content'
import ProductContextProvider from './assets/components/Context/ProductContextProvider'
import Login from './assets/components/Login/Login'
import Sidebar from './assets/components/Sidebar'
import Body from './assets/components/Body'
import AddnewProduct from './assets/components/AddNewProduct/AddnewProduct'
import EditProduct from './assets/components/EditProduct/EditProduct'
function App() {
  return (
    <>
      <ProductContextProvider>
        <BrowserRouter>
          <Routes>
            {/* Route for the login page */}
            <Route path="/login" element={<Login />} />

            {/* All other routes */}
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <div className="container_content">
                    <Sidebar />
                    <Routes>
                      <Route path="/product" element={<Body />} />
                      <Route path="/Add" element={<AddnewProduct />} />
                      <Route path="/edit/:productId" element={<EditProduct />} />
                    </Routes>
                  </div>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProductContextProvider >
    </>
  )
}

export default App
