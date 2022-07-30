import "./style.css";
import { Link, useLocation } from "react-router-dom";

export default function Confirmation() {
    const location = useLocation();

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
                        title: "Compradores",
                        info: location.state.buyers
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
            
            {details.title === "Filme e sessão" && (
                details.info.map((info, index) => (
                    <h3 key={index}>{info}</h3>
                ))
            )}

            {details.title === "Ingressos" && (
                details.info.map((info, index) => (
                    <h3 key={index}>Assento: {info}</h3>
                ))
            )}

            {details.title === "Compradores" && (
                details.info.map((info, index) => (
                    <div key={index}>
                        <h3>Nome: {info.nome}</h3>
                        <Cpf num={info.cpf} />
                    </div>
                ))
            )}

        
        </div>
    );
}

function Cpf({ num }) {
    let cpf = num.toString();

    cpf = cpf.replace(/\D/g,"");                    
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");       
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");                                               
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2"); 

    return (
        <h3>CPF: {cpf}</h3>
    );
}