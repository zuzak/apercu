var config = require('../config');
var should = require('should');
var Browser = require('zombie');
var async = require('async');

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
        var browser = this.browser;
        browser.wait(function(foo){
            var repos = config.get("repos");
            async.each(repos,function(repo){
                var repoClass = "." + repo.replace("/","-");
                browser.html(repoClass).should.be.ok;
            }, done());
        });
    });
    it("should display the essential elements", function(done){
        this.browser.html("table").should.be.ok;
        this.browser.html("input").should.be.ok;
        this.browser.html("button").should.be.ok;
        done();
    });
    it("should display the correct Travis states", function(done){
        var testRepos = ["apercu-dummy/passing",
                         "apercu-dummy/failing",
                         "apercu-dummy/erroring",
                         "apercu-dummy/nobuild"];
        var browser = this.browser;
        var foo = false;

        testRepos.forEach(function(repo){
            browser.fill("input",repo).pressButton("button");
        });
       browser.wait(function(){
            browser.html(".apercu-dummy-passing .label-success").should.be.ok;
            browser.html(".apercu-dummy-failing .label-danger").should.be.ok;
            browser.html(".apercu-dummy-erroring .label-default").should.be.ok;
            browser.html(".apercu-dummy-nobuild .label").should.not.be.ok;
            done();
       });
        //});
    });
    it("should append a repository when the form is submitted",function(done){
        var browser = this.browser;
        browser.fill("input","torvalds/linux");
        browser.pressButton("button", function(){
            browser.wait(function(){
                browser.html(".torvalds-linux").should.be.ok;
                done();
            });
        });
    });
});
