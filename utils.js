const Svgo = require('svgo');

module.exports = {};

module.exports.getFileName = path => {
    let parts = path.split(/[/\\]/g);
    return parts[parts.length - 1];
};

module.exports.validateSvg = (content, filename) => {
    if (!content.startsWith('<svg')) {
        throw new Error(`File ${filename} is not a valid SVG`)
    }
    return content;
};

module.exports.nameAsId = name => {
    if (name.endsWith('.svg')) {
        return name.substring(0, name.length - 4);
    }
    return name;
};

module.exports.svgAsObject = (svg, id) => {
    const prefixedId = 'sssl-' + id;
    return {
        id: prefixedId, svg: svg, name: id
    };
};

module.exports.svgAsModule = (svgObject) => {
    // exports the sprite by it's id and will add all svgs inside a sprite to document.body>div
    return `const injector = require('simple-svg-sprite-loader/injector');
const svg = ${JSON.stringify(svgObject)};     
module.exports = svg;
injector(svg);
`
};

module.exports.setId = (svg) => {
    svg.svg = `<svg id="${svg.id}" ${svg.svg.substring(5)}`;
    return svg;
};


module.exports.optimizeSvg = (svg, id) => {
    const svgo = new Svgo({
        plugins: [
            {prefixIds: { prefix: 'sssl-' + id }}
        ]
    });
    return svgo.optimize(svg);
};
