'use strict';
  
(function () {
   $(document).ready(function () {
      // Added new code here to point to the configure function.
      tableau.extensions.initializeAsync({ 'configure':configure }).then(function () {
         drawChartJS();
      }, function () { console.log('Error while Initializing: ' + err.toString()); });
   });
  
   function drawChartJS() {
      const worksheets=tableau.extensions.dashboardContent.dashboard.worksheets;
      var worksheet=worksheets.find(function (sheet) {
         return sheet.name==="worksheetData";
      });
       
      worksheet.getSummaryDataAsync().then(function (sumdata) {
         var labels = [];
         var data = [];
         var worksheetData = sumdata.data;
  
         for (var i=0; i < worksheetData.length; i++) {
            labels.push(worksheetData[i][0].formattedValue);
            data.push(worksheetData[i][1].value);
         }
 
         var ctx = $("#myChart");
         var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
               labels: labels,
               datasets: [{
                  backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                  data: data
               }]
            }
         });
      });
   }
 
   // This opens the configuration window.
   function configure() {
   const popupUrl = `${window.location.origin}/dialog.html`;
   let defaultPayload = "";
   tableau.extensions.ui.displayDialogAsync(popupUrl, defaultPayload, { height:300, width:500 }).then((closePayload) => {
   }).catch((error) => {
      switch (error.errorCode) {
         case tableau.ErrorCodes.DialogClosedByUser:
            console.log("Dialog was closed by user");
         break;
         default:
            console.error(error.message);
         }
      });
   }
})();