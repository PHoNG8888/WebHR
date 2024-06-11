google.charts.load('current', { packages: ["orgchart"] });
google.charts.setOnLoadCallback(drawChart);

// Biến lưu trữ trạng thái mở hay đóng của các phòng
var subChartState = {
    'Trung tâm NBLC': false,
    'Trung tâm TN&KT': false,
    'Trung tâm CGNB': false,
    'Trung tâm BMT': false,
    'Trung tâm ĐNQN': false,
    'current': null
};

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    // Define the chart data
    data.addRows([
        [{ 'v': 'Hội Đồng Quản Trị', 'f': 'Hội Đồng Quản Trị<div style="color:red; font-style:italic"></div>' }, '', ''],
        [{ 'v': 'Giám Đốc', 'f': 'Giám Đốc<div style="color:red; font-style:italic"></div>' }, 'Hội Đồng Quản Trị', ''],
        [{ 'v': 'Phó Giám đốc', 'f': 'Phó Giám đốc<div style="color:red; font-style:italic"></div>' }, 'Giám Đốc', ''],
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
        // Only close the sub-chart if it's the same name clicked again
        if (subChartState.current === name) {
            drawChart();
            subChartState[name] = false;
            subChartState.current = null;
        }
    } else {
        // Draw the sub-chart for the selected center
        if (name === 'Trung tâm NBLC' || name === 'Trung tâm TN&KT' || name === 'Trung tâm CGNB' || name === 'Trung tâm BMT' || name === 'Trung tâm ĐNQN') {
            drawSubChart(name, 'chart_div', data);
            subChartState[name] = true;
            subChartState.current = name;  // Keep track of the currently opened center
        }
    }
}

