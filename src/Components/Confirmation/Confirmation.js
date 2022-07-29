import "./style.css";
import { Link, useLocation } from "react-router-dom";

export default function Confirmation() {
    const location = useLocation();
    
    function cpf(num){
        num = num.replace(/\D/g,"");                    
        num = num.replace(/(\d{3})(\d)/,"$1.$2");       
        num = num.replace(/(\d{3})(\d)/,"$1.$2");                                               
        num = num.replace(/(\d{3})(\d{1,2})$/,"$1-$2"); 
        return num;
    }
    
    return (
        <div className="confirmation-page">
            <h2>Pedido feito com sucesso</h2>
                <Details
                    details = {{
                        title: "Filme e sessão",
                        info: [
                            location.state.session.movie.title,
                            `${location.state.session.day.weekday} ${location.state.session.name}`
                        ]
                    }} 
                    
                />
                <Details 
                    details = {{
                        title: "Ingressos",
                        info: location.state.seats
                    }} 
                    
                />
                <Details
                    details = {{
                        title: "Comprador",
                        info: [
                            `Nome: ${location.state.name}`,
                            `CPF: ${cpf(location.state.cpf)}`
                        ]
                    }}  
                />
                <Link to="/"><button>Voltar pra Home</button></Link>
        </div>
    );
}

function Details({ details }) {
    return (
        <div className="details">
            
            <h2>{details.title}</h2>
            
            {details.title === "Ingressos" && (
                details.info.map((info, index) => (
                    <h3 key={index}>Assento: {info}</h3>
                ))
            )}

            {details.title !== "Ingressos" && (
                details.info.map((info, index) => (
                    <h3 key={index}>{info}</h3>
                ))
            )}

        
        </div>
    );
}