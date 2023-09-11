const allowlist = require("../Config/allowedHosts");

exports.corsOptionsDelegate = {
  origin: allowlist,
  credentials: true,
};
