const seleniumServer = require("selenium-server");
const chromeDriver = require("chromeDriver");

module.exports = {
  src_folders: ["tests"],

  selenium: {
    start_process: true,
    start_session: true,
    server_path: seleniumServer.path,
    check_process_delay: 5000,
    host: "127.0.0.1",
    port: 4444,
    cli_args: {
      "webdriver.chrome.driver": chromeDriver.path,
    },
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "Chrome",
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: "Chrome",
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          w3c: false,
          args: ["disable-gpu"],
        },
      },
    },
    headlessChrome: {
      desiredCapabilities: {
        browserName: "Chrome",
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          w3c: false,
          args: ["disable-gpu", "headless"],
        },
      },
    },
  },
};