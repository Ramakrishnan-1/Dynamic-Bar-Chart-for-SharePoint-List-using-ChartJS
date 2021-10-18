var barChart;
var barColors = [];
var xValues = [];
var yValues = [];

function fnGetData() {
    let queryURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeesList')/items?$select=*,Employee/Title&$expand=Employee/Title";
    let DataSet = [];
    let payload = {
        method: 'GET',
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        credentials: 'same-origin'
    }
    fetch(queryURL, payload)
        .then(response => response.json())
        .then((data) => {
            let items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                xValues.push(items[i].Employee.Title);
                yValues.push(items[i].ExpInYears);
                const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                barColors.push(randomColor);
            }
            fnGenerateChart(xValues, yValues);
        })
}

function fnGenerateChart(xValues, yValues) {
    barChart = new Chart("barChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                data: yValues,
                label: 'Employee Experience in Years',
                backgroundColor: barColors
            }]
        }
    });
}