import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Top from "./Components/Top/Top";
import Home from "./Components/Home/Home";
import SessionsPage from "./Components/SessionsPage/SessionsPage";
import Seats from "./Components/Seats/Seats";
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
                <Route path="/assentos/:idSessao" element={<Seats />} />
                <Route path="/Confirmação" element={<Confirmation />} />
            </Routes> 
        </BrowserRouter>
    );
}