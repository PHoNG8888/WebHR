google.charts.load('current', { packages: ["orgchart"] });
google.charts.setOnLoadCallback(drawChart);

// Biến lưu trữ trạng thái mở hay đóng của các phòng
var subChartState = {
    'Trung tâm NBLC': false,
    'Trung tâm TN&KT': false,
    'Trung tâm CGNB': false,
    'Trung tâm BMT': false,
    'Trung tâm ĐNQN': false
};


function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    // Define the chart data
    data.addRows([
        [{ 'v': 'Hội Đồng Quản Trị', 'f': 'Hội Đồng Quản Trị<div style="color:red; font-style:italic">HĐQT</div>' }, '', ''],
        [{ 'v': 'Giám Đốc', 'f': 'Giám Đốc<div style="color:red; font-style:italic">GD</div>' }, 'Hội Đồng Quản Trị', ''],
        [{ 'v': 'Phó Giám đốc', 'f': 'Phó Giám đốc<div style="color:red; font-style:italic">PGĐ</div>' }, 'Giám Đốc', ''],
        [{ 'v': 'Phòng QLKT', 'f': 'Phòng QLKT<div style="color:red; font-style:italic"></div>' }, 'Phó Giám đốc', ''],
        [{ 'v': 'Phòng KH&KD', 'f': 'Phòng KH&KD<div style="color:red; font-style:italic"></div>' }, 'Phó Giám đốc', ''],
        [{ 'v': 'Phòng TCKT', 'f': 'Phòng TCKT<div style="color:red; font-style:italic"></div>' }, 'Phó Giám đốc', ''],
        [{ 'v': 'Phòng TCNC', 'f': 'Phòng TCNC<div style="color:red; font-style:italic"></div>' }, 'Phó Giám đốc', ''],
        [{ 'v': 'Trung tâm TN&KT', 'f': 'Trung tâm TN&KT<div style="color:red; font-style:italic"></div>' }, 'Phó Giám đốc', ''],
        [{ 'v': 'Trung tâm CGNB', 'f': 'Trung tâm CGNB<div style="color:red; font-style:italic"></div>' }, 'Phó Giám đốc', ''],
        [{ 'v': 'Trung tâm NBLC', 'f': 'Trung tâm NBLC<div style="color:red; font-style:italic"></div>' }, 'Phó Giám đốc', ''],
        [{ 'v': 'Trung tâm BMT', 'f': 'Trung tâm BMT<div style="color:red; font-style:italic"></div>' }, 'Phó Giám đốc', ''],
        [{ 'v': 'Trung tâm ĐNQN', 'f': 'Trung tâm ĐNQN<div style="color:red; font-style:italic"></div>' }, 'Phó Giám đốc', '']
    ]);

    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    chart.draw(data, { 'allowHtml': true });

    google.visualization.events.addListener(chart, 'select', function () {
        var selection = chart.getSelection();
        if (selection.length > 0) {
            var selectedItem = selection[0];
            var selectedRow = data.getValue(selectedItem.row, 0);
            displaySubChart(data, selectedRow);
            displayModal(selectedRow);
        }
    });
}

function displaySubChart(data, name) {

    if (subChartState[name]) {
        drawChart();
        subChartState[name] = false;
    } else {
        // Thêm các hàng cho phòng đã chọn
        if (name === 'Trung tâm NBLC') {
            drawSubChart(name, 'chart_div', data);
        }
        if (name === 'Trung tâm TN&KT') {
            drawSubChart(name, 'chart_div', data);
        }
        if (name === 'Trung tâm CGNB') {
            drawSubChart(name, 'chart_div', data);
        }
        if (name === 'Trung tâm BMT') {
            drawSubChart(name, 'chart_div', data);
        }
        if (name === 'Trung tâm ĐNQN') {
            drawSubChart(name, 'chart_div', data);
        }
        subChartState[name] = true;
    }
}

function drawSubChart(name, containerId, data) {

    // Define the sub-chart data
    data.addRows([
        [{ 'v': 'Ban Giám đốc', 'f': 'Ban Giám đốc' }, name, ''],
        [{ 'v': 'VPTT', 'f': 'VPTT' }, 'Ban Giám đốc', ''],
        [{ 'v': 'Đội thu phí', 'f': 'Đội thu phí' }, 'Ban Giám đốc', ''],
        [{ 'v': 'Đội vận hành', 'f': 'Đội vận hành' }, 'Ban Giám đốc', '']
    ]);

    var subChart = new google.visualization.OrgChart(document.getElementById(containerId));
    subChart.draw(data, { 'allowHtml': true });

    google.visualization.events.addListener(subChart, 'select', function () {
        var selection = subChart.getSelection();
        if (selection.length > 0) {
            var selectedItem = selection[0];
            var selectedRow = data.getValue(selectedItem.row, 0);
            displaySubChart(data, selectedRow);
            displayModal(selectedRow);
        }
    });

}

