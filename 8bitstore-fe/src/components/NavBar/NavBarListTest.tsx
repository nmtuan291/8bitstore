import NavMenu from "./NavMenu";

const NavBarListTest = () => {
    const items = [
        {
            title: "Bán Chạy Nhất", 
            content: []
        },
        {
            title: "PLAYSTATION", 
            content: [
                {
                    category: "Máy PS5",
                },
                {
                    category: "Máy PS4",
                },
                {
                    category: "Đĩa game",
                },
                {
                    category: "Phụ kiện",
                }
            ]
        },
        {
            title: "XBOX", 
            content: [
                {
                    category: "Máy Xbox Series X/S",
                },
                {
                    category: "Máy Xbox One",
                },
                {
                    category: "Đĩa game",
                },
                {
                    category: "Phụ kiện",
                }
            ]
        },
        {
            title: "NINTENDO", 
            content: [
                {
                    category: "Máy Nintendo Switch 2",
                },
                {
                    category: "Máy Nintendo Switch",
                },
                {
                    category: "Máy 2DS/3DS",
                },
                {
                    category: "Băng game Nintendo",
                },
                {
                    category: "Phụ kiện",
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