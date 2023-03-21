sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, formatter) {
        "use strict";

        return Controller.extend("sapips.training.jsonbinding.controller.JSONBinding", {
            formatter: formatter,

            onInit: function () {
                //Get the View
                var oView = this.getView();

                //Get i18n Model from Component
                var oI18n = this.getOwnerComponent().getModel("i18n");
                
                //Bind i18n to View
                oView.setModel(oI18n,"i18n");

                //Instantiate JSON Model
                var oAddressModel = new JSONModel();
                //Define Data
                var oAddress = {
                    "EID": "robert.j.d.gabertan",
                    "enabled": true,
                    "Address":{
                        "Street": "St. Theresa",
                        "City": "Caloocan City",
                        "Zip": 1427,
                        "Country": "Philippines"
                    },
                    "SalesAmount": 100,
                    "CurrencyCode": "USD"
                };

                //Set the Data to Model
                oAddressModel.setData(oAddress);

                //Bind the Model to View
                oView.setModel(oAddressModel, "oAddressModel");

            },

            onSelectProduct: function(oEvent){
                //Get the Control (List)
                var oList = oEvent.getSource();
                //Get the selected Items
                var oSelItem = oList.getSelectedItem();
                //Get the context binding path
                var sSelItemPath = oSelItem.getBindingContextPath();

                //Get the control to be used
                var oForm = this.getView().byId("ProductDetails");

                //Bind the selected item to the control (Panel 4)
                oForm.bindElement({
                    path: sSelItemPath,
                    model:"ProductsModel"
                })
            }

        });
    });
