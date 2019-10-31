function makeTable(container, rowdata) {

    rowdata = rowdata.filter(word => word.length > 1);
    var table = $("<table/>");
    table.attr('id', 'tblTickers');
    var thead = $("<thead/>");
    var row = $("<tr/>");
    row.append($("<td/>").text("Ticker"));
    row.append($("<td/>").text("Quantity"));
    row.append($("<td/>").text("Price"));
    row.append($("<td/>").text("Sub-Total"));
    row.append($("<td/>").text("actual"));
    row.append($("<td/>").text("target"));
    thead.append(row);
    table.append(thead);

    var tbody = $("<tbody/>");
    $.each(rowdata, function (rowIndex, r) {
        var row = $("<tr/>");
        var cells = rowdata[rowIndex].split(",");

        cells = cells.filter(word => word.length > 1);
        $.each(cells, function (colIndex) {
            var col = $("<td/>");
            var input = $("<input/>");
            input.attr('type', 'text');
            input.attr('value', cells[colIndex]);
            if (colIndex == 0) {
                input.attr('class', 'ticker');
                input.attr('name', 'ticker');
            }
            if (colIndex == 1) {
                input.attr('class', 'qty');
                input.attr('name', 'qty');
            }
            col.append(input);
            row.append(col);
        });
        for (var i = 0; i <= 3; i++) {
            var col = $("<td/>");
            var input = $("<input/>");
            input.attr('type', 'text');
            input.attr('value', "");
            if (i == 0) {
                input.attr('class', 'price');
                input.attr('name', 'price');
            }
            if (i == 1) {
                input.attr('class', 'subtot');
                input.attr('name', 'subtot');
            }
            col.append(input);
            row.append(col);
        }
        tbody.append(row);
    });
    table.append(tbody);


    var tfoot = $("<tfoot/>");
    var row = $("<tr/>");
    for (var i = 0; i <= 2; i++) {
        row.append($("<td/>").text(""));
    }
    for (var i = 0; i <= 2; i++) {
        var col = $("<td/>");
        var input = $("<input/>");
        input.attr('type', 'text');
        input.attr('value', '');
        if (i == 0) {
            input.attr('class', 'grdtot');
            input.attr('name', 'grdtor');
        }
        col.append(input);
        row.append(col);
    }
    tfoot.append(row);
    table.append(tfoot);

    return container.append(table);
}

function appendTableRow(table) {
    var lastRow = $('<tr/>').appendTo(table.find('tbody:last'));

    //$.each(rowData, function (colIndex, c) {
    //    lastRow.append($('<td/>').text(c));
    //});

    for (let ii = 0; ii <= 5; ii++) {
        let col = $("<td/>");
        let input = $("<input/>");
        input.attr('type', 'text');
        if (ii == 0) {
            input.attr('class', 'ticker');
            input.attr('name', 'ticker');
        }
        if (ii == 1) {
            input.attr('class', 'qty');
            input.attr('name', 'qty');
        }
        if (ii == 2) {
            input.attr('class', 'price');
            input.attr('name', 'price');
        }
        if (ii == 3) {
            input.attr('class', 'subtot');
            input.attr('name', 'subtot');
        }
        if (ii == 4) {
            input.attr('class', 'actual');
            input.attr('name', 'actual');
        }
        if (ii == 5) {
            input.attr('class', 'target');
            input.attr('name', 'target');
        }
        col.append(input);
        lastRow.append(col);

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


/*
    var html = '<table  class="table table-condensed table-hover table-striped">';

if (typeof (data[0]) === 'undefined') {
    return null;
} else {
    $.each(data, function (index, row) {
        //bind header
        if (index == 0) {
            html += '<thead>';
            html += '<tr>';
            $.each(row, function (index, colData) {
                html += '<th>';
                html += colData;
                html += '</th>';
            });
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';
        } else {
            html += '<tr>';
            $.each(row, function (index, colData) {
                html += '<td>';
                html += colData;
                html += '</td>';
            });
            html += '</tr>';
        }
    });
    html += '</tbody>';
    html += '</table>';
    alert(html);
    $('#csv-display').append(html);
}
*/