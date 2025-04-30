sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "zchatbot/model/models",
    "sap/m/MessageBox"
],
function (UIComponent, Device, models, MessageBox) {
    "use strict";

    return UIComponent.extend("zchatbot.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
            this._handleComponentError();
            // Initialize OData model
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/scwm/WI_INTEGRATION_SRV/");
            this.setModel(oModel);

            // Enable routing
            this.getRouter().initialize();

            // Set the device model
            this.setModel(models.createDeviceModel(), "device");

            // Create the CAI Webclient Script
            var script = document.createElement("script");
            script.src = "https://cdn.cai.tools.sap/webclient/bootstrap.js";
            script.setAttribute("data-channel-id", "bcacaa43-3e97-4928-bcce-abbf68731012");
            script.setAttribute("data-token", "7de4d5a0cb5b6a3cc0fb0c65ca48d256");
            script.setAttribute("data-expander-type", "CAI");
            script.setAttribute("data-expander-preferences", 'JTdCJTIyYWNjZW50Q29sb3IlMjIlM0ElMjIlMjMwZjAwYTAlMjIlMkMlMjJiYWNrZ3JvdW5kQ29sb3IlMjIlM0ElMjIlMjNjN2NjZjElMjIlMkMlMjJjb21wbGVtZW50YXJ5Q29sb3IlMjIlM0ElMjIlMjNmZWZlZmUlMjIlMkMlMjJleHBhbmRlckxvZ28lMjIlM0ElMjJodHRwcyUzQSUyRiUyRmxvZ29kaXguY29tJTJGbG9nbyUyRjIxNDE2NTcuanBnJTIyJTJDJTIyZXhwYW5kZXJUaXRsZSUyMiUzQSUyMiUyMiUyQyUyMm9uYm9hcmRpbmdNZXNzYWdlJTIyJTNBJTIySGVyZSUyMHRvJTIwQXNzaXN0JTIyJTJDJTIyb3BlbmluZ1R5cGUlMjIlM0ElMjJuZXZlciUyMiUyQyUyMnRoZW1lJTIyJTNBJTIyQ1VTVE9NJTIyJTdE');
            script.id = "cai-webclient-custom";
            document.head.appendChild(script);

            // Global error handling for failed UI5 component loads
            sap.ui.getCore().attachInitError(this._handleComponentError.bind(this));

            // Handle routing errors (navigation issues)
            this.getRouter().attachBypassed(function (oEvent) {
                MessageBox.error("Failed to navigate to the requested page. Please check your navigation configuration.");
            });
        },
   // Attach global error handlers to capture runtime errors
   _attachGlobalErrorHandler: function (oEvent) {
    var that = this;

    // Captre JavaScript runtime errors
    window.onerror = function(message, source, lineno, colno, error) { 
        MessageBox.error("An error occurred: " + message, source + "(" + lineno + ":" + colno + ")");
        Log.error(" JavaScript Runtime Error: " + message + " at " + source + ":" + lineno + ":" + colno); 
        that._showInformationPopup(message);

    }

},
// Capture UI5 errors (XML Parsing, Binding, etc.)
CaptureUi5Errors: function(oEvent) {
    var oParameters = oEvent.getParameters();
    Log.error("UI5 Parse Error: " + oParameters.message, oParameters.source);
    that._showErrorPopup(oParameters.message);
},



_showInformationPopup: function () {
    MessageBox.information("A Fiori Launchpad runtime error has occurred. Would you like assistance?", {
        icon: MessageBox.Icon.ERROR,
        title: "Error Notification",
        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
        emphasizedAction: MessageBox.Action.YES,
        onClose: function (sAction) {
            if (sAction === MessageBox.Action.YES) {
                sap.m.MessageToast.show("Redirecting to assistance...");

                // Inject Chatbot script
                var script = document.createElement("script");
                script.src = "https://cdn.cai.tools.sap/webclient/bootstrap.js";
                script.setAttribute("data-channel-id", "bcacaa43-3e97-4928-bcce-abbf68731012");
                script.setAttribute("data-token", "7de4d5a0cb5b6a3cc0fb0c65ca48d256");
                script.setAttribute("data-expander-type", "CAI");
                script.setAttribute("data-expander-preferences",
                    'JTdCJTIyYWNjZW50Q29sb3IlMjIlM0ElMjIlMjMwZjAwYTAlMjIlMkMlMjJiYWNrZ3JvdW5kQ29sb3IlMjIlM0ElMjIlMjNjN2NjZjElMjIlMkMlMjJjb21wbGVtZW50YXJ5Q29sb3IlMjIlM0ElMjIlMjNmZWZlZmUlMjIlMkMlMjJleHBhbmRlckxvZ28lMjIlM0ElMjJodHRwcyUzQSUyRiUyRmxvZ29kaXguY29tJTJGbG9nbyUyRjIxNDE2NTcuanBnJTIyJTJDJTIyZXhwYW5kZXJUaXRsZSUyMiUzQSUyMiUyMiUyQyUyMm9uYm9hcmRpbmdNZXNzYWdlJTIyJTNBJTIySGVyZSUyMHRvJTIwQXNzaXN0JTIyJTJDJTIyb3BlbmluZ1R5cGUlMjIlM0ElMjJuZXZlciUyMiUyQyUyMnRoZW1lJTIyJTNBJTIyQ1VTVE9NJTIyJTdE'
                );
                script.id = "cai-webclient-custom";

                if (!document.getElementById("cai-webclient-custom")) {
                    document.head.appendChild(script);
                }

            } else {
                        sap.m.MessageToast.show("Assistance dismissed.");
                    }
                }
            });
        },
    });
});