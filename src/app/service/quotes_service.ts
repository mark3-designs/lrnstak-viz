import axios from 'axios';
import {StorageAPIService} from "./storage_service";

# vue apps run from the client browser.
# this address needs to be resolvable
# from the browser, which may not be
# where the lrnstak services are running,
# depending on your environment.
const BASE_URL = 'http://ibconnect:8080';

export class QuotesAPIService {
    static async getPrediction(interval: string, symbol: string, days: number, date: Date | undefined = undefined) {
        if (!date) {
            date = new Date();
        }
        let exch = "SMART"

        const cacheKey = `predicted-${symbol}`
        const found = await StorageAPIService.getData(cacheKey)

        if (found) {
            return found;
        }
        return []
    }

    static async getQuotes(interval: string, symbol: string, days: number, date: Date | undefined = undefined) {
        if (!date) {
            date = new Date();
        }
        let exch = "SMART"

        const cacheKey = `quotes-${interval}_${symbol}_${days}days`
        const found = await StorageAPIService.getData(cacheKey)

        if (found) {
            return found;
        }

        const response = await axios.get(`${BASE_URL}/f/${interval}/${symbol}`, {
                params: {
                    exch: exch,
                    days: days,
                    date: date.toISOString(),
                    nocache: true
                }
            }
        );

        try {
            await StorageAPIService.putData(cacheKey, 3600, response.data)
        } catch (e:any) {
            console.error(e.message)
        }

        return response.data;
    }

}
