import { Alert } from "react-native";

import {
    BASE_URL, GET, POSTS
} from "../../constants/Api";
import { MakeApiRequest } from "../api/apiCall";
import { print } from "../../utils";
import { setPostListData } from "../reducers/postSlice";


export const receivePostListData = () => async (dispatch) => {
    try {
        let data = await MakeApiRequest({ apiUrl: BASE_URL + POSTS, apiMethod: GET });
        if (data?.data != undefined && data?.data?.length != undefined && data?.data?.length > 0) {
            await dispatch(setPostListData(data?.data))
        } else if (data?.data?.statusCode != undefined && data?.data?.statusCode != 200) {
            print("receivePostListData :> ", JSON.stringify(data?.data?.message), 0);
            Alert.alert("Alert",data?.data?.message)
            return data?.data;
        }
    } catch (error) {
        print("receivePostListData catch Error: ", error, 0);
    }
}