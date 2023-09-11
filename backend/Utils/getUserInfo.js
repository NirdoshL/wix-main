exports.getUserInfo = (userAgent, ip) => {
  console.log(userAgent);
  const browserInfo = userAgent.match(
    /(chrome|firefox|safari|brave|PostmanRuntime|Edge|msie|trident(?=\/))\/?\s*(\d+)/i
  );
  const browser = browserInfo ? browserInfo[1] : "Unknown";
  const browserVersion = browserInfo ? browserInfo[2] : "Unknown";

  const osInfo = userAgent.match(
    /(windows|window|win32|win64|mac|linux|android|ios)/i
  );
  const operatingSystem = osInfo ? osInfo[1] : "Unknown";

  return {
    browser: browser,
    version: browserVersion,
    os: operatingSystem,
    ip_address: ip,
  };
};
