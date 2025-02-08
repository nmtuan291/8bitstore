import NavMenu from "./NavMenu";

const NavBarListTest = () => {
    const items = [
        {
            title: "Bán Chạy Nhất", 
            content: [
                {
                    category: "asdasd",
                },
                {
                    category: "ACCESSORIES",
                },
                {
                    category: "CONSOLE",
                },
                {
                    category: "ACCESSORIES",
                },
                {
                    category: "CONSOLE",
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
            title: "PLAYSTATION", 
            content: [
                {
                    category: "asdasd",
                },
                {
                    category: "ACCESSORIES",
                },
                {
                    category: "CONSOLE",
                },
                {
                    category: "ACCESSORIES",
                },
                {
                    category: "CONSOLE",
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
                    category: "asdasd",
                },
                {
                    category: "ACCESSORIES",
                },
                {
                    category: "CONSOLE",
                },
                {
                    category: "ACCESSORIES",
                },
                {
                    category: "CONSOLE",
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
            title: "NINTENDO", 
            content: [
                {
                    category: "asdasd",
                },
                {
                    category: "ACCESSORIES",
                },
                {
                    category: "CONSOLE",
                },
                {
                    category: "ACCESSORIES",
                },
                {
                    category: "CONSOLE",
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
        
        
 
    ];

    return (
        <>
            {items.map(item => <NavMenu title={item.title} items={item.content}/>)}
        </> 
    );
}

export default NavBarListTest;