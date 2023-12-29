import { useEffect, useState } from "react";

interface dimension {
    width: number;
    height: number;
    dsk: boolean;
}

function getWindowDimensions(): dimension{
    const {innerWidth: width, innerHeight: height} = window;
    var dsk = width>680;
    return {
        width,
        height,
        dsk
    };
}

export default function useWindowDimensions(){
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(()=>{
        function handleResize(){
            setWindowDimensions(getWindowDimensions())
        }
        window.addEventListener('resize', handleResize);
        return ()=> window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}