var config = require('../config');
var should = require('should');
var Browser = require('zombie');

var url = "http://" + config.get("ip") + ":" + config.get('port');

describe('The project list', function(){
    before(function(done){
        this.browser = new Browser({silent:true});
        this.browser.visit(url, function(){
            done();
        });
    });
    it("should be connected to successfully", function(done){
        this.browser.success.should.be.ok;
        done();
    });
    it("should display the correct repositories", function(done){
        this.browser.html(".apercu-dummy-passing").should.be.ok;
        this.browser.html(".apercu-dummy-failing").should.be.ok;
        this.browser.html(".apercu-dummy-erroring").should.be.ok;
        this.browser.html(".apercu-dummy-nobuild").should.be.ok;
        done();
    });
    it("should display the essential elements", function(done){
        this.browser.html("table").should.be.ok;
        this.browser.html("input").should.be.ok;
        this.browser.html("button").should.be.ok;
        done();
    });
    it("should display the correct Travis states", function(done){
        this.browser.html(".apercu-dummy-passing .label-success").should.be.ok;
        this.browser.html(".apercu-dummy-failing .label-danger").should.be.ok;
        this.browser.html(".apercu-dummy-erroring .label-default").should.be.ok;
        this.browser.html(".apercu-dummy-erroring .label-default").should.be.ok;
        this.browser.html(".apercu-dummy-nobuild .label").should.not.be.ok;
        done();
    });
    it("should append a repository when the form is submitted",function(done){
        var browser = this.browser;
        browser.fill("input","github/gitignore", function(){
            browser.pressButton("button", function(){
                browser.html(".github-gitignore").should.be.ok;
                done();
            });
        });
    });
});
