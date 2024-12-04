import { db } from "../firebase/FirebaseConfig";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import initializeStripe from "./initializeStripe";

export const createCheckOutSession = async (uid: string) => {
  console.log("Initializing checkout session for user:", uid);

  const checkoutRef = collection(db, "users", uid, "checkout_sessions");
  console.log("Checkout sessions collection reference:", checkoutRef);

  try {
    // Create a new checkout session document in Firestore
    const result = await addDoc(checkoutRef, {
      price: "price_1QNyMWDiZr8Acb3cXsQgHJ3Q", // Replace with your Stripe Price ID
      mode: "payment", // Use 'subscription' if the price is recurring
      success_url: `${window.location.origin}/dashboard`,
      cancel_url: `${window.location.origin}/dashboard`,
    });

    console.log("Checkout session document created. Document ID:", result.id);

    // Reference for the session document
    const sessionDocRef = doc(db, "users", uid, "checkout_sessions", result.id);
    console.log("Session document reference created:", sessionDocRef);

    // Listen for changes to the session document
    onSnapshot(sessionDocRef, async (snap) => {
      console.log("Snapshot received. Snapshot data:", snap.data());

      const sessionData = snap.data();
      

      // Check if the sessionData is available
      if (!sessionData) {
        console.error("Snapshot data is empty or not found!");
        return;
      }

      // Check if the session ID is available
      if (sessionData?.sessionId) {
        console.log("Session ID found:", sessionData?.sessionId);

        const stripe = await initializeStripe();
        console.log("Stripe initialized:", stripe);

        if (stripe) {
          stripe.redirectToCheckout({ sessionId: sessionData?.sessionId })
            .then(() => {
              console.log("Redirected to Stripe checkout successfully.");
            })
            .catch((err) => {
              console.error("Error redirecting to Stripe checkout:", err);
            });
        } else {
          console.error("Stripe not initialized. Cannot redirect.");
        }
      } else if (sessionData.error) {
        console.error("Error from Firestore:", sessionData?.error);
      } else {
        console.log(sessionData,"<<==Session id")
        console.log("Session ID not yet available in Firestore. Waiting...");
      }
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
  }
};
