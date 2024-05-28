class ChartData {
    constructor(sprocketProductionActual, sprocketProductionGoal, time) {
        this.sprocketProductionActual = sprocketProductionActual;
        this.sprocketProductionGoal = sprocketProductionGoal;
        this.time = time;
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.sprocketProductionActual = [];
                this.sprocketProductionGoal = [];
                this.time = [];
            }

            setSprocketProductionActual(sprocketProductionActual) {
                this.sprocketProductionActual = sprocketProductionActual;
                return this;
            }

            setSprocketProductionGoal(sprocketProductionGoal) {
                this.sprocketProductionGoal = sprocketProductionGoal;
                return this;
            }

            setTime(time) {
                this.time = time;
                return this;
            }

            build() {
                return new ChartData(
                    this.sprocketProductionActual,
                    this.sprocketProductionGoal,
                    this.time
                );
            }
        }
        return Builder;
    }
}
