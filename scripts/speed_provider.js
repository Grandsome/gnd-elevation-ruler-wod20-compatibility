Hooks.once("init", () => {
    game.settings.register("wod20-elevation-ruler-integration", "walk", {
        name: "walk",
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "#00FF00",
        onChange: (value) => { refreshSpeedCategories(); }
    });

    game.settings.register("wod20-elevation-ruler-integration", "jog", {
        name: "jog",
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "#0xFFFF00",
        onChange: (value) => { refreshSpeedCategories(); }
    });

    game.settings.register("wod20-elevation-ruler-integration", "run", {
        name: "run",
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "0xFF8000",
        onChange: (value) => { refreshSpeedCategories(); }
    });

    game.settings.register("wod20-elevation-ruler-integration", "unreachable", {
        name: "unreachable",
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "#FF0000",
        onChange: (value) => { refreshSpeedCategories(); }
    });

});

Hooks.once("ready", () => {
    refreshSpeedCategories();

    CONFIG.elevationruler.SPEED.tokenSpeed = function (token) {
        const baseSpeed = token.actor.system.movement.jog;
        if (baseSpeed === null) return null;
        return Number(baseSpeed);
    };

    CONFIG.elevationruler.SPEED.maximumCategoryDistance = function (token, speedCategory, tokenSpeed) {
        switch (speedCategory.name) {
            case "walk":
                return speedCategory.multiplier * tokenSpeed;
            case "jog":
                return speedCategory.multiplier * tokenSpeed;
            case "run":
                return speedCategory.multiplier * tokenSpeed;
        }
        return Number.POSITIVE_INFINITY;
    };
});

function refreshSpeedCategories() {
    let walkAction = {
        name: "walk",
        color: Color.from(game.settings.get("wod20-elevation-ruler-integration", "walk")),
        multiplier: 0.5
    }

    let jogAction = {
        name: "jog",
        color: Color.from(game.settings.get("wod20-elevation-ruler-integration", "jog")),
        multiplier: 1
    }
    let runAction = {
        name: "run",
        color: Color.from(game.settings.get("wod20-elevation-ruler-integration", "run")),
        multiplier: 2
    }

    let Unreachable = {
        name: "Unreachable",
        color: Color.from(game.settings.get("wod20-elevation-ruler-integration", "unreachable")),
        multiplier: Number.POSITIVE_INFINITY
    }

    CONFIG.elevationruler.SPEED.CATEGORIES = [walkAction, jogAction, runAction, Unreachable];
}
