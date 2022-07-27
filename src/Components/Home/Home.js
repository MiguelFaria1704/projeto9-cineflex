import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Home({setIdFilme, idFilme}) {
    return (
        <div className="home">
            <h2>Selecione o Filme</h2>
            <Movies 
                setIdFilme={setIdFilme}
                idFilme={idFilme}
            />
        </div>
    );
}

function Movies({setIdFilme, idFilme}) {
    const [list, setList] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        
        promise.then(answer => {
        setList(answer.data);
    });
    }, []);

    return (
        <div className="catalog">
            {list.map(movie => (
                <Movie
                    key={movie.id} 
                    info={movie}
                    idFilme={idFilme}
                    setIdFilme={setIdFilme}
                />
            ))}
        </div>
    );
}

function Movie({
    info,
    idFilme,
    setIdFilme
}) {
    return (
        <Link to={`/sessoes/:${idFilme}`} onClick={setIdFilme(info.id)}>
            <div className="movie-container">
                <img src={info.posterURL} alt="Poster"/>
            </div>
        </Link>
    ); 
}