import './ConsoleStore.css';
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const ConsoleStore = ({consoleName, color, imgSrc}) => {
    
    return (
        <div 
            className="console-container"
            style={{ background: color }} 
        >
            <h1>{consoleName}</h1>
            <img src={imgSrc} alt={consoleName} />
        </div>
    )
}

export default ConsoleStore;