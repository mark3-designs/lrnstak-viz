import {ChartBuilder} from "./chart_builder";

export class PercentileHighLow extends ChartBuilder {

    private readonly chartTitle:string;
    constructor(title:string, data:any[]) {
        super(data, "last_timestamp", (ts:string) => new Date(ts).toDateString());
        this.chartTitle = title;

        this.dataset("p_close", "percentile_close")
        this.dataset("p_high", "percentile_high")
        this.dataset("p_low", "percentile_low")
        this.dataset("p_volume", "percentile_volume")
        this.dataset("p_trades", "percentile_trades")
    }

    public title(): string {
        return this.chartTitle;
    }

}