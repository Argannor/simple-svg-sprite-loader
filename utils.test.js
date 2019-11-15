const utils = require('./utils');

describe('[simple-svg-sprite-loader]: utils', () => {

    describe('utils.getFileName', () => {

        test('should extract linux file names from path', () => {
            const filename = utils.getFileName("/usr/abc/projects/xy/icons/my-svg.svg");
            expect(filename).toBe('my-svg.svg');
        });

        test('should extract windows file names from path', () => {
            const filename = utils.getFileName("C:\\Users\\A User\\Documents\\Projects\\xy\\icons\\my-svg.svg");
            expect(filename).toBe('my-svg.svg');
        });

        test('should extract file names from relative path', () => {
            const filename = utils.getFileName("my-svg.svg");
            expect(filename).toBe('my-svg.svg');
        });

    });

    describe('utils.validateSvg', () => {

        test('should accept a normal svg tag and return it', () => {
            const probe = '<svg id="something"></svg>';
            const result = utils.validateSvg(probe, 'probe.svg');
            expect(result).toBe(probe);
        });

        test('should not accept anything else and throw a descriptive error instead', () => {
            const probe = '<?><svg id="something"></svg>';
            expect(() => utils.validateSvg(probe, 'probe.svg')).toThrow('File probe.svg is not a valid SVG');
        });

    });

    describe('utils.nameAsId', () => {

        test('should remove file extension', () => {
            expect(utils.nameAsId('my-icon.svg')).toBe('my-icon');
        });

        test('should do nothing in absence of a file extension', () => {
            expect(utils.nameAsId('my-icon')).toBe('my-icon');
        });

        test('should remove only the last file extension', () => {
            expect(utils.nameAsId('my-icon.svg.svg')).toBe('my-icon.svg');
        });

    });

    describe('utils.svgAsObject', () => {

        const mockSvg = '<svg id="mock"></svg>';
        const id = 'mock';

        test('should build a object with svg and id properties', () => {
            const probe = utils.svgAsObject(mockSvg, id);
            expect(probe.id).toBeDefined();
            expect(probe.svg).toBe(mockSvg);
        });

        test('should prefix the id', () => {
            const probe = utils.svgAsObject(mockSvg, id);
            expect(probe.id).toBe('sssl-' + id);
        });

        test('should add a name prefix with the original id', () => {
            const probe = utils.svgAsObject(mockSvg, id);
            expect(probe.name).toBe(id);
        });

    });

    describe('utils.setId', () => {

        test('should add the correct id to the outer svg tag', () => {
            const svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 297.508 297.508" style="enable-background:new 0 0 297.508 297.508;" xml:space="preserve">
		<g>
			<path d="M158.508,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5h49c4.142,0,7.5-3.357,7.5-7.5
				S162.65,96.92,158.508,96.92z"/>
			<path style="fill: red" d="M158.508,96.92h-49c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5h49c4.142,0,7.5-3.357,7.5-7.5
				S162.65,96.92,158.508,96.92z"/>
		</g>
</svg>`;
            const svgObject = { id: 'sssl-mock', name: 'mock', svg: svg };
            const probe = utils.setId(svgObject);
            expect(probe.svg).toMatch(/^<svg id="sssl-mock" version/);
        });

    });

    describe('utils.optimize', () => {

        test('should remove ids from the outer svg tag', () => {
            const svg = `<svg version="1.1" id="title_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 297.508 297.508" style="enable-background:new 0 0 297.508 297.508;" xml:space="preserve">
		<g>
			<path d="M158.508,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5h49c4.142,0,7.5-3.357,7.5-7.5
				S162.65,96.92,158.508,96.92z"/>
			<path style="fill: red" d="M158.508,96.92h-49c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5h49c4.142,0,7.5-3.357,7.5-7.5
				S162.65,96.92,158.508,96.92z"/>
		</g>
</svg>`;
            return utils.optimizeSvg(svg, 'mock').then(svg => {
                const hasId = svg.data.indexOf('id="') >= 0;
                expect(hasId).toBe(false);
            });
        });

    });

    describe('utils.svgAsModule', () => {

        const mockSvg = {
            id: 'sssl-mock', name: 'mock', svg: 'SVG_PLACEHOLDER'
        };

        test('should export the svg', () => {
            const probe = utils.svgAsModule(mockSvg);
            const containsSvg = probe.indexOf(`const svg = ${JSON.stringify(mockSvg)};`) >= 0;
            const containsExport = probe.indexOf('module.exports = svg') >= 0;
            expect(containsSvg).toBe(true);
            expect(containsExport).toBe(true);
        });

    });


});
