import axios from 'axios';

# vue apps run from the client browser.
# this address needs to be resolvable
# from the browser, which may not be
# where the lrnstak services are running,
# depending on your environment.
const BASE_URL = 'http://localhost:5000/cache';

export class StorageAPIService {
    static async putData(key: string, ttl: number, value: any) {
        await axios.post(`${BASE_URL}/${key}`, { ttl, value });
    }

    static async getData(key: string) {
        try {
            const response = await axios.get(`${BASE_URL}/${key}`);
            if (response.status === 404) {
                return null;
            }
            return response.data;
        } catch (error:any) {
            if (error.response.status === 404) {
                return null;
            }
            throw error;
        }
    }
}
