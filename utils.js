const Svgo = require('svgo');
const svgo = new Svgo();

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
    return {
        id: id, svg: svg
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
        div.style.display = 'none';
        div.innerHTML = '<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>' + window['__SVG'].map(svg => svg.svg).join('') + '</defs></svg>';
        document.body.appendChild(div);
    })
}

window['__SVG'].push(svg);
`
};

module.exports.setId = (svg, id) => {
    return `<svg id="${id}" ${svg.substring(5)}`;
};


module.exports.optimizeSvg = (svg) => {
    return svgo.optimize(svg);
};
