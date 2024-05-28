class Factories {
    constructor(factories) {
        this.factories = factories;
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.factories = [];
            }

            addFactory(factory) {
                this.factories.push(factory);
                return this;
            }

            build() {
                return new Factories(this.factories);
            }
        }
        return Builder;
    }

    static fromJSON(json) {
        const builder = new Factories.Builder();
        json.factories.forEach(f => {
            const chartData = new ChartData.Builder()
                .setSprocketProductionActual(f.factory.chart_data.sprocket_production_actual)
                .setSprocketProductionGoal(f.factory.chart_data.sprocket_production_goal)
                .setTime(f.factory.chart_data.time)
                .build();

            const factory = new Factory.Builder()
                .setChartData(chartData)
                .build();

            builder.addFactory(factory);
        });
        return builder.build();
    }
}
