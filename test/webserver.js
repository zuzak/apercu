var config = require('../config');
var request = require('request');
var should = require('should');

var url = "http://" + config.get("ip") + ":" + config.get('port');

describe('The webserver', function(){
    it('should serve the index page', function(done){
        request.get(url,function(e,r,b){
            should.not.exist(e);
            should.exist(b);
            r.should.have.status(200);
            done();
        });
    });

    it('should serve an API page', function(done){
        request.get(url+"/api/github/gitignore.json",function(e,r,b){
            should.not.exist(e);
            should.exist(b);
            r.should.have.status(200);
            r.should.be.json;
            done();
        });
    });

    it('should not serve API calls not ending in .json', function(done){
        request.get(url+"/api/github/gitignore.xml", function(e,r,b){
            should.not.exist(e);
            r.should.have.status(404);
            done();
        });
    });

});
