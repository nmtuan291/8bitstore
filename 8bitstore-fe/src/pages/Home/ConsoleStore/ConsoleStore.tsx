import playstationIcon from "@/assets/images/playstation-store-icon-4.png";
import xboxIcon from "@/assets/images/playstation-store-icon-1.png";
import nintendoIcon from "@/assets/images/switch-store-icon.png";
import digitalIcon from "@/assets/images/pc-digital-store-icon-v2.png";
import "./ConsoleStore.scss";

const ConsoleStoreTest = () => {
    const stores = [
        {
            title: "PLAYSTATION STORE",
            src: playstationIcon,
            color: "#064395"
        },
        {
            title: "XBOX STORE",
            src: xboxIcon,
            color: "#107C0F"
        },
        {
            title: "NINTENDO STORE",
            src: nintendoIcon,
            color: "#F30101"
        },
        {
            title: "DIGITAL STORE",
            src: digitalIcon,
            color: "#787A71"
        }
    ];

    return (
        <div className="console-store-grid">
            {stores.map((store, index) => (
                <div 
                    key={index}
                    className="console-container"
                    style={{ background: store.color }} 
                >
                    <h1>{store.title}</h1>
                    <img src={store.src} alt={store.title} />
                </div>
            ))}
        </div>
    );
}

export default ConsoleStoreTest;