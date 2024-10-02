import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { CreateUserSubscriptionAction } from "../store/actions/subscriptions.action ";



const useSubScriptionHook = () => {
    const { subscription, isLoading } = useSelector<RootState, any>((state) => state.subscriptions);
    const dispatch = useDispatch();

    const createSubscription = (body: { priceId: string }) => {
        return dispatch<any>(CreateUserSubscriptionAction(body));
    }

    return {
        createSubscription,
        clientSecretKey: subscription.clientSecretKey,
        isLoading

    }
}

export default useSubScriptionHook;