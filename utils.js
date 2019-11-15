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
    return `
const domready = require('domready');
const svg = ${JSON.stringify(svgObject)};     
module.exports = svg;

if(!window['__SVG']) { 
    window['__SVG'] = [];
    domready(function() {
        const div = document.createElement('div');
        div.innerHTML = '<svg height="0" width="0" style="position:absolute" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>' + window['__SVG'].map(svg => svg.svg).join('') + '</defs></svg>';
        document.body.appendChild(div);
    })
}

window['__SVG'].push(svg);
`
};

module.exports.setId = (svg) => {
    svg.svg = `<svg id="${svg.id}" ${svg.svg.substring(5)}`;
    return svg;
};


module.exports.optimizeSvg = (svg, id) => {
    const svgo = new Svgo({
        plugins: [
            {prefixIds: id}
        ]
    });
    return svgo.optimize(svg);
};
