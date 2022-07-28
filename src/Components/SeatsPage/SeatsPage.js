import axios from "axios";
import { useNavigate, useParams }  from "react-router-dom";
import { useState, useEffect } from "react";
import BottomBar from "../BottomBar/BottomBar";
import "./style.css";

export default function SeatsPage() {    
    return (
        <div className="seats-page">
            <h2>Selecione o(s) assentos(s)</h2>
            <Order />
        </div>
    );
}

function Order () {
    const { idSessao } = useParams();
    const [session, setSession] = useState({});
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao}/seats`);
        
        promise.then(answer => {
            setSession(answer.data);
    });
    }, []);

    return (
            <>
                {session.seats !== undefined ? (
                    <>
                        <Seats 
                            info={session.seats} 
                            setSeats={setSeats}
                            seats={seats}    
                        />
                        <Buyer seats={seats}/>
                        <BottomBar 
                            info={session.movie}
                            session={session}
                        />
                    </> 
                ) : 
                <p>Carregando...</p>}
            </>
    ); 
}

function Seats({ info, 
    setSeats,
    seats
}) {  
    return (
        <>
            <div className="seats">
                {info.map(seat => (
                    <Seat
                        key={seat.id}
                        id={seat.id}
                        name={seat.name}
                        isAvailable={seat.isAvailable}
                        setSeats={setSeats}
                        seats={seats}
                    />
                ))}
            </div>
            <Label />
        </>
    );
}

function Seat({
    id,
    name,
    isAvailable,
    setSeats,
    seats
}) {
    const [status, setStatus] = useState("available");

    useEffect(() => {
        if(isAvailable === false ) {
        setStatus("unavailable");
    }
    }, []);
    
    return (
        <div className={`seat ${status}`} onClick={() => {
            if(isAvailable !== false) {
                if(status === "selected" ) {
                    setStatus("available");
                }   else {
                        setStatus("selected");
                        setSeats([...seats, id])
                }              
            } else {
                alert("Esse assento não está disponível");
            }
        }}>
            <p>{ name }</p>
        </div>
    );
}

function Label() {
    return (
        <div className="label">
            <div>
                <div className="seat selected"></div>
                <p>Selecionado</p>
            </div>
            <div>
                <div className="seat available"></div>
                <p>Disponível</p>
            </div>
            <div>
                <div className="seat unavailable"></div>
                <p>Indisponível</p>
            </div>
        </div>
    ); 
}

function Buyer({ seats }) {
    const [buyerName, setBuyerName] = useState("");
    const [buyerCPF, setBuyerCPF] = useState("");
    const navigate = useNavigate();

    function handleName(event) {
        setBuyerName(event.target.value);
    }

    function handleCPF(event) {
        setBuyerCPF(event.target.value);
    }

    function handleSubmit(event) {
        const details = {
            ids: seats,
            name: buyerName,
            cpf: buyerCPF
        }

        event.preventDefault();

        const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", details)
        
        promise.then(() => {
            navigate("/sucesso");
            console.log(details)
        });   
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Nome do comprador:</h3>
            <input type="text" name="name" placeholder="Digite seu nome..." onChange={handleName} required></input>
            <h3>CPF do comprador:</h3>
            <input type="text" name="cpf" placeholder="Digite seu CPF..." onChange={handleCPF} required maxLength="11" minLength="11"></input>
            <input type="submit" value="Reservar assento(s)"></input>
        </form>
    );
}