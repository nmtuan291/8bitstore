import './ConsoleStore.css';

interface ConsoleStoreProps {
    consoleName: string, 
    color: string,
    imgSrc: string
}

const ConsoleStore: React.FC<ConsoleStoreProps> = ({consoleName, color, imgSrc}) => {
    
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