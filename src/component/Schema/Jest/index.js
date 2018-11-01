const NETWORK_TIMEOUT = 50000,

      normalizeName = ( str ) => {
        const re = /[^a-zA-Z0-9_-]/g;
        return str.replace( re, "--" );
      };

export const tplQuery = ({ target, selector }) => {
  const re = /"/g,
        escSelector = selector.replace( re, `\\"` );
  return `const ${target} = async () => query( "${escSelector}", "${target}" );`;
};

export const tplSuite = ({ title, body, targets }) => `
/**
 * Generated by https://github.com/dsheiko/puppetry
 * on ${ String( Date() ) }
 */
const { bs, png, query } = require( "../lib/bootstrap" )( "${ normalizeName( title ) }" ),
      devices = require( "puppeteer/DeviceDescriptors" );

jest.setTimeout( ${NETWORK_TIMEOUT} );

${targets}

describe( "${title}", async () => {
  beforeEach(async () => {
    await bs.setup();
  });

  afterEach(async () => {
    await bs.teardown();
  });

${body}

});
`;

export const tplGroup = ({ title, body }) => `
  describe( "${title}", async () => {
${body}
  });
`;

export const tplTest = ({ title, body }) => `
    test( "${title}", async () => {
      let result, assert;
${body}
    });
`;