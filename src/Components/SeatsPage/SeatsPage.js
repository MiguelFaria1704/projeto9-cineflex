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
    const [seatsNames, setSeatsNames] = useState([]);
    const [seatsIds, setSeatsIds] = useState([]); 

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
                            seatsNames={seatsNames}
                            setSeatsNames={setSeatsNames}
                            seatsIds={seatsIds}
                            setSeatsIds={setSeatsIds}   
                        />
                        <Buyer 
                            seatsNames={seatsNames}
                            seatsIds={seatsIds}
                            session={session}
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
    seatsNames,
    setSeatsNames,
    seatsIds,
    setSeatsIds
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
                        seatsNames={seatsNames}
                        setSeatsNames={setSeatsNames}
                        seatsIds={seatsIds}
                        setSeatsIds={setSeatsIds}
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
    seatsNames,
    setSeatsNames,
    seatsIds,
    setSeatsIds
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
                        name.length === 1 ? (
                            setSeatsNames([...seatsNames,`0${name}`])
                        ) : (
                            setSeatsNames([...seatsNames,name])
                        )
                        
                        setSeatsIds([...seatsIds, id]);
                }              
            } else {
                alert("Esse assento não está disponível");
            }
        }}>
            {name.length === 1 ? (
                <p>0{ name }</p>
            ) : (
                <p>{ name }</p>
            )}
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

function Buyer({ 
    seatsNames,
    seatsIds,
    session
}) {
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
        let details = {
            ids: seatsIds,
            name: buyerName,
            cpf: buyerCPF
        }

        event.preventDefault();

        const promise = axios.post("https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many", details)
        
        promise.then(() => {
            navigate("/sucesso", {state:{
                name: buyerName,
                cpf: buyerCPF,
                seats: seatsNames,
                session: session
            }});
            setBuyerName("");
            setBuyerCPF("");
        });   
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name"><h3>Nome do comprador:</h3></label>
            <input 
                type="text" 
                name="name" 
                placeholder="Digite seu nome..." 
                value={buyerName}
                onChange={handleName} 
                required>
            </input>

            <label htmlFor="cpf"><h3>CPF do comprador:</h3></label>
            <input 
                type="text" 
                name="cpf" 
                placeholder="Digite seu CPF..." 
                value={buyerCPF}
                onChange={handleCPF} 
                required maxLength="11" 
                minLength="11">
            </input>

            <input 
                type="submit" 
                value="Reservar assento(s)">
            </input>
        </form>
    );
}