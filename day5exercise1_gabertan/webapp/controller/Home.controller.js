sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("zbtp.day5exercise1gabertan.controller.Home", {
            onInit: function () {

            },

             onSendBtn: function() {
                var oView = this.getView();
                var sName = oView.byId("NameInput").getValue();
                var sStreet = oView.byId("StreetInput").getValue();
                var sAge = oView.byId("AgeInput").getValue();
                var sTech = oView.byId("TechInput").getSelectedKey();
                
              MessageToast.show("Your Name is " + sName + " Your Street is " + sStreet + " Your Age is " + sAge + " Your Tech is " +sTech);

             }


        });
    });
