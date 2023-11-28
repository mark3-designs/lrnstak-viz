import {ChartBuilder} from "./chart_builder";

export class PredictedNextChart extends ChartBuilder {

    private readonly chartTitle:string;
    constructor(title:string, data:any[]) {
        super(data, "last_timestamp", (ts) => new Date(ts).toDateString());
        this.chartTitle = title;

        this.dataset("last_high", "last_high")
        this.dataset("price_avg", "price_avg")
        this.dataset("next_close", "next_close")
        this.dataset("last_close", "last_close")
    }

    public title(): string {
        return this.chartTitle;
    }

}