function drawSubChart(name, containerId, data) {
    // Define the sub-chart data
    data.addRows([
        [{ 'v': 'Ban Giám đốc ' + name, 'f': 'Ban Giám đốc ' + name }, name, ''],
        [{ 'v': 'VPTT ' + name, 'f': 'VPTT ' + name }, 'Ban Giám đốc ' + name, ''],
        [{ 'v': 'Đội thu phí ' + name, 'f': 'Đội thu phí ' + name }, 'Ban Giám đốc ' + name, ''],
        [{ 'v': 'Đội vận hành ' + name, 'f': 'Đội vận hành ' + name }, 'Ban Giám đốc ' + name, '']
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
        'Ban Giám đốc Trung tâm NBLC': {
            'chức vụ': 'GD',
            'tên': 'Nguyễn Thanh Sơn',
            'sđt': '0987654321',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hồ Chí Minh'
        },
        'Ban Giám đốc Trung tâm TN&KT': {
            'chức vụ': 'GD',
            'tên': 'Nguyễn Thanh Sơn',
            'sđt': '0987654321',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hồ Chí Minh'
        },
        'Ban Giám đốc Trung tâm CGNB': {
            'chức vụ': 'GD',
            'tên': 'Nguyễn Thanh Sơn',
            'sđt': '0987654321',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hồ Chí Minh'
        },
        'Ban Giám đốc Trung tâm BMT': {
            'chức vụ': 'GD',
            'tên': 'Nguyễn Thanh Sơn',
            'sđt': '0987654321',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hồ Chí Minh'
        },
        'Ban Giám đốc Trung tâm ĐNQN': {
            'chức vụ': 'GD',
            'tên': 'Nguyễn Thanh Sơn',
            'sđt': '0987654321',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hồ Chí Minh'
        },
        'VPTT Trung tâm NBLC': {
            'nhân viên': ['Đinh Văn AA', 'Nguyễn Thị BB']
        },
        'VPTT Trung tâm TN&KT': {
            'nhân viên': ['Đinh Văn CC', 'Nguyễn Thị DD']
        },
        'VPTT Trung tâm CGNB': {
            'nhân viên': ['Đinh Văn EE', 'Nguyễn Thị FF']
        },
        'VPTT Trung tâm BMT': {
            'nhân viên': ['Đinh Văn GG', 'Nguyễn Thị HH']
        },
        'VPTT Trung tâm ĐNQN': {
            'nhân viên': ['Đinh Văn II', 'Nguyễn Thị KK']
        },
        'Đội thu phí Trung tâm NBLC': {
            'nhân viên': ['Đinh Văn LL', 'Nguyễn Thị MM']
        },
        'Đội thu phí Trung tâm TN&KT': {
            'nhân viên': ['Đinh Văn PP', 'Nguyễn Thị UU']
        },
        'Đội thu phí Trung tâm CGNB': {
            'nhân viên': ['Đinh Văn RR', 'Nguyễn Thị SS']
        },
        'Đội thu phí Trung tâm BMT': {
            'nhân viên': ['Đinh Văn TT', 'Nguyễn ThịQQ']
        },
        'Đội thu phí Trung tâm ĐNQN': {
            'nhân viên': ['Đinh Văn VV', 'Nguyễn Thị WW']
        },
        'Đội vận hành Trung tâm NBLC': {
            'nhân viên': ['Đinh Văn XX', 'Nguyễn Thị YY']
        },
        'Đội vận hành Trung tâm TN&KT': {
            'nhân viên': ['Đinh Văn ZZ', 'Nguyễn Thị AB']
        },
        'Đội vận hành Trung tâm CGNB': {
            'nhân viên': ['Đinh Văn CD', 'Nguyễn Thị EF']
        },
        'Đội vận hành Trung tâm BMT': {
            'nhân viên': ['Đinh Văn GH', 'Nguyễn Thị IK']
        },
        'Đội vận hành Trung tâm ĐNQN': {
            'nhân viên': ['Đinh Văn LM', 'Nguyễn Thị NO']
        }
    };

    var modal = document.getElementById("myModal");
    var modalInfo = document.getElementById("modal-info");

    previousState = modalInfo.innerHTML;
    modalInfo.innerHTML = '';

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
                <h3>Thông tin chi tiết</h3>
                <p><strong>Tên:</strong> ${info[name]['tên']}</p>
                <p><strong>Chức vụ:</strong> ${info[name]['chức vụ']}</p>
                <p><strong>SĐT:</strong> <a href="tel:${info[name]['sđt']}">${info[name]['sđt']}</a></p>
                <p><strong>Trạng thái:</strong> ${info[name]['trạng thái']}</p>
                <p><strong>Nơi làm việc:</strong> ${info[name]['nơi làm việc']}</p>
            `;
        }
        modal.style.display = "flex";
    }

    document.getElementsByClassName("close")[0].onclick = function() {
        modal.style.display = "none";
    };
    document.getElementsByClassName("back")[0].onclick = function() {
        modalInfo.innerHTML = previousState;
        var buttons = modalInfo.getElementsByClassName('employee-button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function() {
                displayEmployeeInfo(this.innerText);
            };
        }
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    var content = info[name] ? JSON.stringify(info[name]) : 'No information available';
            document.getElementById('modal_content').innerText = content;
            document.getElementById('modal').style.display = 'block';
}

// Close modal when clicking outside the content area
window.onclick = function (event) {
    var modal = document.getElementById("modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function displayEmployeeInfo(employee) {
    var employeeInfo = {
       'Nguyễn Văn Dương':{
            'chức vụ': 'Phó Giám đốc',
            'sđt':'0123456789',
            'trạng thái':'Active',
            'nơi làm việc': 'Hà Nam'
        },
        'Trần Ngọc Hải':{
            'chức vụ':'Phó Giám đốc',
            'sđt':'01235456987',
            'trạng thái':'Active',
            'nơi làm việc':'Hà Nam'
        },
        
        'Nguyễn Văn A - Phó trưởng phòng': {
            'chức vụ': 'Phó trưởng phòng',
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
        'Đinh Văn CC': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị DD': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Đinh Văn PP': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị UU': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Đinh Văn ZZ': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị AB': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Đinh Văn EE': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị FF': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Đinh Văn RR': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị SS': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Đinh Văn CD': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị EF': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Đinh Văn AA': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị BB': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Đinh Văn LL': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị MM': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Đinh Văn XX': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị YY': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Đinh Văn GG': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị HH': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Đinh Văn TT': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn ThịQQ': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Đinh Văn GH': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị IK': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },'Đinh Văn II': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị KK': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },'Đinh Văn VV': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị WW': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },'Đinh Văn LM': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456006',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
        'Nguyễn Thị NO': {
            'chức vụ': 'Nhân viên',
            'sđt': '0123456007',
            'trạng thái': 'Active',
            'nơi làm việc': 'Hải Phòng'
        },
    };

    var modalInfo = document.getElementById("modal-info");
    previousState = modalInfo.innerHTML;

    modalInfo.innerHTML = `
        <p>Chức vụ: ${employeeInfo[employee]['chức vụ']}</p>
        <p><strong>SĐT:</strong> <a href="tel:${employeeInfo[employee]['sđt']}">${employeeInfo[employee]['sđt']}</a></p>
        <p>Trạng thái: ${employeeInfo[employee]['trạng thái']}</p>
        <p>Nơi làm việc: ${employeeInfo[employee]['nơi làm việc']}</p>
    `;
}
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}