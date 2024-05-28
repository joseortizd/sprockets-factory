class Factory {
    constructor(chartData) {
        this.chartData = chartData;
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.chartData = null;
            }

            setChartData(chartData) {
                this.chartData = chartData;
                return this;
            }

            build() {
                return new Factory(this.chartData);
            }
        }
        return Builder;
    }
}
