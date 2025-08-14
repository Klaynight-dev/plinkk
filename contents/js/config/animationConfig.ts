export const styleSheet = document.styleSheets[0];

export const animations = [
    {
    name: "fade",
    keyframes: "fade 1s ease-in-out"
    },
    {
    name: "slide",
    keyframes: "slide 1s ease-in-out"
    },
    {
    name: "zoom",
    keyframes: "zoom 1s ease-in-out"
    },
    {
    name: "rotate",
    keyframes: "rotate 1s ease-in-out"
    },
    {
    name: "bounce",
    keyframes: "bounce 1s ease-in-out"
    },
    {
    name: "shake",
    keyframes: "shake 1s ease-in-out"
    },
    {
    name: "flip",
    keyframes: "flip 1s ease-in-out"
    },
    {
    name: "pulse",
    keyframes: "pulse 1s ease-in-out "
    },
    {
    name: "swing",
    keyframes: "swing 1s ease-in-out"
    },
    {
    name: "wobble",
    keyframes: "wobble 1s ease-in-out"
    },
    {
        name: "flash",
        keyframes: "flash 1s ease-in-out"
    },
    {
        name: "rubberBand",
        keyframes: "rubberBand 1s ease-in-out"
    },
    {
        name: "tada",
        keyframes: "tada 1s ease-in-out"
    },
    {
        name: "jello",
        keyframes: "jello 1s ease-in-out"
    },
    {
        name: "heartBeat",
        keyframes: "heartBeat 1s ease-in-out"
    },
    {
        name: "lightSpeedIn",
        keyframes: "lightSpeedIn 1s ease-in-out"
    },
    {
        name: "rollIn",
        keyframes: "rollIn 1s ease-in-out"
    },
    {
        name: "hinge",
        keyframes: "hinge 1s ease-in-out"
    }
];

export const animationBackground = [
    {
        name: "moveBackground",
        keyframes: "moveBackground linear infinite"
    }
];

styleSheet.insertRule(`
@keyframes fade {
    from { opacity: 0; }
    to { opacity: 1; }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes slide {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes zoom {
    from { transform: scale(0); }
    to { transform: scale(1); }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(10px);
    }
}
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
@keyframes flip {
    from {
        transform: rotateY(0);
    }
    to {
        transform: rotateY(360deg);
    }
}
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes swing {
    20% {
        transform: rotate(15deg);
    }
    40% {
        transform: rotate(-10deg);
    }
    60% {
        transform: rotate(5deg);
    }
    80% {
        transform: rotate(-5deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes wobble {
    0% {
        transform: translateX(0%);
    }
    15% {
        transform: translateX(-25%) rotate(-5deg);
    }
    30% {
        transform: translateX(20%) rotate(3deg);
    }
    45% {
        transform: translateX(-15%) rotate(-3deg);
    }
    60% {
        transform: translateX(10%) rotate(2deg);
    }
    75% {
        transform: translateX(-5%) rotate(-1deg);
    }
    100% {
        transform: translateX(0%);
    }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes moveBackground {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 100% 100%;
    }
}
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
@keyframes flash {
    0%, 50%, 100% {
        opacity: 1;
    }
    25%, 75% {
        opacity: 0;
    }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes rubberBand {
    0% {
        transform: scale(1);
    }
    30% {
        transform: scale(1.25, 0.75);
    }
    40% {
        transform: scale(0.75, 1.25);
    }
    50% {
        transform: scale(1.15, 0.85);
    }
    65% {
        transform: scale(0.95, 1.05);
    }
    75% {
        transform: scale(1.05, 0.95);
    }
    100% {
        transform: scale(1);
    }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes tada {
    0% {
        transform: scale(1);
    }
    10%, 20% {
        transform: scale(0.9) rotate(-3deg);
    }
    30%, 50%, 70%, 90% {
        transform: scale(1.1) rotate(3deg);
    }
    40%, 60%, 80% {
        transform: scale(1.1) rotate(-3deg);
    }
    100% {
        transform: scale(1) rotate(0);
    }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes jello {
    0% {
        transform: none;
    }
    11.1% {
        transform: skewX(-12.5deg) skewY(-12.5deg);
    }
    22.2% {
        transform: skewX(6.25deg) skewY(6.25deg);
    }
    33.3% {
        transform: skewX(-3.125deg) skewY(-3.125deg);
    }
    44.4% {
        transform: skewX(1.5625deg) skewY(1.5625deg);
    }
    55.5% {
        transform: skewX(-0.78125deg) skewY(-0.78125deg);
    }
    66.6% {
        transform: skewX(0.390625deg) skewY(0.390625deg);
    }
    77.7% {
        transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
    }
    88.8% {
        transform: skewX(0.09765625deg) skewY(0.09765625deg);
    }
    100% {
        transform: none;
    }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes heartBeat {
    0% {
        transform: scale(1);
    }
    14% {
        transform: scale(1.3);
    }
    28% {
        transform: scale(1);
    }
    42% {
        transform: scale(1.3);
    }
    70% {
        transform: scale(1);
    }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes lightSpeedIn {
    0% {
        transform: translateX(100%) skewX(-30deg);
        opacity: 0;
    }
    60% {
        transform: skewX(20deg);
        opacity: 1;
    }
    80% {
        transform: skewX(-5deg);
        opacity: 1;
    }
    100% {
        transform: none;
        opacity: 1;
    }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes rollIn {
    0% {
        opacity: 0;
        transform: translateX(-100%) rotate(-120deg);
    }
    100% {
        opacity: 1;
        transform: translateX(0) rotate(0deg);
    }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes hinge {
    0% {
        transform: rotate(0);
        transform-origin: top left;
        animation-timing-function: ease-in-out;
    }
    20%, 60% {
        transform: rotate(80deg);
        transform-origin: top left;
        animation-timing-function: ease-in-out;
    }
    40%, 80% {
        transform: rotate(60deg);
        transform-origin: top left;
        animation-timing-function: ease-in-out;
    }
    100% {
        transform: translateY(700px);
        opacity: 0;
    }
}
`, styleSheet.cssRules.length);