sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("sapips.training.employeeapp.controller.EmployeeList", {
            onInit: function () {

            },

            onAddEmployee: function() {
                var oView = this.getView();
                this.getRouter().navTo("CreateEmployee");

            },

            onDeleteEmployee: function() {
                MessageBox.confirm("Are you sure you want to delete the selected employee/s?");
            },

            onDetailView: function() {   
                var oView = this.getView();
                this.getRouter().navTo("ViewEmployee");
            },

            getRouter: function() {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },

        });
    });
