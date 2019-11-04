$(function () {
    $("#upload").bind("click", function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#fileUpload").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {

                    var rowdata = e.target.result.split("\n");

                    let container = $("#dvCSV");
                    container.html('');
                    makeTable(container, rowdata);
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
        let rowdata = ["VTI,100", "VEA,100", "VWO,100"];
        makeTable(container, rowdata);
        updateQuotes();
        updateQuotes_updates();

    });

    $("#addrow").bind("click", function () {

        let container = $("#dvCSV");

        if (container.html().length == 0) {
            makeEmptyTable(container);
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