import axios from "axios";
import { Link, useParams }  from "react-router-dom";
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
    const [buyerName, setBuyerName] = useState("");
    const [buyerCPF, setBuyerCPF] = useState("");
    const [numSeats, setNumSeats] = useState(0);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        
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
                            numSeats={numSeats}
                            setNumSeats={setNumSeats}
                        />
                        <Buyer 
                            setBuyerName={setBuyerName}
                            setBuyerCPF={setBuyerCPF}
                        />
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

function Seats({ 
    info,
    numSeats, 
    setNumSeats 
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
                        numSeats={numSeats}
                        setNumSeats={setNumSeats}
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
    numSeats, 
    setNumSeats
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
                    setNumSeats(numSeats - 1);
                }   else {
                        setStatus("selected");
                        setNumSeats(numSeats + 1); 
                }              
            } else {
                return;
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

function Buyer() {
    return (
        <form /*onSubmit={handleSubmit}*/>
            <h3>Nome do comprador:</h3>
            <input type="text" name="name" placeholder="Digite seu nome..." /*onChange={handleName}*/ required></input>
            <h3>CPF do comprador:</h3>
            <input type="text" name="cpf" placeholder="Digite seu CPF..." /*onChange={handleCPF}*/ required></input>
            <input type="submit" value="Reservar assento(s)"></input>
        </form>
    );
}