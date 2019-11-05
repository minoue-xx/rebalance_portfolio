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
        var target_pf = [0.275, 0.125, 0.2, 0.1, 0.1, 0.15, 0.05, 0, 0, 0];
        $(".target").each(function (index) {
            targets.push($(this).val());
            target_pf[index] = $(this).val() / 100;
        });
        $(".target_v").each(function (index) {
            $(this).val(targets[index]);
        });

        // inputs
        // let cost = 2000;


        var price = [155.83, 90.4, 42.78, 42.50, 142.56, 112.93, 39.23, 0, 0, 0];
        $(".price").each(function (index) {
            price[index] = parseFloat($(this).val());
        });

        var position = [12, 20, 40, 15, 6, 18, 12, 0, 0, 0];
        $(".qty").each(function (index) {
            position[index] = parseFloat($(this).val());
        });

        console.log(position);
        console.log(price);
        console.log(target_pf);

        // Create Data    
        var Target_pf = new Float64Array(target_pf);
        var Price = new Float64Array(price);
        var Position = new Float64Array(position);
        var Position2Add = new Float64Array(10);
        // Move Data to Heap
        var Target_pfbytes = _arrayToHeap(Target_pf);
        var Pricebytes = _arrayToHeap(Price);
        var Positionbytes = _arrayToHeap(Position);
        var Position2Addbytes = _arrayToHeap(Position2Add);
        // Run Function
        _optimizeposition_initialize();
        _getPosition2Add(Target_pfbytes.byteOffset, Pricebytes.byteOffset, Positionbytes.byteOffset, Position2Addbytes.byteOffset)
        _optimizeposition_terminate();
        //  Copy Data from Heap
        Position2Add = _heapToArray(Position2Addbytes, Position2Add);
        var position2add = Array.from(Position2Add);
        // Free Data from Heap
        _freeArray(Target_pfbytes);
        _freeArray(Pricebytes);
        _freeArray(Positionbytes);
        _freeArray(Position2Addbytes);

        // Display Results
        console.log("Original Position: " + Position);
        console.log("Position to add: " + position2add);

        // tmp
        let qty2add = Position2Add;
        $(".qty2add").each(function (index) {
            $(this).val(qty2add[index]);
        });

        updateVirtual();
    });


});