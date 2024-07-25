import LoginForm from "./components/LoginForm";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import HomePage from "./components/HomePage";
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className="app-container">
      <Routes>
        
      
         <Route path="/" element={<Navigation />}>
         <Route path="/login" element={<LoginForm />} />
         <Route index element={<HomePage />} />
         <Route path="/upload" element={<FileUpload />} />
         <Route path="/files" element={<FileList />} />
         </Route>
      
        
      </Routes>
      </div> 
      </BrowserRouter>
    </AuthProvider>
      
  );
};

export default App;