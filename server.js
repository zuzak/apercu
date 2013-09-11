var express   = require("express"),
    request   = require("request"),
    app = express(),
    async     = require("async"),
    config    = require("./package.json").config,
    _         = require("underscore");

app.set("views", __dirname + "/views");
app.set("view engine","jade");
app.use(express.logger("dev"));
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res){
    res.render("index");
});

app.get("/api/:user/:repo.json", function(req, res){
    var user = req.params.user;
    var repo = req.params.repo;
    async.parallel([
        function(callback){
           fetchAPI("https://api.travis-ci.org/repos/" + user + "/" + repo + "/builds.json", function(travis){
               var result = {tests:{travis:{}}};
               if(travis.length === 0){
                   console.log(travis);
                   result.tests.travis.result = null;
               } else {
                   var check = 0;
                   if(travis){
                        if((travis[check].state == "created") || (travis[check].state == "started")){

                            result.tests.travis.pending = true;
                            // check = 1;
                        } else {
                            result.tests.travis.pending = false;
                        }
                        if(travis[check].result === 1){
                            result.tests.travis.result = 0; // failed
                        } else if (travis[check].result === 0) {
                            result.tests.travis.result = 1; // passed
                        } else {
                            result.tests.travis.result = -1; // error
                        }
                   } else {
                       console.log("bar");
                        result.tests.travis.result = null;
                   }
               }
               callback(null,result);
            });
        },
        function(callback){
            var append = "";
            if(config.github.secret && config.github.id){
                append = "?client_id=" + config.github.id;
                append += "&client_secret=" + config.github.secret;
            }
            fetchAPI("https://api.github.com/repos/" + user + "/" + repo + "/commits" + append, function(github){
                if(!github){callback();return;}
                github = github[0];
                console.log(github.sha);
                var result = {
                    commit:{
                        hash: github.sha,
                        date: github.commit.author.date,
                        user: github.commit.author.name
                    }
                };
                callback(null,result);
            });
        },
        function(callback){
            var append = "";
            if(config.github.secret && config.github.id){
                append = "?client_id=" + config.github.id;
                append += "&client_secret=" + config.github.secret;
            }
            fetchAPI("https://api.github.com/repos/" + user + "/" + repo + append, function(github){
                if(!github){callback();return;}
                var result = {
                    repo: {
                        name: github.name,
                        owner: {
                            login: github.owner.login,
                            url: github.owner.html_url
                        },
                        description: github.description,
                        url: github.html_url,
                        size: github.size,
                        forks: github.forks,
                        watchers: github.watchers,
                        lang: github.language
                    }
                };
                callback(null,result);
            });
        },
        function(callback){
            request.get("https://raw.github.com/"+user+"/"+repo+"/master/VERSION", function(e, r, b){
                var result = {};
                if(b!=="" && r.statusCode == "200"){
                    result.version = b.split("\n",1);
                }
                callback(null,result);
            });
        },
/*        function(callback){
            fetchAPI("https://coveralls.io/r/" + user + "/" + repo + ".json", function(coveralls){
                if(!coveralls){callback();return;}
                var result = {
                    tests: {
                        coveralls: coveralls.model.coverage_cache.master
                    }
                };
                callback(null,result);
            });
        },*/
        function(callback){
//            fetchAPI("http://registry.npmjs.org/" + repo + "/latest", function(npm){
            fetchAPI("https://raw.github.com/"+user+"/"+repo+"/master/package.json", function(npm){
                if(!npm){callback();return;}
                var result = {
                    npm: {
                        dependencies: Object.keys(npm.dependencies).length
                    },
                    version: npm.version
                };
                if(npm.devDependencies){
                    result.npm.devDependencies = Object.keys(npm.dependencies).length;
                }
                callback(null,result);
            });
        }],
        function(err, results){
            var data = {};
            results.forEach(function(result){
                _.extend(data,result);
            });
//            res.render("json",{data:data});
            res.json(data);
        }
    );
});

function fetchAPI(url, callback){
    var res;
    request.get(url, function(e, r, b){
            console.log(url + " returned " + r.statusCode + "!");
        if(r.statusCode == 200){
            var result = JSON.parse(b);
            callback(result);
        } else {
            callback();
        }
    });
}

app.listen(config.port);
console.log("Listening on " + config.port);

