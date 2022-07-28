import "./style.css";

export default function BottomBar({info}) {
    return (
        <div className="bottom-bar">
            <div>
                <img src={info.posterURL} alt="Poster" />
            </div>
            <div>
                <h2>{info.title}</h2>
                <h2></h2>
            </div> 
        </div>
    ); 
}