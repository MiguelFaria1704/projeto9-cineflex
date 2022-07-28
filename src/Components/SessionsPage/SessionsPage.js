import BottomBar from "../BottomBar/BottomBar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./style.css";

export default function SessionsPage() {
    return (
        <div className="sessions-page">
            <h2>Selecione o horário</h2>
            <Sessions /> 
        </div>
    );
}

function Sessions() {
    const { idFilme } = useParams();
    const [movie, setMovie] = useState({});
    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        
        promise.then(answer => {
            setMovie(answer.data);
    });
    }, []);

    return (
        <>
            {movie.days !== undefined && (
                <>
                    <div className="sessions">
                        
                            {movie.days.map(day => (
                                <Day
                                    key={day.id} 
                                    info={day}
                                />
                            ))}
                    </div>
                    
                    <BottomBar info={movie}/> 
                </>   
            )}
        </>
    );
}

function Day({
    info,
    idSessao,
    setIdSessao
}) {
    return (
        <div className="session">
            <h3>{info.weekday} - {info.date}</h3>
            <div>
                <SessionList 
                    showtimes={info.showtimes}/>
            </div>
        </div>
    );
}

function SessionList({ showtimes }) {
    return (
        <div className="session-list">
            {showtimes.map(session => 
                <Link key={ session.id } to={`/assentos/:${ session.id }`}>
                    <div><h3>{ session.name }</h3></div>
                </Link>
            )}
        </div>
    );
}