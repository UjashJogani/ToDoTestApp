import axios from 'axios';

import { print } from '../../utils';
import { GET } from '../../constants/Api';

export async function MakeApiRequest({ apiUrl, apiMethod = GET, apiHeaders = {}, apiParams = {} }) {

    let headers = {
        'Content-Type': 'application/json',
        ...apiHeaders
    }

    let params = {
        ...apiParams
    }

    print(apiMethod + " API :", apiUrl, 1);

    if (apiMethod === 'GET') {
        return axios({
            method: GET,
            url: apiUrl,
            headers: headers
        })
            .then((response) => {
                return Promise.resolve(response)
            }).catch((err) => {
                return Promise.reject(err)
            })
    } else {
        print("makeApiRequest Else Part", "", 0)
    }
}