function displayModal(name) {
    var info = {
        'Hội Đồng Quản Trị': {
            'tên': 'Nguyễn Thanh A',
            'chức vụ': 'HĐQT',
            'sđt': '0123456789',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hà Nội'
        },
        'Giám Đốc': {
            'chức vụ': 'GD',
            'tên': 'Nguyễn Thanh Sơn',
            'sđt': '0987654321',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hồ Chí Minh'
        },
        'Phó Giám đốc': {
            'nhân viên': ['Nguyễn Văn Dương', 'Trần Ngọc Hải']
        },
        'Phòng QLKT': {
            'nhân viên': ['Nguyễn Văn A - Phó trưởng phòng', 'Trần Thị B']
        },
        'Phòng KH&KD': {
            'nhân viên': ['Phạm Văn C', 'Lê Thị D']
        },
        'Phòng TCKT': {
            'nhân viên': ['Hoàng Văn E', 'Ngô Thị F']
        },
        'Phòng TCNC': {
            'nhân viên': ['Đinh Văn G', 'Nguyễn Thị H']
        },
        'Ban Giám đốc': {
            'chức vụ': 'GD',
            'tên': 'Nguyễn Thanh Sơn',
            'sđt': '0987654321',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hồ Chí Minh'
        },
        'VPTT': {
            'nhân viên': ['Đinh Văn G', 'Nguyễn Thị H']
        },
        'Đội thu phí': {
            'nhân viên': ['Đinh Văn G', 'Nguyễn Thị H']
        },
        'Đội vận hành': {
            'nhân viên': ['Đinh Văn G', 'Nguyễn Thị H']
        }
    };

    var modal = document.getElementById("myModal");
    var modalInfo = document.getElementById("modal-info");

    modalInfo.innerHTML = ''; // Clear existing info

    if (info[name]) {
        if (info[name]['nhân viên']) {
            modalInfo.innerHTML = '<h3>Danh sách nhân viên</h3>';
            info[name]['nhân viên'].forEach(function (employee) {
                var button = document.createElement('button');
                button.innerText = employee;
                button.classList.add('employee-button');
                button.onclick = function () {
                    displayEmployeeInfo(employee);
                };
                modalInfo.appendChild(button);
            });
        } else {
            modalInfo.innerHTML = `
                <p>Chức vụ: ${info[name]['chức vụ']}</p>
                <p>Tên: ${info[name]['tên']}</p>
                <p>SĐT: ${info[name]['sđt']}</p>
                <p>Trạng thái: ${info[name]['trạng thái']}</p>
                <p>Nơi làm việc: ${info[name]['nơi làm việc']}</p>
            `;
        }
        modal.style.display = "flex";
    }

    // Close modal when user clicks on <span> (x)
    var closeButton = document.getElementsByClassName("close")[0];
    if (closeButton) {
        closeButton.onclick = function () {
            modal.style.display = "none";
        }
    }

    // Close modal when user clicks anywhere outside of the modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function displayEmployeeInfo(employee) {
    var employeeInfo = {
        'Nguyễn Văn A - Phó trưởng phòng': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456000',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hà Nội'
        },
        'Trần Thị B': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456001',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hà Nội'
        },
        'Phạm Văn C': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456002',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hồ Chí Minh'
        },
        'Lê Thị D': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456003',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hồ Chí Minh'
        },
        'Hoàng Văn E': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456004',
            'trạng thái': 'Active',
            'nơi làm việc': 'Đà Nẵng'
        },
        'Ngô Thị F': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456005',
            'trạng thái': 'Active',
            'nơi làm việc': 'Đà Nẵng'
        },
        'Đinh Văn G': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị H': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Phạm Văn I - Giám đốc TT': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456008',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hà Nội'
        },
        'Lê Thị J - Phó giám đốc TT': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456009',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hà Nội'
        },
        'Nguyễn Văn x - đội trưởng': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456009',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hà Nội'
        },
        'Nguyễn Văn K - Giám Đốc TT': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456010',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hồ Chí Minh'
        },
        'Trần Thị L - Trưởng VPTT': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456011',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hồ Chí Minh'
        },
        'Hoàng Văn M': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456012',
            'trạng thái': 'Active',
            'nơi làm việc': 'Đà Nẵng'
        },
        'Ngô Thị N': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456013',
            'trạng thái': 'Active',
            'nơi làm việc': 'Đà Nẵng'
        },
        'Đinh Văn O': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456014',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị P': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456015',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Phạm Văn Q': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456016',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hà Nội'
        },
        'Lê Thị R': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456017',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hà Nội'
        },
        'Nguyễn Văn Dương': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456017',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hà Nội'
        }
    };

    var modalInfo = document.getElementById("modal-info");
    var previousState = modalInfo.innerHTML; // Store the current state

    modalInfo.innerHTML = `
        <p>Chức vụ: ${employeeInfo[employee]['chức vụ']}</p>
        <p>SĐT: ${employeeInfo[employee]['sđt']}</p>
        <p>Trạng thái: ${employeeInfo[employee]['trạng thái']}</p>
        <p>Nơi làm việc: ${employeeInfo[employee]['nơi làm việc']}</p>
    `;
}

function closeInfo() {
    var modal = document.getElementById("infoModal");
    modal.style.display = "none";
}
