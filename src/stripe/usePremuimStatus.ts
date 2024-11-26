import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { isUserPremium } from "./isUserPremuim";


export default function usePremiumStatus(user: firebase.User) {
    const [isPremuim, setIsPremium] = useState(false);

    useEffect( () => {
        if(user){
            const checPremuimFunction = async function() {
                setIsPremium(await isUserPremium())
            };
            checPremuimFunction(); 
        }

    }, [user])

    return isPremuim;
}