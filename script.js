// script.js
google.charts.load('current', {packages:["orgchart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    // Define the chart data
    data.addRows([
        [{'v':'Hội Đồng Quản Trị', 'f':'Hội Đồng Quản Trị<div style="color:red; font-style:italic">HĐQT</div>'}, '', ''],
        [{'v':'Giám Đốc', 'f':'Giám Đốc<div style="color:red; font-style:italic">GD</div>'}, 'Hội Đồng Quản Trị', ''],
        [{'v':'Phó Giám đốc', 'f':'Phó Giám đốc<div style="color:red; font-style:italic">PGĐ</div>'}, 'Giám Đốc', ''],
        [{'v':'Phòng QLKT', 'f':'Phòng QLKT<div style="color:red; font-style:italic"></div>'}, 'Phó Giám đốc', ''],
        [{'v':'Phòng KH&KD', 'f':'Phòng KH&KD<div style="color:red; font-style:italic"></div>'}, 'Phó Giám đốc', ''],
        [{'v':'Phòng TCKT', 'f':'Phòng TCKT<div style="color:red; font-style:italic"></div>'}, 'Phó Giám đốc', ''],
        [{'v':'Phòng TCNC', 'f':'Phòng TCNC<div style="color:red; font-style:italic"></div>'}, 'Phó Giám đốc', ''],
        [{'v':'Trung tâm TN&KT', 'f':'Trung tâm TN&KT<div style="color:red; font-style:italic"></div>'}, 'Phó Giám đốc', ''],
        [{'v':'Trung tâm CGNB', 'f':'Trung tâm CGNB<div style="color:red; font-style:italic"></div>'}, 'Phó Giám đốc', ''],
        [{'v':'Trung tâm NBLC', 'f':'Trung tâm NBLC<div style="color:red; font-style:italic"></div>'}, 'Phó Giám đốc', ''],
        [{'v':'Trung tâm BMT', 'f':'Trung tâm BMT<div style="color:red; font-style:italic"></div>'}, 'Phó Giám đốc', ''],
        [{'v':'Trung tâm ĐNQN', 'f':'Trung tâm ĐNQN<div style="color:red; font-style:italic"></div>'}, 'Phó Giám đốc', '']
    ]);

    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    chart.draw(data, {'allowHtml': true});

    google.visualization.events.addListener(chart, 'select', function() {
        var selection = chart.getSelection();
        if (selection.length > 0) {
            var selectedItem = selection[0];
            var selectedRow = data.getValue(selectedItem.row, 0);
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
        'Trung tâm NBLC': {
            'nhân viên': ['Phạm Văn I - Giám đốc TT', 'Lê Thị J - Phó giám đốc TT', 'Nguyễn Văn x - Đội trưởng']
        },
        'Trung tâm CGNB': {
            'nhân viên': ['Nguyễn Văn K - Giám Đốc TT', 'Trần Thị L - Trưởng VPTT']
        },
        'Trung tâm BMT': {
            'nhân viên': ['Hoàng Văn M', 'Ngô Thị N']
        },
        'Trung tâm ĐNQN': {
            'nhân viên': ['Đinh Văn O', 'Nguyễn Thị P']
        },
        'Trung tâm TN&KT': {
            'nhân viên': ['Phạm Văn Q', 'Lê Thị R']
        }
    };

    var modal = document.getElementById("myModal");
    var modalInfo = document.getElementById("modal-info");

    modalInfo.innerHTML = ''; // Clear existing info

    if (info[name]) {
        if (info[name]['nhân viên']) {
            modalInfo.innerHTML = '<h3>Danh sách nhân viên</h3>';
            info[name]['nhân viên'].forEach(function(employee) {
                var button = document.createElement('button');
                button.innerText = employee;
                button.classList.add('employee-button');
                button.onclick = function() {
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
    document.getElementsByClassName("close")[0].onclick = function() {
        modal.style.display = "none";
    }
    document.getElementsByClassName("back")[0].onclick = function() {
        modalInfo.innerHTML = previousState; // Restore the previous state
    }
    // Close modal when user clicks anywhere outside of the modal
    window.onclick = function(event) {
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
        'Nguyễn Văn x - đội trưởng' :{
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
        }
        // Add the rest of the employee details here
    };

    var modalInfo = document.getElementById("modal-info");
    previousState = modalInfo.innerHTML; // Store the current state

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

