import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./Components/Top/Top";
import Home from "./Components/Home/Home";
import SessionsPage from "./Components/SessionsPage/SessionsPage";
import SeatsPage from "./Components/SeatsPage/SeatsPage";
import Confirmation from "./Components/Confirmation/Confirmation";
import "./assets/reset.css";
import "./assets/style.css";

export default function App() {
    return (
        <BrowserRouter>
            <Top />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage/>} />
                <Route path="/assentos/:idSessao" element={<SeatsPage />} />
                <Route path="/sucesso" element={<Confirmation />} />
            </Routes> 
        </BrowserRouter>
    );
}