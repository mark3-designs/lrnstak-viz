import {ChartBuilder} from "./chart_builder";

export class PriceLastCloseChart extends ChartBuilder {

    private readonly chartTitle:string;
    constructor(title:string, data:any[]) {
        super(data, "last_timestamp", (ts:string) => new Date(ts).toDateString());
        this.chartTitle = title;

        this.dataset("close", "last_close")
        this.dataset("open", "last_open")
        this.dataset("close_trend", "predict_close")
        this.dataset("low_trend", "predict_low")
        this.dataset("avg", "price_avg")
        this.dataset("high", "price_max")
        this.dataset("low", "price_min")
    }

    public title(): string {
        return this.chartTitle;
    }

}