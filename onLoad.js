$(function () {
    $("#upload").bind("click", function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#fileUpload").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {

                    var rowdata = e.target.result.split("\n");

                    container = $("#dvCSV");
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

        container = $("#dvCSV");
        container.html('');
        rowdata = ["VTI,100", "VEA,100", "VWO,100"];
        makeTable(container, rowdata);
        updateQuotes();
        updateQuotes_updates();

    });

    $("#addrow").bind("click", function () {

        appendTableRow(container)
        updateQuotes_updates();

    });
});