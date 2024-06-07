import { activate } from "firebase/remote-config"
import { getfile } from "../services/firebase"

export const navigate = (screen: any ) => {
    return {
        action: 'navigate',
        payload: screen,
    }
}
export const getPostAction = async(post: any) => {
    // const post   = await getfile()
    return { 
        action: 'getpost',
        payload: post,
    };
};