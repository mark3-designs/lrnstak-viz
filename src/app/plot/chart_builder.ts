
export abstract class ChartBuilder {

    static colorPalette = [
        'rgba(75, 192, 192, 1)',
        'rgb(133, 255, 99, .9)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, .9)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, .9)',
        'rgba(255, 159, 64, 1)',
        'rgba(231, 76, 60, .9)',
        'rgba(46, 204, 113, 1)',
        'rgba(52, 73, 94, .9)',
    ];

    private labels : string[];
    private data : any[];
    private nextColor: number = 0;

    private datasets : { [key: string]: { yAxisID:string, label:string, borderColor:string, data:any[] } } = ({})

    protected constructor(data:any[], xlabel:string = 'last_timestamp', xformat:Function = (val:any):string => val.toString()) {
        this.data = data;
        this.labels = data.map((v) => xformat(v[xlabel]));
    }

    public dataset(label:string, field:string, color:string|undefined = undefined) {
        return this.datasetAxis('primaryYAxis', label, field, color)
    }
    public datasetY2(label:string, field:string, color:string|undefined = undefined) {
        return this.datasetAxis('secondaryYAxis', label, field, color)
    }

    private datasetAxis(axis:string, label:string, field:string, color:string|undefined = undefined) {

        if (!this.datasets[field]) {
            const rgb = color || ChartBuilder.colorPalette[this.nextColor++];
            this.nextColor = this.nextColor % ChartBuilder.colorPalette.length;
            this.datasets[field] = {
                yAxisID: axis,
                label,
                borderColor: rgb,
                data: this.data.map(item => item[field]),
            };
        }

        return this.datasets[field];

    }

    public abstract title():string;

    public buildOptions() {
        return {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: this.title()
                }
            },
            scales: {
                x: {
                    type: 'category' as const,
                    labels: this.labels
                },
                y: {
                    position: 'left' as const,
                    title: {
                        display: true,
                        text: 'Primary Axis',
                    },
                    // beginAtZero: true,
                    type: 'linear' as const,
                    id: 'primaryYAxis',
                },
                secondaryYAxis: {
                    position: 'right' as const,
                    title: {
                        display: false,
                        text: 'Secondary Axis',
                    },
                    beginAtZero: true,
                    type: 'linear' as const,
                    id: 'secondaryYAxis',
                },
            }
        }
    }

    public buildChart() {
        return {
            labels: this.labels,
            datasets: Object.values(this.datasets),
        }
    }

}