import { auth } from "../firebase/FirebaseConfig"



export const isUserPremium= async() => {
    await auth.currentUser?.getIdToken(true)
    const decodetoken =  await auth.currentUser?.getIdTokenResult();

    return decodetoken?.claims?.stripeRole ? true : false;
}