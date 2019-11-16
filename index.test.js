const index = require('./index');

describe('[simple-svg-sprite-loader]: index', () => {

    const mockSvg = `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" id="garbageid">
 <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
 <g>
  <title>background</title>
  <rect fill="#fff" id="canvas_background" height="82" width="82" y="-1" x="-1"/>
  <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
   <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
  </g>
 </g>
 <g>
  <title>Layer 1</title>
  <ellipse ry="23.5" rx="27" id="svg_1" cy="43.950012" cx="40.5" stroke-width="1.5" stroke="#fff" fill="#000"/>
 </g>
</svg>`;

    test('it should produce a valid output', done => {
        const callback = (sth, result) => {
            eval(result);
            console.log(window['__SVG']);
            const probe = window['__SVG'][0];
            expect(probe.id).toBe('sssl-my-icon');
            expect(probe.name).toBe('my-icon');
            expect(probe.svg).not.toMatch(/title/);
            expect(probe.svg).not.toMatch(/id="garbageid"/);
            expect(probe.svg).not.toMatch(/github\.com/);
            expect(probe.svg).toMatch(/<svg id="sssl-my-icon"/);
            // Note: this test will not verify that svgo's optimizations produce an equivalent output.
            done();
        };

        const mockContext = {
            resourcePath: '/tmp/my-icon.svg',
            async: () => callback
        };

        const boundTestee = index.bind(mockContext);
        boundTestee(mockSvg);
    });

});
