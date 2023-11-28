import axios from 'axios';

# vue apps run from the client browser.
# this address needs to be resolvable
# from the browser, which may not be
# where the lrnstak services are running,
# depending on your environment.
const BASE_URL = 'http://localhost:5000/models';

export class ModelRegistryService {
    static async getAllModels() {
        const response = await axios.get(`${BASE_URL}`);
        return response.data;
    }

}
