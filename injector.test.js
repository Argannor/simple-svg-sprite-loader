jest.mock('domready');
const domready = require('domready');
const injector = require('./injector');
const svgA = `<svg id="sssl-a" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20"></svg>`;
const svgB = `<svg id="sssl-b" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20"></svg>`;
const svgC = `<svg id="sssl-c" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20"></svg>`;
const svgD = `<svg id="sssl-d" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20"></svg>`;

describe('[simple-svg-sprite-loader]: injector', () => {

    it('should be able to inject a sprite', () => {
        injector({
            svg: svgA, id: 'sssl-a'
        });
        injector({
            svg: svgB, id: 'sssl-b'
        });
        domready.call();
        const spriteDefs = document.getElementById('_sssl-defs');
        const probeA = spriteDefs.querySelector('#sssl-a');
        const probeB = spriteDefs.querySelector('#sssl-b');
        expect(probeA).toBeDefined();
        expect(probeB).toBeDefined();
    });

    it('should be able to append to an existing sprite', () => {
        injector({
            svg: svgC, id: 'sssl-c'
        });
        injector({
            svg: svgD, id: 'sssl-d'
        });
        return new Promise(resolve => {
            setTimeout(() => {

                const spriteDefs = document.getElementById('_sssl-defs');
                const probeA = spriteDefs.querySelector('#sssl-a');
                const probeB = spriteDefs.querySelector('#sssl-b');
                const probeC = spriteDefs.querySelector('#sssl-c');
                const probeD = spriteDefs.querySelector('#sssl-d');

                expect(probeA.id).toBe("sssl-a");
                expect(probeB.id).toBe("sssl-b");
                expect(probeC.id).toBe("sssl-c");
                expect(probeD.id).toBe("sssl-d");
                resolve();
            }, 50);
        });
    });

});
