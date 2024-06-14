google.charts.load('current', { packages: ["orgchart"] });
google.charts.setOnLoadCallback(drawChart);

var subChartState = {
    'Trung tâm NBLC': false,
    'Trung tâm TN&KT': false,
    'Trung tâm CGNB': false,
    'Trung tâm BMT': false,
    'Trung tâm ĐNQN': false
};

var maindata;

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    data.addRows([
        [{ 'v': 'Hội Đồng Quản Trị', 'f': 'Hội Đồng Quản Trị<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, '', ''],
        [{ 'v': 'Ban Giám Đốc', 'f': 'Ban Giám Đốc<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Hội Đồng Quản Trị', ''],
        [{ 'v': 'Phòng QLKT', 'f': 'Phòng QLKT<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Phòng KH&KD', 'f': 'Phòng KH&KD<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Phòng TCKT', 'f': 'Phòng TCKT<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Phòng TCNC', 'f': 'Phòng TCNC<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Trung tâm TN&KT', 'f': 'Trung tâm TN&KT<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Trung tâm CGNB', 'f': 'Trung tâm CGNB<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Trung tâm NBLC', 'f': 'Trung tâm NBLC<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Trung tâm BMT', 'f': 'Trung tâm BMT<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Trung tâm ĐNQN', 'f': 'Trung tâm ĐNQN<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', '']
    ]);

    maindata = data.clone();
    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    chart.draw(data, { 'allowHtml': true });

    google.visualization.events.addListener(chart, 'select', function () {
        var selection = chart.getSelection();
        if (selection.length > 0) {
            var selectedItem = selection[0];
            var selectedRow = data.getValue(selectedItem.row, 0);
            if (Object.keys(subChartState).includes(selectedRow)) {
                displaySubChart(selectedRow);
            } else {
                displayModal(selectedRow);
            }
        }
    });
}

function displaySubChart(name) {
    Object.keys(subChartState).forEach(key => {
        subChartState[key] = false;
    });
    subChartState[name] = true;
    drawSubChart(name);
}

function drawSubChart(name) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    if (name === 'Trung tâm TN&KT') {
        data.addRows([
            [{ 'v': 'VPTT Trung tâm TN&KT', 'f': 'VPTT Trung tâm TN&KT' }, name, ''],
            [{ 'v': 'Đội XD&BT số 1 Trung tâm TN&KT', 'f': 'Đội XD&BT số 1 Trung tâm TN&KT' }, 'VPTT Trung tâm TN&KT', ''],
            [{ 'v': 'Đội XD&BT số 2 Trung tâm TN&KT', 'f': 'Đội XD&BT số 2 Trung tâm TN&KT' }, 'VPTT Trung tâm TN&KT', '']
        ]);
    } else if (name === 'Trung tâm ĐNQN') {
        data.addRows([
            [{ 'v': 'VPTT Trung tâm ĐNQN', 'f': 'VPTT Trung tâm ĐNQN' }, name, ''],
            [{ 'v': 'Đội thu phí Trung tâm ĐNQN', 'f': 'Đội thu phí Trung tâm ĐNQN' }, 'VPTT Trung tâm ĐNQN', '']
        ]);
    } else if (name === 'Trung tâm BMT') {
        data.addRows([
            [{ 'v': 'Ban Giám đốc ' + name, 'f': 'Ban Giám đốc ' + name }, name, ''],
            [{ 'v': 'Đội vận hành ' + name, 'f': 'Đội vận hành ' + name }, 'Ban Giám đốc ' + name, '']
        ]);
    } else if (name === 'Trung tâm CGNB') {
        data.addRows([
            [{ 'v': 'VPTT Trung tâm CGNB', 'f': 'VPTT Trung tâm CGNB' }, name, ''],
            [{ 'v': 'Đội thu phí Trung tâm CGNB', 'f': 'Đội thu phí Trung tâm CGNB' }, 'VPTT Trung tâm CGNB', ''],
            [{ 'v': 'Đội vận hành Trung tâm CGNB', 'f': 'Đội vận hành Trung tâm CGNB' }, 'VPTT Trung tâm CGNB', '']
        ]);
    } else {
        data.addRows([
            [{ 'v': 'Ban Giám đốc ' + name, 'f': 'Ban Giám đốc ' + name }, name, ''],
            [{ 'v': 'VPTT ' + name, 'f': 'VPTT ' + name }, 'Ban Giám đốc ' + name, ''],
            [{ 'v': 'Đội thu phí ' + name, 'f': 'Đội thu phí ' + name }, 'Ban Giám đốc ' + name, ''],
            [{ 'v': 'Đội vận hành ' + name, 'f': 'Đội vận hành ' + name }, 'Ban Giám đốc ' + name, '']
        ]);
    }

    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    chart.draw(data, { 'allowHtml': true });

    google.visualization.events.addListener(chart, 'select', function () {
        var selection = chart.getSelection();
        if (selection.length > 0) {
            var selectedItem = selection[0];
            var selectedRow = data.getValue(selectedItem.row, 0);
            if (Object.keys(subChartState).includes(selectedRow)) {
                displaySubChart(selectedRow);
            } else {
                displayModal(selectedRow);
            }
        }
    });

    document.getElementById('back_button').style.display = 'block'; // Show back button
}

function goBack() {
    subChartState = {
        'Trung tâm NBLC': false,
        'Trung tâm TN&KT': false,
        'Trung tâm CGNB': false,
        'Trung tâm BMT': false,
        'Trung tâm ĐNQN': false
    };
    drawChart();
    document.getElementById('back_button').style.display = 'none'; // Hide back button
}

function displayModal(name) {
    alert("Selected: " + name);
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function displayModal(name) {
    var info = {
        'Hội Đồng Quản Trị': {
            'nhân viên':['Mai Đức Quỳnh - Chủ tịch Hội đồng quản trị', 
                        'Hà Bắc Sơn - Thành viên HĐQT', 
                        'Nguyễn Thanh Sơn - Thành viên HĐQT']
        },
        'Ban Giám Đốc': {
            'nhân viên':['Nguyễn Thanh Sơn - Giám đốc Công ty', 
                        'Trần Ngọc Hải - Phó Giám đốc Công ty',
                        'Nguyễn Văn Dương - Phó Giám đốc Công ty',
                        'Đỗ Thị Lan Hương - Kế toán trưởng']
        },
        'Phòng QLKT': {
            'nhân viên': ['Nguyễn Duy Hiếu - Phó trưởng phòng', 
                        'Lương Hùng Mạnh - Phó trưởng phòng',
                        'Đinh Văn Hưng - Phó trưởng phòng',
                        'Đậu Khắc Sơn - Chuyên viên',
                        'Trần Văn Đoán - Chuyên viên',
                        'Lê Xuân Hiệp - Chuyên viên',
                        'Ngô Hồng Phong - Chuyên viên']
        },
        'Phòng KH&KD': {
            'nhân viên': ['Nguyễn Thị Thu Phương - Phó trưởng phòng', 
                        'Hoàng Thị Huệ - Phó trưởng phòng',
                        'Nguyễn Thị Bích Thủy - Chuyên viên',
                        'Phạm Thị Ngọc - Chuyên viên',
                        'Lê Tiến Lâm - Chuyên viên',
                        'Nguyễn Thị Hiền - Chuyên viên',]
        },
        'Phòng TCKT': {
            'nhân viên': ['Nguyễn Thị Mai Hương - Phó trưởng phòng', 
                        'Bùi Thị Thanh Lương - Phó trưởng phòng',
                        'Nguyễn Thị Vân - Chuyên viên',
                        'Đoàn Thị Mai Phương - Chuyên viên']
        },
        'Phòng TCNC': {
            'nhân viên': ['Phạm Ngọc Hùng - Phụ trách phòng, Phó trưởng phòng', 
                        'Trần Thị Hòa - Phó trưởng phòng',
                        'Thái Thị Liệu - Chuyên viên',
                        'Trần Thanh Tùng - Chuyên viên',
                        'Mai Thu Hiền - Chuyên viên',
                        'Trần Thị Luyến - Chuyên viên',
                        'Nguyễn Thị Trà Giang - Chuyên viên',
                        'Tạ Đức Vượng - Chuyên viên',
                        'Phan Tiến Anh - Chuyên viên',]
        },
        'Ban Giám đốc Trung tâm NBLC': {
            'nhân viên': ['Ngô Văn Lợi - Giám Đốc TT',
                        'Nguyễn Văn Khương - Phó Giám đốc TT'
            ]
        },
      
        'Ban Giám đốc Trung tâm BMT': {
            'nhân viên': ['Dương Văn Luận - Giám đốc TT', 'Mai Văn Mậu - Phó giám đốc TT']
        },
       
        'VPTT Trung tâm NBLC': {
            'nhân viên': ['Nguyễn Xuân Huy - Đội phó',
                        'Lê Công Soát - Phó phòng',
                        'Trần Thị Tuyết Nhung - Nhân viên TT',
                        'Nguyễn Thị Đào - Nhân viên TT',
                        'Nguyễn Thị Thanh - Nhân viên TT',
                        'Dương Đức Minh - Nhân viên TT',
                        ]
        },
        'VPTT Trung tâm TN&KT': {
            'nhân viên': ['Mai Đức Thành - Giám đốc TT',
                        'Thái Công Danh - Phó phòng TT',
                        'Nguyễn Thị Lộc - Kế toán'
            ]
        },
        'Đội XD&BT số 1 Trung tâm TN&KT':{
            'chức vụ':'Đội trưởng đội XD&BT',
            'tên':'Nguyễn Văn Ninh',
            'sđt':'0982636129',
            'nơi làm việc':'Phụ trách tuyến đường cao tốc CGNB',
        },
        'Đội XD&BT số 2 Trung tâm TN&KT':{
            'chức vụ':'Đội phó đội XD&BT',
            'tên':'Uông Việt Anh',
            'sđt':'0985111914',
            'nơi làm việc':'Phụ trách cả 2 dự án gói thầu O&M1-NBLC và O&M2-NBLC  tuyến đường cao tốc NBLC (Km0 - Km149+705)',
        },
        'VPTT Trung tâm CGNB': {
            'nhân viên': ['Ngô Huy Thuần - Giám đốc TT',
                        'Trần Hồng Ngọc - Trưởng văn phòng TT',
                        'Đinh Thị Thu Hương - Nhân viên TT',
                        'Đỗ Thị Hương Lan - Nhân viên TT',
                        'Nguyễn Thị Thảo - Nhân viên TT',
                        'Đinh Văn Việt - Nhân viên TT'
            ]
        },

        'VPTT Trung tâm ĐNQN': {
            'nhân viên': ['Nguyễn Văn Lượng - Phó Giám đốc TT',
                        'Ngô Thị Thanh Nguyên - Phó phòng TT',
                        'Đoàn Thị Ngọc Tuyết - Văn thư'
            ]
        },
        'Đội thu phí Trung tâm NBLC': {
            'nhân viên': ['Nguyễn Văn Chương - Đội trưởng',
                        'Hoàng Thanh Ngọc - Đội phó',
                        'Phạm Hữu Long - Đội phó',
                        'Lê Anh Tuấn - Đội phó',
                        'Tạ Văn Thắng - Đội phó',
                        'Hoàng Cao Khanh - Đội phó',
                        'Bùi Văn Nam - Đội phó',
                        'Trương Quý Hậu - Đội phó'
             ]
        },
        'Đội thu phí Trung tâm CGNB': {
            'nhân viên': ['Phạm Lê Hòa - Đội trưởng',
                        'Nguyễn Hoài Nam - Đội phó',
                        'Thạch Hải Phong - Đội phó phụ trách bộ phận ĐSHK',
                        'Phạm Quốc Bảo - Đội phó',
                        'Phạm Bá Hòa - Đội phó',
                        'Nguyễn Việt Cường - Đội phó'
            ]
        },

        'Đội thu phí Trung tâm ĐNQN': {
            'nhân viên': ['Nguyễn Tấn Long - Đội trưởng',
                        'Trần Ngọc Long - Đội phó',
                        'Hoàng Hồng Phong - Đội phó'
            ]
        },
        'Đội vận hành Trung tâm NBLC': {
            'nhân viên': ['Đinh Xuân Thắng - Đội trưởng',
                        'Nguyễn Văn Tý - Đội phó',
                        'Lê Đức Bình - Đội trưởng',
                        'Bùi Đăng Thắng - Đội phó'
            ]
        },
        'Đội vận hành Trung tâm CGNB': {
            'nhân viên': ['Nguyễn Quốc Huy - Đội trưởng ĐVH số 1',
                        'Trần Quốc An - Đội phó',
                        
            ]
        },
        'Đội vận hành Trung tâm BMT': {
            'nhân viên': ['Mai Văn Giang - Phó phòng',
                        'Ngô Anh Văn - Đội phó',
                        'Bùi Đức Thành - Đội trưởng ĐVH số 2',
                        'Đoàn Tiến Bắc - Đội phó']
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
                <p><strong>Nơi làm việc:</strong> ${info[name]['nơi làm việc']}</p>
            `;
        }
        modal.style.display = "flex";
    }

    document.getElementsByClassName("close")[0].onclick = function () {
        modal.style.display = "none";
    };
    document.getElementsByClassName("back")[0].onclick = function () {
        modalInfo.innerHTML = previousState;
        var buttons = modalInfo.getElementsByClassName('employee-button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function () {
                displayEmployeeInfo(this.innerText);
            };
        }
    };
    window.onclick = function (event) {
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
        'Mai Đức Quỳnh - Chủ tịch Hội đồng quản trị':{
            'tên':'Mai Đức Quỳnh',
            'chức vụ':'Chủ tịch Hội Đồng quản trị',
            'sđt':'0948345358',
        },
       'Hà Bắc Sơn - Thành viên HĐQT':{
            'tên':'Hà Bắc Sơn',
            'chức vụ':'Thành viên HĐQT',
            'sđt':'0913505054',
       },
       'Nguyễn Thanh Sơn - Thành viên HĐQT':{
            'tên':'Nguyễn Thanh Sơn',
            'chức vụ':'Thành viên HĐQT',
            'sđt': '0904223056'
       },
       'Nguyễn Thanh Sơn - Giám đốc Công ty':{
            'tên': 'Nguyễn Thanh Sơn',
            'chức vụ':'Giám đốc Công ty',
            'sđt':'0904223056',
            'nơi làm việc':'Văn phòng Công ty'
       },
       'Trần Ngọc Hải - Phó Giám đốc Công ty':{
            'tên': 'Trần Ngọc Hải',
            'chức vụ':'Phó Giám đốc Công ty',
            'sđt':'0902356866',
            'nơi làm việc':'Văn phòng Công ty'
       },
       'Nguyễn Văn Dương - Phó Giám đốc Công ty':{
            'tên': 'Nguyễn Văn Dương',
            'chức vụ':' Phó Giám đốc Công ty',
            'sđt':'0983819689',
            'nơi làm việc':'Văn phòng Công ty'
       },
       'Đỗ Thị Lan Hương - Kế toán trưởng':{
            'tên': 'Đỗ Thị Lan Hương',
            'chức vụ':'Kế toán trưởng',
            'sđt':'0904875332',
            'nơi làm việc':'Văn phòng Công ty'
       },
       'Phạm Ngọc Hùng - Phụ trách phòng, Phó trưởng phòng': {
        'tên': 'Phạm Ngọc Hùng',
        'chức vụ': 'Phụ trách phòng, Phó trưởng phòng',
        'sđt': '0936448848',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Trần Thị Hòa - Phó trưởng phòng': {
        'tên': 'Trần Thị Hòa',
        'chức vụ': 'Phó trưởng phòng',
        'sđt': '0962258467',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Thái Thị Liệu - Chuyên viên': {
        'tên': 'Thái Thị Liệu',
        'chức vụ': 'Chuyên viên',
        'sđt': '0975706571',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Trần Thanh Tùng - Chuyên viên': {
        'tên': 'Trần Thanh Tùng',
        'chức vụ': 'Chuyên viên',
        'sđt': '0982272935',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Mai Thu Hiền - Chuyên viên': {
        'tên': 'Mai Thu Hiền',
        'chức vụ': 'Chuyên viên',
        'sđt': '0983998955',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Nguyễn Thị Trà Giang - Chuyên viên': {
        'tên': 'Nguyễn Thị Trà Giang',
        'chức vụ': 'Chuyên viên',
        'sđt': '0973768792',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Trần Thị Luyến - Chuyên viên': {
        'tên': 'Trần Thị Luyến',
        'chức vụ': 'Chuyên viên',
        'sđt': '0372935109',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Tạ Đức Vượng - Chuyên viên': {
        'tên': 'Tạ Đức Vượng',
        'chức vụ': 'Chuyên viên',
        'sđt': '0912346879',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Phan Tiến Anh - Chuyên viên': {
        'tên': 'Phan Tiến Anh',
        'chức vụ': 'Chuyên viên',
        'sđt': '0916192363',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Nguyễn Thị Mai Hương - Phó trưởng phòng': {
        'tên': 'Nguyễn Thị Mai Hương',
        'chức vụ': 'Phó trưởng phòng',
        'sđt': '0978729489',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Bùi Thị Thanh Lương - Phó trưởng phòng': {
        'tên': 'Bùi Thị Thanh Lương',
        'chức vụ': 'Phó trưởng phòng',
        'sđt': '0963735511',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Nguyễn Thị Vân - Chuyên viên': {
        'tên': 'Nguyễn Thị Vân',
        'chức vụ': 'Chuyên viên',
        'sđt': '0904420878',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Đoàn Thị Mai Phương - Chuyên viên': {
        'tên': 'Đoàn Thị Mai Phương',
        'chức vụ': 'Chuyên viên',
        'sđt': '0977239578',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Nguyễn Thị Thu Phương - Phó trưởng phòng': {
        'tên': 'Nguyễn Thị Thu Phương',
        'chức vụ': 'Phó trưởng phòng',
        'sđt': '0936684317',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Hoàng Thị Huệ - Phó trưởng phòng': {
        'tên': 'Hoàng Thị Huệ',
        'chức vụ': 'Phó trưởng phòng',
        'sđt': '0989537268',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Nguyễn Thị Bích Thủy - Chuyên viên': {
        'tên': 'Nguyễn Thị Bích Thủy',
        'chức vụ': 'Chuyên viên',
        'sđt': '0972782862',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Phạm Thị Ngọc - Chuyên viên': {
        'tên': 'Phạm Thị Ngọc',
        'chức vụ': 'Chuyên viên',
        'sđt': '0915563333',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Lê Tiến Lâm - Chuyên viên': {
        'tên': 'Lê Tiến Lâm',
        'chức vụ': 'Chuyên viên',
        'sđt': '0983533731',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Nguyễn Thị Hiền - Chuyên viên': {
        'tên': 'Nguyễn Thị Hiền',
        'chức vụ': 'Chuyên viên',
        'sđt': '0988096730',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Nguyễn Duy Hiếu - Phó trưởng phòng': {
        'tên': 'Nguyễn Duy Hiếu',
        'chức vụ': 'Phó trưởng phòng',
        'sđt': '0966305232',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Lương Hùng Mạnh - Phó trưởng phòng': {
        'tên': 'Lương Hùng Mạnh',
        'chức vụ': 'Phó trưởng phòng',
        'sđt': '0988833886',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Đinh Văn Hưng - Phó trưởng phòng': {
        'tên': 'Đinh Văn Hưng',
        'chức vụ': 'Phó trưởng phòng',
        'sđt': '0932329288',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Đậu Khắc Sơn - Chuyên viên': {
        'tên': 'Đậu Khắc Sơn',
        'chức vụ': 'Chuyên viên',
        'sđt': '0868096266',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Trần Văn Đoán - Chuyên viên': {
        'tên': 'Trần Văn Đoán',
        'chức vụ': 'Chuyên viên',
        'sđt': '0986084896',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Lê Xuân Hiệp - Chuyên viên': {
        'tên': 'Lê Xuân Hiệp',
        'chức vụ': 'Chuyên viên',
        'sđt': '0352223505',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Ngô Hồng Phong - Chuyên viên': {
        'tên': 'Ngô Hồng Phong',
        'chức vụ': 'Chuyên viên',
        'sđt': '0967904506',
        'nơi làm việc': 'Văn phòng Công ty'
    },
    'Ngô Văn Lợi - Giám Đốc TT':{
        'tên':'Ngô Văn Lợi',
        'chức vụ':'Giám đốc Trung tâm NBLC',
        'sđt':'0912881892',
        'nơi làm việc':'Trung tâm ĐH ĐCT NBLC'
    },
    'Nguyễn Văn Khương - Phó Giám đốc TT':{
        'tên':'Nguyễn Văn Khương',
        'chức vụ':'Phó giám đốc TT NBLC',
        'sđt':'0914898798',
        'nơi làm việc':'Trung tâm ĐH ĐCT NBLC'
    },
    'Nguyễn Xuân Huy - Đội phó': {
        'tên': 'Nguyễn Xuân Huy',
        'chức vụ': 'Đội phó',
        'sđt': '0983753028',
        'nơi làm việc': 'Trung tâm ĐH ĐCT NBLC'
    },
    'Lê Công Soát - Phó phòng': {
        'tên': 'Lê Công Soát',
        'chức vụ': 'Phó phòng',
        'sđt': '0904499666',
        'nơi làm việc': 'Trung tâm ĐH ĐCT NBLC'
    },
    'Trần Thị Tuyết Nhung - Nhân viên TT': {
        'tên': 'Trần Thị Tuyết Nhung',
        'chức vụ': 'Nhân viên TT',
        'sđt': '0379903186',
        'nơi làm việc': 'Trung tâm ĐH ĐCT NBLC'
    },
    'Nguyễn Thị Đào - Nhân viên TT': {
        'tên': 'Nguyễn Thị Đào',
        'chức vụ': 'Nhân viên TT',
        'sđt': '0966658558',
        'nơi làm việc': 'Trung tâm ĐH ĐCT NBLC'
    },
    'Nguyễn Thị Thanh - Nhân viên TT': {
        'tên': 'Nguyễn Thị Thanh',
        'chức vụ': 'Nhân viên TT',
        'sđt': '0984535646',
        'nơi làm việc': 'Trung tâm ĐH ĐCT NBLC'
    },
    'Dương Đức Minh - Nhân viên TT': {
        'tên': 'Dương Đức Minh',
        'chức vụ': 'Nhân viên TT',
        'sđt': '0938363722',
        'nơi làm việc': 'Trung tâm ĐH ĐCT NBLC'
    },
    'Đinh Xuân Thắng - Đội trưởng': {
        'tên': 'Đinh Xuân Thắng',
        'chức vụ': 'Đội trưởng',
        'sđt': '0916982268',
        'nơi làm việc': 'Km 0+000 - Km 48+088'
    },
    'Nguyễn Văn Tý - Đội phó': {
        'tên': 'Nguyễn Văn Tý',
        'chức vụ': 'Đội phó',
        'sđt': '0975847000',
        'nơi làm việc': 'Km 0+000 - Km 48+088'
    },
    'Lê Đức Bình - Đội trưởng': {
        'tên': 'Lê Đức Bình',
        'chức vụ': 'Đội trưởng',
        'sđt': '0989429429',
        'nơi làm việc': 'Km 114+900 - Km 149+705'
    },
    'Bùi Đăng Thắng - Đội phó': {
        'tên': 'Bùi Đăng Thắng',
        'chức vụ': 'Đội phó',
        'sđt': '0964062500',
        'nơi làm việc': 'Km 48 +088 - Km 114+900'
    },
    'Nguyễn Văn Chương - Đội trưởng': {
        'tên': 'Nguyễn Văn Chương',
        'chức vụ': 'Đội trưởng',
        'sđt': '0979625656',
        'nơi làm việc': 'Phụ trách chung'
    },
    'Hoàng Thanh Ngọc - Đội phó': {
        'tên': 'Hoàng Thanh Ngọc',
        'chức vụ': 'Đội phó',
        'sđt': '0975904672',
        'nơi làm việc': 'Phụ trách tổ ĐSHK'
    },
    'Phạm Hữu Long - Đội phó': {
        'tên': 'Phạm Hữu Long',
        'chức vụ': 'Đội phó',
        'sđt': '0911171086',
        'nơi làm việc': 'Phụ trách Trạm Km6'
    },
    'Lê Anh Tuấn - Đội phó': {
        'tên': 'Lê Anh Tuấn',
        'chức vụ': 'Đội phó',
        'sđt': '0967126677',
        'nơi làm việc': 'Phụ trách Trạm IC3'
    },
    'Tạ Văn Thắng - Đội phó': {
        'tên': 'Tạ Văn Thắng',
        'chức vụ': 'Đội phó',
        'sđt': '0978162555',
        'nơi làm việc': 'Phụ trách Trạm IC4'
    },
    'Hoàng Cao Khanh - Đội phó': {
        'tên': 'Hoàng Cao Khanh',
        'chức vụ': 'Đội phó',
        'sđt': '0963304611',
        'nơi làm việc': 'Phụ trách Trạm IC7'
    },
    'Bùi Văn Nam - Đội phó': {
        'tên': 'Bùi Văn Nam',
        'chức vụ': 'Đội phó',
        'sđt': '0963995234',
        'nơi làm việc': 'Phụ trách Trạm IC12'
    },
    'Trương Quý Hậu - Đội phó': {
        'tên': 'Trương Quý Hậu',
        'chức vụ': 'Đội phó',
        'sđt': '0983022336',
        'nơi làm việc': 'Phụ trách cân Trạm Phố Lu'
    },
    'Nguyễn Văn Lượng - Phó Giám đốc TT': {
        'tên': 'Nguyễn Văn Lượng',
        'chức vụ': 'Phó Giám đốc',
        'sđt': '0977297986',
        'nơi làm việc': 'Văn Phòng Trung tâm'
    },
    'Ngô Thị Thanh Nguyên - Phó phòng TT': {
        'tên': 'Ngô Thị Thanh Nguyên',
        'chức vụ': 'Phó phòng TT',
        'sđt': '0912253562',
        'nơi làm việc': 'Văn Phòng Trung tâm'
    },
    'Đoàn Thị Ngọc Tuyết - Văn thư': {
        'tên': 'Đoàn Thị Ngọc Tuyết',
        'chức vụ': 'Văn thư',
        'sđt': '0935383143',
        'nơi làm việc': 'Văn Phòng Trung tâm'
    },
    'Nguyễn Tấn Long - Đội trưởng': {
        'tên': 'Nguyễn Tấn Long',
        'chức vụ': 'Đội trưởng',
        'sđt': '0905705995',
        'nơi làm việc': 'Văn Phòng Trung tâm'
    },
    'Trần Ngọc Long - Đội phó': {
        'tên': 'Trần Ngọc Long',
        'chức vụ': 'Đội phó',
        'sđt': '0912531088',
        'nơi làm việc': 'Trạm Túy Loan'
    },
    'Hoàng Hồng Phong - Đội phó': {
        'tên': 'Hoàng Hồng Phong',
        'chức vụ': 'Đội phó',
        'sđt': '0905639456',
        'nơi làm việc': 'Trạm Bắc Quảng Ngãi'
    },
    'Ngô Huy Thuần - Giám đốc TT':{
        'tên':'Ngô Huy Thuần',
        'chức vụ':'Giám đóc TT',
       'sđt': '0916111766',
        'nơi làm việc': 'Trung tâm điều hành ĐCT CGNB'
    },
    'Trần Hồng Ngọc - Trưởng văn phòng TT': {
        'tên': 'Trần Hồng Ngọc',
        'chức vụ': 'Trưởng văn phòng Trung tâm',
        'sđt': '0989131388',
        'nơi làm việc': 'Trung tâm điều hành ĐCT CGNB'
    },
    'Đinh Thị Thu Hương - Nhân viên TT': {
        'tên': 'Đinh Thị Thu Hương',
        'chức vụ': 'Nhân viên Trung tâm',
        'sđt': '0374293212',
        'nơi làm việc': 'Trung tâm điều hành ĐCT CGNB'
    },
    'Đỗ Thị Hương Lan - Nhân viên TT': {
        'tên': 'Đỗ Thị Hương Lan',
        'chức vụ': 'Nhân viên Trung tâm',
        'sđt': '0917759226',
        'nơi làm việc': 'Trung tâm điều hành ĐCT CGNB'
    },
    'Nguyễn Thị Thảo - Nhân viên TT': {
        'tên': 'Nguyễn Thị Thảo',
        'chức vụ': 'Nhân viên Trung tâm',
        'sđt': '0917909386',
        'nơi làm việc': 'Trung tâm điều hành ĐCT CGNB'
    },
    'Đinh Văn Việt - Nhân viên TT': {
        'tên': 'Đinh Văn Việt',
        'chức vụ': 'Nhân viên Trung tâm',
        'sđt': '0915833269',
        'nơi làm việc': 'Trung tâm điều hành ĐCT CGNB'
    },
    'Nguyễn Quốc Huy - Đội trưởng ĐVH số 1': {
        'tên': 'Nguyễn Quốc Huy',
        'chức vụ': 'Đội trưởng Đội Vận hành số 1',
        'sđt': '0948484366',
        'nơi làm việc': 'Tuyến Cầu Giẽ - Ninh Bình'
    },
    'Trần Quốc An - Đội phó': {
        'tên': 'Trần Quốc An',
        'chức vụ': 'Đội phó Đội vận hành',
        'sđt': '0932315567',
        'nơi làm việc': 'Tuyến Cầu Giẽ - Ninh Bình'
    },
    'Bùi Đức Thành - Đội trưởng ĐVH số 2': {
        'tên': 'Bùi Đức Thành',
        'chức vụ': 'Đội trưởng Đội Vận hành số 2',
        'sđt': '0911521222',
        'nơi làm việc': 'Tuyến Mai Sơn - QL45 (Điều chuyển từ TT CGNB)'
    },
    'Đoàn Tiến Bắc - Đội phó': {
        'tên': 'Đoàn Tiến Bắc',
        'chức vụ': 'Đội phó Đội vận hành',
        'sđt': '0985932086',
        'nơi làm việc': 'Tuyến Mai Sơn - QL46 (Điều chuyển từ TT CGNB)'
    },
    'Phạm Lê Hòa - Đội trưởng': {
        'tên': 'Phạm Lê Hòa',
        'chức vụ': 'Đội trưởng Đội thu phí',
        'sđt': '0919515990',
        'nơi làm việc': 'Phụ trách chung'
    },
    'Nguyễn Hoài Nam - Đội phó': {
        'tên': 'Nguyễn Hoài Nam',
        'chức vụ': 'Đội phó Đội thu phí',
        'sđt': '0973926493',
        'nơi làm việc': 'Khối Thu phí'
    },
    'Thạch Hải Phong - Đội phó phụ trách bộ phận ĐSHK': {
        'tên': 'Thạch Hải Phong',
        'chức vụ': 'Đội phó phụ trách bộ phận ĐSHK',
        'sđt': '0944909626',
        'nơi làm việc': 'Đội ĐSHK'
    },
    'Phạm Quốc Bảo - Đội phó': {
        'tên': 'Phạm Quốc Bảo',
        'chức vụ': 'Đội phó Đội thu phí',
        'sđt': '0977567911',
        'nơi làm việc': 'Phụ trách Trạm Vực Vòng'
    },
    'Phạm Bá Hòa - Đội phó': {
        'tên': 'Phạm Bá Hòa',
        'chức vụ': 'Đội phó Đội thu phí',
        'sđt': '0943303509',
        'nơi làm việc': 'Phụ trách Trạm Liêm Tuyền'
    },
    'Nguyễn Việt Cường - Đội phó': {
        'tên': 'Nguyễn Việt Cường',
        'chức vụ': 'Đội phó Đội thu phí',
        'sđt': '0915818286',
        'nơi làm việc': 'Phụ trách Trạm Cao Bồ'
    },
    'Mai Đức Thành - Giám đốc TT': {
        'tên': 'Mai Đức Thành',
        'chức vụ': 'Giám đốc Trung tâm',
        'sđt': '0904888897',
        'nơi làm việc': 'Văn phòng TT TNKT'
    },
    'Thái Công Danh - Phó phòng TT': {
        'tên': 'Thái Công Danh',
        'chức vụ': 'Phó phòng Trung tâm',
        'sđt': '0972545072',
        'nơi làm việc': 'Văn phòng TT TNKT'
    },
    'Nguyễn Thị Lộc - Kế toán': {
        'tên': 'Nguyễn Thị Lộc',
        'chức vụ': 'Kế toán',
        'sđt': '0978576891',
        'nơi làm việc': 'Văn phòng TT TNKT'
    },
    'Dương Văn Luận - Giám đốc TT':{
        'tên':'Dương Văn Luận',
        'chức vụ':'Giám đốc TT',
        'sđt':'0986010176',
        'nơi làm việc':'Văn phòng TT BMT'
    },
    'Mai Văn Mậu - Phó giám đốc TT':{
        'tên':'Mai Văn Mậu',
        'chức vụ':'Phó giám đốc TT',
        'sđt':'0919110819',
        'nơi làm việc':'Văn Phòng TT BMT'
    },

    'Mai Văn Giang - Phó phòng':{
        'tên':'Mai Văn Giang',
        'chức vụ':'Phó phòng',
        'sđt':'0374824300',
        'nơi làm việc':'Văn phòng TT BMT'
    },
    'Ngô Anh Văn - Đội phó':{
        'tên':'Ngô Anh Văn',
        'chức vụ':'Đội phó',
        'sđt':'0979234333',
        'nơi làm việc':'QL45-NS-DC'
    }
    };

    var modalInfo = document.getElementById("modal-info");
    previousState = modalInfo.innerHTML;

    modalInfo.innerHTML = `
        <p><strong>Tên:</strong> ${employeeInfo[employee]['tên']}</p>
        <p><strong>Chức vụ:</strong> ${employeeInfo[employee]['chức vụ']}</p>
        <p><strong>SĐT:</strong> <a href="tel:${employeeInfo[employee]['sđt']}">${employeeInfo[employee]['sđt']}</a></p>
        <p><strong>Nơi làm việc:</strong> ${employeeInfo[employee]['nơi làm việc']}</p>
    `;
}
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}