import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";
import Top from "./Components/Top/Top";
import Home from "./Components/Home/Home";
import Sessions from "./Components/Sessions/Sessions";
import Seats from "./Components/Seats/Seats";
import Confirmation from "./Components/Confirmation/Confirmation";
import "./assets/reset.css";
import "./assets/style.css";

export default function App() {
const [idFilme, setIdFilme] = useState("");
const [idSessao, setIdSessao] = useState("");

    return (
        <BrowserRouter>
            <Top />
            <Routes>
                <Route path="/" element={<Home 
                        setIdFilme={setIdFilme}
                        idFilme={idFilme}
                    />} 
                />
                <Route path={`/sessoes/:${idFilme}`} element={<Sessions 
                        setIdSessao={setIdSessao}
                        idSessao={idSessao}
                        idFilme={idFilme}
                    />} 
                />
                <Route path={`/assentos/:${idSessao}`} element={<Seats />} />
                <Route path="/Confirmação" element={<Confirmation />} />
            </Routes> 
        </BrowserRouter>
    );
}