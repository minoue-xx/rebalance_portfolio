function makeEmptyTable(container, nBodyRows, names, classes, footclasses, idname) {

    let table = $("<table/>");
    table.attr('id', idname);

    // Header
    let thead = $("<thead/>");

    {
        let row = $("<tr/>");
        $.each(names, function (index, value) {
            row.append($("<td/>").text(value));
        });
        thead.append(row);
    }
    table.append(thead);

    // Body
    let tbody = $("<tbody/>");


    for (let i = 0; i < nBodyRows; i++) {
        let row = $("<tr/>");
        $.each(classes, function (colIndex) {
            let col = $("<td/>");
            let input = $("<input/>");
            input.attr('type', 'text');
            input.attr('class', classes[colIndex]);
            col.append(input);
            row.append(col);
        });
        tbody.append(row);
    }
    table.append(tbody);


    // Footer
    let tfoot = $("<tfoot/>");
    {
        let row = $("<tr/>");
        let Nemtyfoot = classes.length - footclasses.length;
        for (let ii = 0; ii < Nemtyfoot; ii++) {
            row.append($("<td/>").text(""));
        }
        $.each(footclasses, function (colIndex) {
            let col = $("<td/>");
            let input = $("<input/>");
            input.attr('type', 'text');
            input.attr('value', '');
            input.attr('class', footclasses[colIndex]);
            col.append(input);
            row.append(col);
        });
        tfoot.append(row);
    }
    table.append(tfoot);
    return container.append(table);
}

function fillTableWithData(container, rowdata) {
    rowdata = rowdata.filter(word => word.length > 1);

    let $tblrows = $("#tblCurrent tbody tr");
    $tblrows.each(function (index) {
        let $tblrow = $(this);

        cells = rowdata[index].split(",");
        cells = cells.filter(word => word.length > 1);

        $tblrow.find('.ticker').val(cells[0]);
        $tblrow.find('.qty').val(cells[1]);
        $tblrow.find('.target').val(cells[2]);
    });
}

function appendLastRow(table) {
    let $tbody = table.find('tbody:last');
    let lastRow = $('<tr/>').appendTo($tbody);

    const classes = ["ticker", "qty", "price", "subtot", "actual", "target", "diff"];
    $.each(classes, function (colIndex, eachclass) {
        let col = $("<td/>");
        let input = $("<input/>");
        input.attr('type', 'text');
        input.attr('class', eachclass);
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
        updateActual()

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