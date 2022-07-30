import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Top() {
    const navigate = useNavigate();
    const back = "<";
    const path = useLocation().pathname;

    return (
        
            <div className="top">
                {path === "/" ? (
                    <>  
                        CINEFLEX
                    </>
                ) : ( 
                    <>
                        <div className="back" onClick={() => navigate(-1)}>{back}</div>
                        CINEFLEX
                    </>
                )}
            </div>        
    ); 
}