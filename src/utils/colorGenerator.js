function generateHslaColors(amount) {
    const saturation = 1
    const lightness = 0.5
    const alpha = 1
    let colors = [];
    let huedelta = Math.trunc(360 / amount);

    for (let i = 0; i < amount; i++) {
        let hue = i * huedelta + huedelta / 2;
        colors.push([hue,saturation,lightness,alpha]);
    }

    return colors;
}

// let c = generateHslaColors(50, 100, 1.0, 3)

module.exports = { generateHslaColors };

// console.log(c)
