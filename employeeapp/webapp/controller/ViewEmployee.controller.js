sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, JSONModel) {
        "use strict";

        return Controller.extend("sapips.training.employeeapp.controller.EmployeeProfile", {
            onInit: function () {
                this.getRouter().getRoute('ViewEmployee').attachPatternMatched(this._onObjectMatched, this);
            },

            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash && sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("RouteEmployeeList");
                }
            },

            _onObjectMatched: function (oEvent) {
                var oView = this.getView();

                var oModel = this.getOwnerComponent().getModel("EmployeesList");

                var sEmployeeID = oEvent.getParameter("arguments").EmployeeID;

                // @ts-ignore
                oModel.read("/Employee(EmployeeID='"+ sEmployeeID +"')", {
                    success: function (oEmployee) {
                        var oEmployeeProfile = new JSONModel();
                        
                        // @ts-ignore
                        var oEmployeeData = jQuery.extend(
                            {
                                "FullName": oEmployee.FirstName + " " + oEmployee.LastName
                            }, 
                            oEmployee
                        );

                        oEmployeeProfile.setData(oEmployeeData);

                        oView.setModel(oEmployeeProfile, "EmployeeName");

                        // @ts-ignore
                        oModel.read("/CareerList(CareerID='"+ oEmployee.CareerLevel +"')", {
                            success: function (oCareer) {
                                var oEmployeeCareer = new JSONModel();
                                    oEmployeeCareer.setData(oCareer);
                                oView.setModel(oEmployeeCareer, "EmployeeCareer");
                            }, 
        
                            error: function () {}
                        });

                        // @ts-ignore
                        oModel.read("/ProjectList(ProjectID='"+ oEmployee.CurrentProject +"')", {
                            success: function (oProject) {
                                var oEmployeeProject = new JSONModel();
                                    oEmployeeProject.setData(oProject);
                                oView.setModel(oEmployeeProject, "EmployeeProject");
                            }, 
        
                            error: function () {}
                        }); 
                        
                    }, 

                    error: function () {}
                    
                }); 
                // @ts-ignore
                oModel.read("/Employee(EmployeeID='"+ sEmployeeID +"')/Skill", {
                    urlParameters: {
                        $expand: "SkillList,ProficiencyList"
                    },
                    success: function (oSkill) {
                        var oEmployeeSkill = new JSONModel(oSkill);
                        oView.setModel(oEmployeeSkill, "EmployeeSkill");
                        oView.getModel("EmployeeSkill").refresh();
                    },
                    error: function () {}
                });
            },

            onEditEmployee: function () {
                // @ts-ignore
                var sEmployeeID = this.getView().byId('tEmployeeID').getText();
                this.getRouter().navTo("EditEmployee", {
                    EmployeeID: sEmployeeID
                });
            },

            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
        });
    });