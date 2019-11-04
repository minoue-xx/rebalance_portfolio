$(function () {
    $("#upload").bind("click", function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#fileUpload").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {

                    var rowdata = e.target.result.split("\n");
                    rowdata = rowdata.filter(word => word.length > 1);

                    let container = $("#dvCSV");
                    container.html('');
                    //makeTable(container, rowdata);
                    makeEmptyTable(container, rowdata.length);
                    fillTableWithData(container, rowdata);
                    updateQuotes();
                    updateQuotes_updates();

                }
                reader.readAsText($("#fileUpload")[0].files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    });

    $("#uploadSampleData").bind("click", function () {

        let container = $("#dvCSV");
        container.html('');
        //let rowdata = ["VTI,100", "VEA,100", "VWO,100"];
        //let rowdata = ["VTI,124", "VYM,98", "VEA,371", "VWO,177", "GLD,48", "AGG,64", "XLRE,90"];
        let rowdata = ["VTI,124,0.28", "VYM,98,0.13", "VEA,371,0.23", "VWO,177,0.11", "GLD,48,0.10", "AGG,64,0.10", "XLRE,90,0.05"];

        makeEmptyTable(container, rowdata.length);
        fillTableWithData(container, rowdata);
        updateQuotes();
        updateQuotes_updates();

    });

    $("#addrow").bind("click", function () {

        let container = $("#dvCSV");

        if (container.html().length == 0) {
            makeEmptyTable(container, 2);
            updateQuotes_updates();
        } else {
            appendLastRow(container);
        }

    });

    $("#deleterow").bind("click", function () {

        let container = $("#dvCSV");
        deleteLastRow(container)

    });
});