function fillTableWithData(container, rowdata) {
    rowdata = rowdata.filter(word => word.length > 1);

    let $tblrows = $("#tblTickers tbody tr");
    $tblrows.each(function (index) {
        var $tblrow = $(this);

        cells = rowdata[index].split(",");
        cells = cells.filter(word => word.length > 1);

        $tblrow.find('.ticker').val(cells[0]);
        $tblrow.find('.qty').val(cells[1]);
        $tblrow.find('.target').val(cells[2]);
    });
}

function makeEmptyTable(container, nBodyRows) {

    var table = $("<table/>");
    table.attr('id', 'tblTickers');
    var thead = $("<thead/>");
    var row = $("<tr/>");

    let names = ["Ticker", "Quantity", "Price", "Sub-Total", "Actual%", "Target%", "Diff%"];

    $.each(names, function (index, value) {
        row.append($("<td/>").text(value));
    });
    thead.append(row);
    table.append(thead);

    var tbody = $("<tbody/>");

    let classes = ["ticker", "qty", "price", "subtot", "actual", "target", "diff"];

    for (var i = 0; i < nBodyRows; i++) {
        var row = $("<tr/>");
        $.each(classes, function (colIndex) {
            var col = $("<td/>");
            var input = $("<input/>");
            input.attr('type', 'text');
            input.attr('class', classes[colIndex]);
            input.attr('name', classes[colIndex]);
            col.append(input);
            row.append(col);
        });
        tbody.append(row);
    }

    table.append(tbody);

    var tfoot = $("<tfoot/>");
    var row = $("<tr/>");
    row.append($("<td/>").text(""));
    row.append($("<td/>").text(""));
    row.append($("<td/>").text(""));

    var col = $("<td/>");
    var input = $("<input/>");
    input.attr('type', 'text');
    input.attr('value', '');

    input.attr('class', 'grdtot');
    input.attr('name', 'grdtor');

    col.append(input);
    row.append(col);

    row.append($("<td/>").text(""));
    row.append($("<td/>").text(""));

    col = $("<td/>");
    input = $("<input/>");
    input.attr('type', 'text');
    input.attr('value', '');

    input.attr('class', 'grddiff');
    input.attr('name', 'grddiff');

    col.append(input);
    row.append(col);

    tfoot.append(row);
    table.append(tfoot);

    return container.append(table);
}

function appendLastRow(table) {
    var $tbody = table.find('tbody:last');
    var lastRow = $('<tr/>').appendTo($tbody);


    let classes = ["ticker", "qty", "price", "subtot", "actual", "target", "diff"];
    $.each(classes, function (colIndex, eachclass) {
        let col = $("<td/>");
        let input = $("<input/>");
        input.attr('type', 'text');
        input.attr('class', eachclass);
        input.attr('name', eachclass);
        col.append(input);
        lastRow.append(col);
    });

    updateQuotes_updatesbyRow(lastRow);
}

function deleteLastRow(table) {
    var $tbody = table.find('tbody:last');
    var $last = $tbody.find('tr:last');
    if ($last.is(':first-child')) {
        alert('last is the only one')
    } else {
        $last.remove()
        updateGrdTotal()
    }

}



/*
    < p id = "pCSV" >
    <table id="tblTickers">
        <thead>
            <tr>
                <td>Ticker</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Sub-Total</td>
                <td>actual</td>
                <td>target</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="text" class="ticker" value="" name="pnm" /></td>
                <td><input type="text" class="qty" value="" name="qty" /></td>
                <td><input type="text" class="price" value="0" name="price" /></td>
                <td><input type="text" class="subtot" value="0" name="subtot" /></td>
                <td><input type="text" class="actual" value="0" name="actual" /></td>
                <td><input type="text" class="target" value="0" name="target" /></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="text" class="grdtot" value="" name="" /></td>
            </tr>
        </tfoot>
    </table>
    </p >
*/