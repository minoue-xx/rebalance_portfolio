function fillTableWithData(container, rowdata) {
    rowdata = rowdata.filter(word => word.length > 1);

    let $tblrows = $("#tblTickers tbody tr");
    $tblrows.each(function (index) {
        let $tblrow = $(this);

        cells = rowdata[index].split(",");
        cells = cells.filter(word => word.length > 1);

        $tblrow.find('.ticker').val(cells[0]);
        $tblrow.find('.qty').val(cells[1]);
        $tblrow.find('.target').val(cells[2]);
    });
}

function makeEmptyTable(container, nBodyRows) {

    let table = $("<table/>");
    table.attr('id', 'tblTickers');
    let thead = $("<thead/>");
    let row = $("<tr/>");

    let names = ["Ticker", "Quantity", "Price", "Sub-Total", "Actual%", "Target%", "Diff%"];

    $.each(names, function (index, value) {
        row.append($("<td/>").text(value));
    });
    thead.append(row);
    table.append(thead);

    let tbody = $("<tbody/>");

    let classes = ["ticker", "qty", "price", "subtot", "actual", "target", "diff"];

    for (let i = 0; i < nBodyRows; i++) {
        let row = $("<tr/>");
        $.each(classes, function (colIndex) {
            let col = $("<td/>");
            let input = $("<input/>");
            input.attr('type', 'text');
            input.attr('class', classes[colIndex]);
            input.attr('name', classes[colIndex]);
            col.append(input);
            row.append(col);
        });
        tbody.append(row);
    }

    table.append(tbody);

    let tfoot = $("<tfoot/>");
    let row = $("<tr/>");
    row.append($("<td/>").text(""));
    row.append($("<td/>").text(""));
    row.append($("<td/>").text(""));

    let col = $("<td/>");
    let input = $("<input/>");
    input.attr('type', 'text');
    input.attr('value', '');

    input.attr('class', 'grdtot');
    input.attr('name', 'grdtor');

    col.append(input);
    row.append(col);

    col = $("<td/>");
    input = $("<input/>");
    input.attr('type', 'text');
    input.attr('value', '');

    input.attr('class', 'totactual');
    input.attr('name', 'totactual');

    col.append(input);
    row.append(col);

    col = $("<td/>");
    input = $("<input/>");
    input.attr('type', 'text');
    input.attr('value', '');

    input.attr('class', 'tottarget');
    input.attr('name', 'tottarget');

    col.append(input);
    row.append(col);

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
    let $tbody = table.find('tbody:last');
    let lastRow = $('<tr/>').appendTo($tbody);


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
    let $tbody = table.find('tbody:last');
    let $last = $tbody.find('tr:last');
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