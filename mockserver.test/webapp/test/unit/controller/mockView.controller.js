/*global QUnit*/

sap.ui.define([
	"sapipstraining/mockserver.test/controller/mockView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("mockView Controller");

	QUnit.test("I should test the mockView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
