const utils = require('./utils');

const schema = {
    type: 'object',
    properties: {
        test: {
            type: 'string'
        }
    }
};

module.exports = function (source) {
    const done = this.async();
    const fileName = utils.getFileName(this.resourcePath);

    const id = utils.nameAsId(fileName);
    utils.optimizeSvg(source, id)
        .then(result => result.data)
        .then(optimized => utils.validateSvg(optimized, fileName))
        .then(svg => utils.svgAsObject(svg, id))
        .then(svg => utils.setId(svg))
        .then(svg => utils.svgAsModule(svg))
        .then(result => done(null, result));

};
