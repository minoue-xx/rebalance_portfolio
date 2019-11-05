$(function () {
    $("#upload").bind("click", function () {
        let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#fileUpload").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                let reader = new FileReader();
                reader.onload = function (e) {

                    let rowdata = e.target.result.split("\n");
                    rowdata = rowdata.filter(word => word.length > 1);

                    let container = $("#dvCurrent");
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

        //let rowdata = ["VTI,100,40", "VEA,100,30", "VWO,100,30"];
        //let rowdata = ["VTI,124", "VYM,98", "VEA,371", "VWO,177", "GLD,48", "AGG,64", "XLRE,90"];
        let rowdata = ["VTI,124,28.0", "VYM,98,13.0", "VEA,371,23.0", "VWO,177,11.0", "GLD,48,10.0", "AGG,64,10.0", "XLRE,90,5.0"];
        let containerC = $("#dvCurrent");
        let containerV = $("#dvVirtual");
        containerC.html('');
        containerV.html('');


        const names = ["Ticker", "Quantity", "Price", "Sub-Total", "Actual%", "Target%", "Diff%"];
        const classes = ["ticker", "qty", "price", "subtot", "actual", "target", "diff"];
        const footclasses = ["grdtot", "totactual", "tottarget", "grddiff"];
        makeEmptyTable(containerC, rowdata.length, names, classes, footclasses, "tblCurrent");
        fillTableWithData(containerC, rowdata);
        updateQuotes();
        updateQuotes_updates();

    });

    $("#addrow").bind("click", function () {

        let container = $("#dvCurrent");

        if (container.html().length == 0) {
            makeEmptyTable(container, 2);
            updateQuotes_updates();
        } else {
            appendLastRow(container);
        }

    });

    $("#deleterow").bind("click", function () {

        let container = $("#dvCurrent");
        deleteLastRow(container)

    });

    $("#runfmincon").bind("click", function () {

        let containerV = $("#dvVirtual");
        containerV.html('');

        let containerC = $("#dvCurrent");
        let length = containerC.find('.ticker').length;

        const names = ["Ticker", "to Add", "Cost", "Sub-Total", "Actual%", "Target%", "Diff%"];
        const classes = ["ticker_v", "qty2add", "cost", "subtot_v", "actual_v", "target_v", "diff_v"];
        const footclasses = ["totcost", "grdtot_v", "totactual_v", "tottarget_v", "grddiff_v"];
        makeEmptyTable(containerV, length, names, classes, footclasses, "tblVirtual");


        let tickers = [];
        $(".ticker").each(function (index) {
            tickers.push($(this).val());
        });
        $(".ticker_v").each(function (index) {
            $(this).val(tickers[index]);
        });

        let targets = [];
        $(".target").each(function (index) {
            targets.push($(this).val());
        });
        $(".target_v").each(function (index) {
            $(this).val(targets[index]);
        });

        // tmp
        let qty2add = [1, 1, 1];
        $(".qty2add").each(function (index) {
            $(this).val(qty2add[index]);
        });

        updateVirtual();
    });


});