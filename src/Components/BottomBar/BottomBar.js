import "./style.css";

export default function BottomBar({ info, session }) {
    return (
        <div className="bottom-bar">
            <div>
                <img src={info.posterURL} alt="Poster" />
            </div>
            
            {session === null ? (
                <div>
                    <h2>{info.title}</h2>
                </div>
            ) : (
                <div>
                    <h2>{info.title}</h2>
                    <h2>{session.day.weekday} - {session.name}</h2>
                </div> 
            )}
        </div>
    ); 
}