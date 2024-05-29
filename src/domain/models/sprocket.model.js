class Sprocket {
    constructor(teeth, pitchDiameter, outsideDiameter, pitch) {
        this.teeth = teeth;
        this.pitchDiameter = pitchDiameter;
        this.outsideDiameter = outsideDiameter;
        this.pitch = pitch;
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.teeth = 0;
                this.pitchDiameter = 0;
                this.outsideDiameter = 0;
                this.pitch = 0;
            }

            setTeeth(teeth) {
                this.teeth = teeth;
                return this;
            }

            setPitchDiameter(pitchDiameter) {
                this.pitchDiameter = pitchDiameter;
                return this;
            }

            setOutsideDiameter(outsideDiameter) {
                this.outsideDiameter = outsideDiameter;
                return this;
            }

            setPitch(pitch) {
                this.pitch = pitch;
                return this;
            }

            build() {
                return new Sprocket(
                    this.teeth,
                    this.pitchDiameter,
                    this.outsideDiameter,
                    this.pitch
                );
            }
        }
        return Builder;
    }

    static fromJSON(json) {
        return new Sprocket.Builder()
            .setTeeth(json.teeth)
            .setPitchDiameter(json.pitch_diameter)
            .setOutsideDiameter(json.outside_diameter)
            .setPitch(json.pitch)
            .build();
    }
}

module.exports = { Sprocket };
