import {ChartBuilder} from "./chart_builder";

export class PriceAvgHighLowChart extends ChartBuilder {

    private readonly chartTitle:string;
    constructor(title:string, data:any[]) {
        super(data, "last_timestamp", (ts:string) => new Date(ts).toDateString());
        this.chartTitle = title;

        this.dataset("change", "last_change")
        this.dataset("cumulative", "cumulative_change")
        this.datasetY2("price_sentiment", "price_sentiment")
    }

    public title(): string {
        return this.chartTitle;
    }

}