class Sprockets {
    constructor(sprockets) {
        this.sprockets = sprockets;
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.sprockets = [];
            }

            addSprocket(sprocket) {
                this.sprockets.push(sprocket);
                return this;
            }

            build() {
                return new Sprockets(this.sprockets);
            }
        }
        return Builder;
    }

    static fromJSON(json) {
        const builder = new Sprockets.Builder();
        json.sprockets.forEach(s => {
            const sprocket = new Sprocket.Builder()
                .setTeeth(s.teeth)
                .setPitchDiameter(s.pitch_diameter)
                .setOutsideDiameter(s.outside_diameter)
                .setPitch(s.pitch)
                .build();

            builder.addSprocket(sprocket);
        });
        return builder.build();
    }
}
