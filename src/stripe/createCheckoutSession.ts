import { db } from "../firebase/FirebaseConfig";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import initializeStripe from "./initializeStripe";

export const createCheckOutSession = async (uid: string) => {

    const stripe = await initializeStripe();
    
    if (stripe) {
        stripe.redirectToCheckout({ sessionId: "1QdW0vPsV5TW6v72Li5W" });
    }
    // const checkoutRef = collection(db, 'users', uid, 'checkout_sessions');  // Changed to 'checkout_sessions' (plural)
    
    // // Create a new checkout session document
    // const result = await addDoc(checkoutRef, {
    //     price: 'price_1QNyMWDiZr8Acb3cXsQgHJ3Q',
    //     successURL: window.location.origin,
    //     cancelURL: window.location.origin,
    // });

    // // Use the document reference from the result to listen for changes
    // const sessionDocRef = doc(db, 'users', uid, 'checkout_sessions', result.id);  // Updated path

    // onSnapshot(sessionDocRef, async (snap) => {
    //     const sessionData = snap.data(); // Get data from the snapshot
    //     if (sessionData && sessionData.sessionId) {  // Ensure sessionId is available
    //         const stripe = await initializeStripe();
    //         if (stripe) {
    //             stripe.redirectToCheckout({ sessionId: sessionData.sessionId });
    //         }
    //     }
    // });
};