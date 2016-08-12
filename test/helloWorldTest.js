var should = require('should');
var jQuery = require("../lib/jquery");
var eventDispatcher = require("../utils/event-dispatcher");

describe("application form functionality", function() {
	it("should be able to initialise", function() {
    var helloWorld = require("../scripts/helloWorld");

    var result = helloWorld.hello();
    result.should.equal("hello world");
	});
});
