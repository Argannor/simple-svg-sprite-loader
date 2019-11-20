const domready = require('domready');

module.exports = function (svgObject) {
    if(!window['__SVG']) {
        window['__SVG'] = [];
    }
    window['__SVG'].push(svgObject);
    if (window['__SVG_initialized']) {
        addSvgToExistingSprite();
    } else {
        initWithDomready();
    }
};

function addSvgToExistingSprite() {
    debounce(function() {
        const fragment = document.createDocumentFragment();
        const svgString = window['__SVG'].map(svg => svg.svg).join('');
        const div = document.createElement('div');
        div.innerHTML = svgString;
        const svgNodes = div.childNodes;
        for(let i = 0; i < svgNodes.length; i++) {
            fragment.append(svgNodes[i]);
        }
        document.getElementById('_sssl-defs').appendChild(fragment);
        window['__SVG'] = [];
    }, 30)();
}

function initWithDomready() {
    if(window['__SVG_domready']) {
        return;
    }
    window['__SVG_domready'] = true;
    domready(function () {
        const div = document.createElement('div');
        div.innerHTML = '<svg height="0" width="0" style="position:absolute" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs id="_sssl-defs">' + window['__SVG'].map(svg => svg.svg).join('') + '</defs></svg>';
        document.body.appendChild(div);
        window['__SVG_initialized'] = true;
        window['__SVG'] = [];
    });
}

function debounce(func, wait) {
    var timeout;
    var later = function() {
        timeout = null;
        func.apply();
    };
    return function() {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
