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
    },
    repos: {
        doc: "The default repositories to feature in the project list",
        default:[
                    "visionmedia/jade",
                    "apenwarr/sshuttle",
                    "gitlabhq/gitlabhq",
                    "zuzak/apercu"
                ],
        env: "REPOS",
        format: Array
    },
    environ: {
        doc: "The application environment",
        format: ["dev", "test"],
        default: "dev",
        env: "NODE_ENV"
    }
});

try {
    conf.loadFile("./config.json");
    console.log("Loaded config.json");
} catch(e){
//    console.log("No config.json");
}
if(conf.get("environ") == "test"){
    try {
        console.log("*** TESTING ***");
        conf.loadFile("./test/config.json");
        console.log("Loaded test-specific config.json");
    } catch(e) {
        console.log("No test-specific config.json");
    }
}

conf.validate();
module.exports = conf;
