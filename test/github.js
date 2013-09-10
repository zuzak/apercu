var config = require('../package.json').config;
var request = require('request');
var should = require('should');

var url = "http://localhost:" + config.port + "/api/";

describe('The Github API section of the API', function(){
    it('should respond correctly to a valid repository', function(done){
        request.get(url + "apercu-dummy/passing.json",function(e,r,b){
            var data = JSON.parse(b);
            data.repo.should.have.property("name","passing");
            data.repo.should.have.property("owner");
            data.repo.owner.should.have.property("login","apercu-dummy");
            data.repo.owner.should.have.property("url","https://github.com/apercu-dummy");
            data.commit.hash.should.have.length(40);
            data.commit.hash.should.equal("e8d420ea0755b2d7bcd4f16dff2beb6702ef0b15");
            data.commit.should.have.property("user","apercu-dummy");

            done();
        });
    });
    it('should report forks, hashes, and watchers correctly', function(done){
        request.get(url + "github/gitignore.json", function(e,r,b){
            var data = JSON.parse(b);

            data.commit.hash.should.have.length(40);

            data.repo.forks.should.be.above(3000);
            data.repo.watchers.should.be.above(10000);
            done();
        });
    });
});
