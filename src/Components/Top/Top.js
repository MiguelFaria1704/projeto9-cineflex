import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Top() {
    const navigate = useNavigate();
    const back = "<";
    
    return (
        <div className="top">
            <div className="back" onClick={() => navigate(-1)}>{back}</div>
            CINEFLEX
        </div>
    ); 
}