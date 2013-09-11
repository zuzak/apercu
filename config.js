var convict = require('convict');

var conf = convict({
    ip: {
        doc: "The IP address to bind.",
        format: "ipaddress",
        default: "127.0.0.1",
        env: "IP_ADDRESS"
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 2345,
        env: "PORT"
    },
    githubsecret: {
        doc: "The secret half of your Github API key.",
        default: "",
        env: "GH_SECRET"
    },
    githubid: {
        doc: "The client ID half of your Github API key.",
        default:"ac164af2be0ddae99bce",
        env: "GH_CLIENT"
    }
});
try {
    conf.loadFile("./config.json");
} catch(e){
    console.log("No config.json");
}
conf.validate();
module.exports = conf;
