const themes = [
    {
        // Grey Theme (0)
        background: "rgba(255, 255, 255, 0.6)",
        hoverColor: "#7289DA",
        textColor: "black",
        buttonBackground: "#7289DA",
        buttonHoverBackground: "#424f7e",
        buttonTextColor: "black",
        linkHoverColor: "#7289DA",
        articleHoverBoxShadow: "0px 4px 8px rgba(114, 137, 218, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(0, 0, 0, 0.6)",
            hoverColor: "#7289DA",
            textColor: "white",
            buttonBackground: "#424f7e",
            buttonHoverBackground: "#7289DA",
            buttonTextColor: "white",
            linkHoverColor: "#7289DA",
            articleHoverBoxShadow: "0px 4px 8px rgba(114, 137, 218, 0.3)",
            darkTheme: true
        }
    },
    {
        // Dark Yellow Theme (1)
        background: "rgba(255, 223, 0, 0.6)",
        hoverColor: "#FFD700",
        textColor: "black",
        buttonBackground: "#FFA500",
        buttonHoverBackground: "#FFD700",
        buttonTextColor: "black",
        linkHoverColor: "#FFD700",
        articleHoverBoxShadow: "0px 4px 8px rgba(255, 215, 0, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(0, 0, 0, 0.6)",
            hoverColor: "#FFD700",
            textColor: "white",
            buttonBackground: "#FFD700",
            buttonHoverBackground: "#FFA500",
            buttonTextColor: "white",
            linkHoverColor: "#FFA500",
            articleHoverBoxShadow: "0px 4px 8px rgba(255, 215, 0, 0.3)",
            darkTheme: true
        }
    },
    {
        // Green Theme (2)
        background: "rgba(255, 255, 255, 0.6)",
        hoverColor: "#00FF00",
        textColor: "black",
        buttonBackground: "#00FF00",
        buttonHoverBackground: "#006400",
        buttonTextColor: "black",
        linkHoverColor: "#006400",
        articleHoverBoxShadow: "0px 4px 8px rgba(0, 255, 0, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(0, 128, 0, 0.6)",
            hoverColor: "#00FF00",
            textColor: "white",
            buttonBackground: "#006400",
            buttonHoverBackground: "#00FF00",
            buttonTextColor: "white",
            linkHoverColor: "#00FF00",
            articleHoverBoxShadow: "0px 4px 8px rgba(0, 255, 0, 0.3)",
            darkTheme: true
        }
    },
    {
        // Blue Theme (3)
        background: "rgba(255, 255, 255, 0.8)",
        hoverColor: "#0077B5",
        textColor: "black",
        buttonBackground: "#00A0DC",
        buttonHoverBackground: "#0077B5",
        buttonTextColor: "black",
        linkHoverColor: "#0077B5",
        articleHoverBoxShadow: "0px 4px 8px rgba(0, 119, 181, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(0, 0, 0, 0.8)",
            hoverColor: "#0077B5",
            textColor: "white",
            buttonBackground: "#0077B5",
            buttonHoverBackground: "#00A0DC",
            buttonTextColor: "white",
            linkHoverColor: "#00A0DC",
            articleHoverBoxShadow: "0px 4px 8px rgba(0, 119, 181, 0.3)",
            darkTheme: true
        }
    },
    {
        // Red Theme (4)
        background: "rgba(255, 0, 0, 0.6)",
        hoverColor: "#FF0000",
        textColor: "black",
        buttonBackground: "#FF0000",
        buttonHoverBackground: "#8B0000",
        buttonTextColor: "black",
        linkHoverColor: "#8B0000",
        articleHoverBoxShadow: "0px 4px 8px rgba(255, 0, 0, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(0, 0, 0, 0.6)",
            hoverColor: "#FF0000",
            textColor: "white",
            buttonBackground: "#8B0000",
            buttonHoverBackground: "#FF0000",
            buttonTextColor: "white",
            linkHoverColor: "#FF0000",
            articleHoverBoxShadow: "0px 4px 8px rgba(255, 0, 0, 0.3)",
            darkTheme: true
        }
    },
    {
        // Light Blue Theme (5)
        background: "rgba(173, 216, 230, 0.6)",
        hoverColor: "#87CEFA",
        textColor: "black",
        buttonBackground: "#87CEFA",
        buttonHoverBackground: "#4682B4",
        buttonTextColor: "black",
        linkHoverColor: "#4682B4",
        articleHoverBoxShadow: "0px 4px 8px rgba(135, 206, 250, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(0, 0, 0, 0.6)",
            hoverColor: "#87CEFA",
            textColor: "white",
            buttonBackground: "#4682B4",
            buttonHoverBackground: "#87CEFA",
            buttonTextColor: "white",
            linkHoverColor: "#87CEFA",
            articleHoverBoxShadow: "0px 4px 8px rgba(135, 206, 250, 0.3)",
            darkTheme: true
        }
    },
    {
        // Dark Theme (6)
        background: "rgba(255, 255, 255, 0.9)",
        hoverColor: "#FF4500",
        textColor: "black",
        buttonBackground: "#FF4500",
        buttonHoverBackground: "#333333",
        buttonTextColor: "black",
        linkHoverColor: "#333333",
        articleHoverBoxShadow: "0px 4px 8px rgba(255, 69, 0, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(0, 0, 0, 0.9)",
            hoverColor: "#FF4500",
            textColor: "white",
            buttonBackground: "#333333",
            buttonHoverBackground: "#FF4500",
            buttonTextColor: "white",
            linkHoverColor: "#FF4500",
            articleHoverBoxShadow: "0px 4px 8px rgba(255, 69, 0, 0.3)",
            darkTheme: true
        }
    },
    {
        // Orange Theme (7)
        background: "rgba(255, 165, 0, 0.6)",
        hoverColor: "#FFA500",
        textColor: "black",
        buttonBackground: "#FFA500",
        buttonHoverBackground: "#FF8C00",
        buttonTextColor: "black",
        linkHoverColor: "#FF8C00",
        articleHoverBoxShadow: "0px 4px 8px rgba(255, 165, 0, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(0, 0, 0, 0.6)",
            hoverColor: "#FFA500",
            textColor: "white",
            buttonBackground: "#FF8C00",
            buttonHoverBackground: "#FFA500",
            buttonTextColor: "white",
            linkHoverColor: "#FFA500",
            articleHoverBoxShadow: "0px 4px 8px rgba(255, 165, 0, 0.3)",
            darkTheme: true
        }
    },
    {
        // Grey Theme (8)
        background: "rgba(211, 211, 211, 0.5)",
        hoverColor: "#A9A9A9",
        textColor: "black",
        buttonBackground: "#A9A9A9",
        buttonHoverBackground: "#696969",
        buttonTextColor: "black",
        linkHoverColor: "#696969",
        articleHoverBoxShadow: "0px 4px 8px rgba(169, 169, 169, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(128, 128, 128, 0.5)",
            hoverColor: "#A9A9A9",
            textColor: "white",
            buttonBackground: "#696969",
            buttonHoverBackground: "#A9A9A9",
            buttonTextColor: "white",
            linkHoverColor: "#A9A9A9",
            articleHoverBoxShadow: "0px 4px 8px rgba(169, 169, 169, 0.3)",
            darkTheme: true
        }
    },
    {
        // Green Grey Theme (9)
        background: "rgba(255, 255, 255, 0.6)",
        hoverColor: "#00FF00",
        textColor: "black",
        buttonBackground: "#00FF00",
        buttonHoverBackground: "#006400",
        buttonTextColor: "black",
        linkHoverColor: "#006400",
        articleHoverBoxShadow: "0px 4px 8px rgba(0, 255, 0, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(0, 0, 0, 0.6)",
            hoverColor: "#00FF00",
            textColor: "white",
            buttonBackground: "#006400",
            buttonHoverBackground: "#00FF00",
            buttonTextColor: "white",
            linkHoverColor: "#00FF00",
            articleHoverBoxShadow: "0px 4px 8px rgba(0, 255, 0, 0.3)",
            darkTheme: true
        }
    },
    {
        // Very Light Blue Theme (10)
        background: "rgba(255, 255, 255, 0.6)",
        hoverColor: "#0000FF",
        textColor: "black",
        buttonBackground: "#ADD8E6",
        buttonHoverBackground: "#0000FF",
        buttonTextColor: "black",
        linkHoverColor: "#0000FF",
        articleHoverBoxShadow: "0px 4px 8px rgba(0, 0, 255, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(0, 0, 0, 0.6)",
            hoverColor: "#0000FF",
            textColor: "white",
            buttonBackground: "#0000FF",
            buttonHoverBackground: "#ADD8E6",
            buttonTextColor: "white",
            linkHoverColor: "#ADD8E6",
            articleHoverBoxShadow: "0px 4px 8px rgba(0, 0, 255, 0.3)",
            darkTheme: true
        }
    },
    {
        // Brown Theme (11)
        background: "rgba(255, 255, 255, 0.6)",
        hoverColor: "#A0522D",
        textColor: "black",
        buttonBackground: "#A0522D",
        buttonHoverBackground: "#8B4513",
        buttonTextColor: "black",
        linkHoverColor: "#8B4513",
        articleHoverBoxShadow: "0px 4px 8px rgba(160, 82, 45, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(139, 69, 19, 0.6)",
            hoverColor: "#A0522D",
            textColor: "white",
            buttonBackground: "#8B4513",
            buttonHoverBackground: "#A0522D",
            buttonTextColor: "white",
            linkHoverColor: "#A0522D",
            articleHoverBoxShadow: "0px 4px 8px rgba(160, 82, 45, 0.3)",
            darkTheme: true
        }
    },
    {
        // Pink Theme (12)
        background: "rgba(255, 182, 193, 0.6)",
        hoverColor: "#FF1493",
        textColor: "black",
        buttonBackground: "#FF69B4",
        buttonHoverBackground: "#FF1493",
        buttonTextColor: "black",
        linkHoverColor: "#FF1493",
        articleHoverBoxShadow: "0px 4px 8px rgba(255, 20, 147, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(0, 0, 0, 0.6)",
            hoverColor: "#FF1493",
            textColor: "white",
            buttonBackground: "#FF1493",
            buttonHoverBackground: "#FF69B4",
            buttonTextColor: "white",
            linkHoverColor: "#FF69B4",
            articleHoverBoxShadow: "0px 4px 8px rgba(255, 20, 147, 0.3)",
            darkTheme: true
        }
    },
    {
        // Purple Theme (13)
        background: "rgba(255, 255, 255, 0.6)",
        hoverColor: "#800080",
        textColor: "black",
        buttonBackground: "#800080",
        buttonHoverBackground: "#4B0082",
        buttonTextColor: "black",
        linkHoverColor: "#4B0082",
        articleHoverBoxShadow: "0px 4px 8px rgba(128, 0, 128, 0.3)",
        darkTheme: false,
        opposite: {
            background: "rgba(128, 0, 128, 0.6)",
            hoverColor: "#800080",
            textColor: "white",
            buttonBackground: "#4B0082",
            buttonHoverBackground: "#800080",
            buttonTextColor: "white",
            linkHoverColor: "#800080",
            articleHoverBoxShadow: "0px 4px 8px rgba(128, 0, 128, 0.3)",
            darkTheme: true
        }
    },
    {
        // Neptune Theme (14)
        background: "#e6d5d5",
        hoverColor: "#800080",
        textColor: "black",
        buttonBackground: "#8a7272",
        buttonHoverBackground: "#7a6262",
        buttonTextColor: "black",
        linkHoverColor: "#ADD8E6",
        articleHoverBoxShadow: "0px 4px 8px rgba(128, 0, 128, 0.3)",
        darkTheme: false,
        opposite: {
            background: "#1a1a1a",
            hoverColor: "#d2b48c",
            textColor: "white",
            buttonBackground: "#d2b48c",
            buttonHoverBackground: "#deb887",
            buttonTextColor: "white",
            linkHoverColor: "#deb887",
            articleHoverBoxShadow: "0px 4px 8px rgba(210, 180, 140, 0.3)",
            darkTheme: true
        }
    }
    // Ajoutez autant de thèmes que vous le souhaitez
];
export { themes };
