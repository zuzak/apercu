var config = require('../config');
var request = require('request');
var should = require('should');

var url = "http://" + config.get("ip") + ":" + config.get("port") + "/api";

describe('The Travis CI section of the API', function(){
    it('should return "pass" if the build succeeds', function(done){
        request.get(url + "/apercu-dummy/passing.json",function(e,r,b){
            var data = JSON.parse(b);
            data.tests.should.have.property("travis");
            data.tests.travis.should.have.property("pending");
            data.tests.travis.pending.should.be.a('boolean');
            data.tests.travis.result.should.equal(1);

            done();
        });
    });
    it('should return "error" if the build goes awry', function(done){
        request.get(url + "/apercu-dummy/erroring.json",function(e,r,b){
            var data = JSON.parse(b);
            data.tests.should.have.property("travis");
            data.tests.travis.should.have.property("pending");
            data.tests.travis.pending.should.be.a('boolean');
            data.tests.travis.result.should.equal(-1);
 
            done();
        });
    });
    it('should return "fail" if the build fails', function(done){
        request.get(url + "/apercu-dummy/failing.json", function(e,r,b){
            var data = JSON.parse(b);
            data.tests.should.have.property("travis");
            data.tests.travis.should.have.property("pending");
            data.tests.travis.pending.should.be.a("boolean");
            data.tests.travis.result.should.equal(0);

            done();
        });
    });
    it('should return "null" if there is no build at all', function(done){
        request.get(url + "/apercu-dummy/nobuild.json", function(e,r,b){
            var data = JSON.parse(b);
            data.tests.should.have.property("travis");
            should.strictEqual(data.tests.travis.result,null);

            done();
        });
   });
});
