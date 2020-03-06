//Copyright (c) 2019 Michio Inoue
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
                    container.html("");
                    const names = ["Ticker", "Quantity", "Price", "Sub-Total", "Actual%", "Target%", "Diff%"];
                    const classes = ["ticker", "qty", "price", "subtot", "actual", "target", "diff"];
                    const footclasses = ["grdtot", "totactual", "tottarget", "grddiff"];
                    makeEmptyTable(container, rowdata.length, names, classes, footclasses, "tblCurrent");
                    fillTableWithData(container, rowdata);
                    updateQuotes_initialize();
                    updateQuotes_updates();

                    let dvBudget = $("#dvBudget");
                    dvBudget.html('<input type="text" class="budget" value="$2,000"/>')
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

        let rowdata = ["VTI,50,40", "VEA,100,30", "VWO,100,30"];
        let containerC = $("#dvCurrent");
        let containerV = $("#dvVirtual");
        containerC.html("");
        containerV.html("");


        const names = ["Ticker", "Quantity", "Price", "Sub-Total", "Actual%", "Target%", "Diff%"];
        const classes = ["ticker", "qty", "price", "subtot", "actual", "target", "diff"];
        const footclasses = ["grdtot", "totactual", "tottarget", "grddiff"];
        makeEmptyTable(containerC, rowdata.length, names, classes, footclasses, "tblCurrent");
        fillTableWithData(containerC, rowdata);
        updateQuotes_initialize();
        updateQuotes_updates();

        let dvBudget = $("#dvBudget");
        dvBudget.html('<input type="text" class="budget" value="$2,000"/>')

        dvBudget.find(".budget").on("change", function () {
            let budget = Number($(this).val().replace(/[^0-9.-]+/g, ""));
            $(this).val("$" + budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
        });
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
        containerV.html("");

        let containerC = $("#dvCurrent");
        let length = containerC.find(".ticker").length;

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
        let target_pf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $(".target").each(function (index) {
            targets.push($(this).val());
            target_pf[index] = $(this).val() / 100;
        });
        $(".target_v").each(function (index) {
            $(this).val(targets[index]);
        });

        // inputs
        let costs = Number($(".budget").val().replace(/[^0-9.-]+/g, ""));

        let price = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $(".price").each(function (index) {
            price[index] = Number($(this).val().replace(/[^0-9.-]+/g, ""));
        });

        let position = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $(".qty").each(function (index) {
            position[index] = Number($(this).val());
        });

        console.log(position);
        console.log(price);
        console.log(target_pf);
        console.log(costs);

        // Create Data    
        let Target_pf = new Float64Array(target_pf);
        let Price = new Float64Array(price);
        let Position = new Float64Array(position);
        let Position2Add = new Float64Array(10);
        // Move Data to Heap
        let Target_pfbytes = _arrayToHeap(Target_pf);
        let Pricebytes = _arrayToHeap(Price);
        let Positionbytes = _arrayToHeap(Position);
        let Position2Addbytes = _arrayToHeap(Position2Add);
        // Run Function
        _optimizeposition_initialize();
        _getPosition2Add(Target_pfbytes.byteOffset, Pricebytes.byteOffset, Positionbytes.byteOffset, costs, Position2Addbytes.byteOffset);
        _optimizeposition_terminate();
        //  Copy Data from Heap
        Position2Add = _heapToArray(Position2Addbytes, Position2Add);
        let position2add = Array.from(Position2Add);
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
        updateQuotes_updatesV();
    });


});