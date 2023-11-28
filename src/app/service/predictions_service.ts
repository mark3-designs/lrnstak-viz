import axios from 'axios';

# vue apps run from the client browser.
# this address needs to be resolvable
# from the browser, which may not be
# where the lrnstak services are running,
# depending on your environment.
const BASE_URL = 'http://localhost:5000/predict';

export class PredictionsAPIService {
    static async predict(modelName: string, version: string, data: any[]) {
        const response = await axios.post(`${BASE_URL}/model/${modelName}`, { version, data });
        return response.data;
    }
}
