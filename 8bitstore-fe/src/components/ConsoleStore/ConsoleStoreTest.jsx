import ConsoleStore from "./ConsoleStore";
import playstationIcon from "./playstation-store-icon-4.png";
import xboxIcon from "./playstation-store-icon-1.png";
import nintendoIcon from "./switch-store-icon.png";
import digitalIcon from "./pc-digital-store-icon-v2.png"

const ConsoleStoreTest = () => {
    const img = [
        {
            title: "PLAYSTATION STORE",
            src: playstationIcon
        },
        {
            title: "XBOX STORE",
            src: xboxIcon
        },
        {
            title: "NINTENDO STORE",
            src: nintendoIcon
        },
        {
            title: "DIGITAL STORE",
            src: digitalIcon
        }
    ]

    return (
        <div 
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                width: "70%",
                gap: "10px"
            }}>
            <ConsoleStore consoleName={img[0].title} color="#064395" imgSrc={img[0].src}/>
            <ConsoleStore consoleName={img[1].title} color="#107C0F" imgSrc={img[1].src}/>
            <ConsoleStore consoleName={img[2].title} color="#F30101" imgSrc={img[2].src}/>
            <ConsoleStore consoleName={img[3].title} color="#787A71" imgSrc={img[3].src}/>

        </div>
        
    );
}

export default ConsoleStoreTest;