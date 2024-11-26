import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise : Stripe | null

const initializeStripe = async () => {
    if(!stripePromise){
        stripePromise = await loadStripe('pk_test_51KNOrgDiZr8Acb3cQpjhmyMj7QXYtFKer52peLALF5KH3yYpoMXxkZU0P7g1awu3xxssbF9PqexpVoNshMWDfXzJ00eZ4ZA7E3')
    }

    return stripePromise;
}

export default initializeStripe;