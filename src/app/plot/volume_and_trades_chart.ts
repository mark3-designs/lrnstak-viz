import {ChartBuilder} from "./chart_builder";

export class VolumeAndTradesChart extends ChartBuilder {

    private readonly chartTitle:string;
    constructor(title:string, data:any[]) {
        super(data, "last_timestamp", (ts:string) => new Date(ts).toDateString());
        this.chartTitle = title;

        // console.log(JSON.stringify(data[0]))

        this.dataset("wick", "last_candle_wick")
        this.dataset("body", "last_candle_body")
        this.dataset("tail", "last_candle_tail")
        this.datasetY2("last_spt", "last_spt")
    }

    public title(): string {
        return this.chartTitle;
    }

}