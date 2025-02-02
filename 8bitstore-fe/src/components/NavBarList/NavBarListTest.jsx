import NavBarList from "./NavBarList";

const NavBarListTest = () => {
    const items = [
        {
            title: "PLAYSTATION", 
            content: [
                {
                    category: "CONSOLE",
                    contentList: ["PS1", "PS2"]
                },
                {
                    category: "ACCESSORIES",
                    contentList: ["Battery", "Controller","Battery", "Controll2sar","Battery", "Controller"]
                },
                {
                    category: "CONSOLE",
                    contentList: ["PS1", "PS2"]
                },
                {
                    category: "ACCESSORIES",
                    contentList: ["Battery", "Controller","Battery", "Controll2sar","Battery", "Controller"]
                },
                {
                    category: "CONSOLE",
                    contentList: ["PS1", "PS2"]
                },
                {
                    category: "ACCESSORIES",
                    contentList: ["Battery", "Controller","Battery", "Controll2sar","Battery", "Controller"]
                },
                {
                    category: "CONSOLE",
                    contentList: ["PS1", "PS2"]
                },
                {
                    category: "ACCESSORIES",
                    contentList: ["Battery", "Controller","Battery", "Controll2sar","Battery", "Controller"]
                }
            ]
        },
        {
            title: "XBOX", 
            content: [
                {
                    category: "CONSOLE",
                    contentList: ["XBOX ONE", "XBOX SERIES"]
                },
                {
                    category: "ACCESSORIES",
                    contentList: ["Battery", "Controller"]
                }
            ]
        },
        {
            title: "NINTENDO", 
            content: [
                {
                    category: "CONSOLE",
                    contentList: ["3DS", "Switch"]
                },
                {
                    category: "ACCESSORIES",
                    contentList: ["Battery", "Controller"]
                }
            ]
        }
        
    ];

    return (
        <>
            {items.map(item => <NavBarList title={item.title} items={item.content}/>)}
        </> 
    );
}

export default NavBarListTest;