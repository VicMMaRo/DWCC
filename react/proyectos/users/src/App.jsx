import "./App.css";
import {Home} from "./components/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserPage } from "./components/UserPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/user/:id" element={<UserPage/>}></Route>
            </Routes>
        </BrowserRouter> 
    )
}
export default App;
