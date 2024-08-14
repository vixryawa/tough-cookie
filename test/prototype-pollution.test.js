const tough = require("tough-cookie");
const assert = require('assert');
const {describe} = require("vows");

describe('Prototype Pollution Fix', function() {
  it('should not allow __proto__ as a domain', async function() {
    var cookiejar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false });

    // Attempt to exploit prototype pollution
    await cookiejar.setCookie(
      "Slonser=polluted; Domain=__proto__; Path=/notauth",
      "https://__proto__/admin"
    );

    var a = {};

    // Check if the prototype has been polluted
    assert.strictEqual(a["/notauth"], undefined, "Prototype was polluted!");
    assert.strictEqual(a["/notauth"]?.["Slonser"], undefined, "Prototype was polluted!");
  });
});
