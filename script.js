google.charts.load('current', { packages: ["orgchart"] });
google.charts.setOnLoadCallback(drawChart);

var subChartState = {
    'Trung tâm NBLC': false,
    'Trung tâm TN&KT': false,
    'Trung tâm CGNB': false,
    'Trung tâm BMT': false,
    'Trung tâm ĐNQN': false,
    'Dự án CGNB': false,
    'Dự án Mai Sơn - QL.45': false,
    'Dự án NBLC': false,
    'Ban Giám đốc TT NBLC': false,
    'Đội thu phí TT NBLC': false,
    'Đội vận hành TT NBLC': false,
    'Đội thu phí Dự án CGNB':false,
    'Đội vận hành Dự án CGNB':false,
    'Đội thu phí TT ĐNQN': false,
};

var maindata;
var historyStack = [];

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    data.addRows([
        [{ 'v': 'Hội Đồng Quản Trị', 'f': 'Hội Đồng Quản Trị<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, '', ''],
        [{ 'v': 'Ban Giám Đốc', 'f': 'Ban Giám Đốc<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Hội Đồng Quản Trị', ''],
        [{ 'v': 'Phòng QLKT', 'f': 'Phòng QLKT<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Phòng KHKD', 'f': 'Phòng KHKD<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Phòng TCKT', 'f': 'Phòng TCKT<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Phòng TCNC', 'f': 'Phòng TCNC<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Trung tâm TN&KT', 'f': 'Trung tâm TN&KT<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Trung tâm CGNB', 'f': 'Trung tâm CGNB<div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
        [{ 'v': 'Dự án NBLC', 'f': 'Dự án NBLC <div><img src="img/logo.png" style="width: 40px; height: 40px;"></div><div style="color:red; font-style:italic"></div>' }, 'Ban Giám Đốc', ''],
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
                historyStack.push('main'); // Push 'main' to the history stack before showing sub-chart
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

    if (name === 'Dự án NBLC') {
        data.addRows([
            [{ 'v': 'Ban điều hành gói thầu', 'f': 'Ban điều hành gói thầu' }, name, ''],
            [{ 'v': 'Ban Giám đốc TT NBLC', 'f': 'Ban Giám đốc TT NBLC' }, 'Ban điều hành gói thầu', '']
        ]);
    } else if (name === 'Ban Giám đốc TT NBLC') {
        data.addRows([
            [{ 'v': 'VP Trung tâm NBLC', 'f': 'VP Trung tâm NBLC' }, name, ''],
            [{ 'v': 'Đội thu phí TT NBLC', 'f': 'Đội thu phí TT NBLC' }, name, ''],
            [{ 'v': 'Đội vận hành TT NBLC', 'f': 'Đội vận hành TT NBLC' }, name, '']
        ]);
    } else if (name == 'Đội thu phí TT NBLC') {
        data.addRows([
            // [{ 'v': 'Đội trưởng ' + name, 'f':'Đội trưởng ' + name}, name,''],
            // [{ 'v': 'ĐSHK', 'f':'ĐSHK'}, name, ''],
            [{ 'v': 'Trạm Km6' , 'f':'Trạm Km6'}, name, ''],
            [{ 'v': 'Trạm IC3', 'f':'Trạm IC3'}, name, ''],
            [{ 'v': 'Trạm IC4' , 'f':'Trạm IC4'}, name, ''],
            [{ 'v': 'Trạm IC6', 'f':'Trạm IC6'}, name, ''],
            [{ 'v': 'Trạm IC7' , 'f':'Trạm IC7'}, name, ''],
            [{ 'v': 'Trạm IC8', 'f':'Trạm IC8'}, name, ''],
            [{ 'v': 'Trạm IC9', 'f':'Trạm IC9'}, name, ''],
            [{ 'v': 'Trạm IC10' , 'f':'Trạm IC10'}, name, ''],
            [{ 'v': 'Trạm IC11', 'f':'Trạm IC11'}, name, ''],
            [{ 'v': 'Trạm IC12' , 'f':'Trạm IC12'}, name, ''],
            // [{ 'v': 'Trạm IC14', 'f':'Trạm IC14'}, name, ''],
            // [{ 'v': 'Trạm IC16', 'f':'Trạm IC16'}, name, ''],
            [{ 'v': 'Trạm Phố Lu', 'f':'Trạm Phố Lu'}, name, ''],
            // [{ 'v': 'Trạm IC17', 'f':'Trạm IC17'}, name, ''],
            // [{ 'v': 'Trạm Km237', 'f':'Trạm Km237'}, name, '']
        ]);
    } else if (name == 'Đội vận hành TT NBLC'){
        data.addRows([
            [{ 'v': 'Trạm IC3 ' + name, 'f':'Trạm IC3 ' + name}, name, ''],
            [{ 'v': 'Trạm IC9 ' + name, 'f':'Trạm IC9 ' + name}, name, ''],
            [{ 'v': 'Trạm IC12 ' + name , 'f':'Trạm IC12 ' + name}, name, ''],
        ]);
    } else if (name === 'Trung tâm TN&KT') {
        data.addRows([
            [{ 'v': 'VP Trung tâm TN&KT', 'f': 'VP Trung tâm TN&KT' }, name, ''],
            [{ 'v': 'Cầu Giẽ - Ninh Bình TN&KT', 'f': 'Cầu Giẽ - Ninh Bình TN&KT' }, 'VP Trung tâm TN&KT', ''],
            [{ 'v': 'Nội Bài - Lào Cai TN&KT', 'f': 'Nội Bài - Lào Cai TN&KT' }, 'VP Trung tâm TN&KT', '']
        ]);
    } else if (name === 'Trung tâm ĐNQN') {
        data.addRows([
            [{ 'v': 'VP ' + name, 'f': 'VP ' + name }, name, ''],
            [{ 'v': 'Đội thu phí TT ĐNQN' ,'f': 'Đội thu phí TT ĐNQN'}, 'VP Trung tâm ĐNQN', ''],
        ]);
    }else if (name == 'Đội thu phí TT ĐNQN'){
        data.addRows([
            [{ 'v': 'Đội trưởng ' + name, 'f':'Đội trưởng ' + name}, name, ''],
            [{ 'v': 'Trạm Túy Loan ', 'f':'Trạm Túy Loan '}, name, ''],
            [{ 'v': 'Trạm Bắc Quảng Ngãi ' , 'f':'Trạm Bắc Quảng Ngãi '}, name, ''],
        ]);
    } else if (name === 'Trung tâm BMT') {
        data.addRows([
            [{ 'v': 'VP ' + name, 'f': 'VP ' + name }, name, ''],
            [{ 'v': 'Dự án Hải Phòng', 'f': 'Dự án Hải Phòng' }, 'VP ' + name, ''],
            [{ 'v': 'Dự án QL.45 - Nghi Sơn - Diễn Châu', 'f': 'Dự án QL.45 - Nghi Sơn - Diễn Châu' }, 'VP ' + name, ''],
            [{ 'v': 'Dự án Diễn Châu - Bãi Vọt', 'f': 'Dự án Diễn Châu - Bãi Vọt' }, 'VP ' + name, ''],
        ]);
    } else if (name === 'Trung tâm CGNB') {
        data.addRows([
            [{ 'v': 'VP Trung tâm CGNB', 'f': 'VP Trung tâm CGNB' }, name, ''],
            [{ 'v': 'Dự án CGNB', 'f': 'Dự án CGNB' }, 'VP Trung tâm CGNB', ''],
            [{ 'v': 'Dự án Mai Sơn - QL.45', 'f': 'Dự án Mai Sơn - QL.45' }, 'VP Trung tâm CGNB', '']
        ]);
    } else if (name === 'Dự án CGNB') {
        data.addRows([
            [{ 'v': 'Đội thu phí ' + name, 'f': 'Đội thu phí ' + name }, name, ''],
            [{ 'v': 'Đội vận hành ' + name, 'f': 'Đội vận hành ' + name }, name, '']
        ]);
    } else if (name === 'Đội thu phí Dự án CGNB') {
        data.addRows([
            [{ 'v': 'Trạm Vực Vòng', 'f': 'Trạm Vực Vòng' }, name, ''],
            [{ 'v': 'Trạm Liêm Tuyền', 'f': 'Trạm Liêm Tuyền'}, name, ''],
            [{ 'v': 'Trạm Cao Bồ', 'f': 'Trạm Cao Bồ' }, name, '']
        ]);
    } else if (name === 'Đội vận hành Dự án CGNB') {
        data.addRows([
           [{ 'v': 'Tuyến Cầu Giẽ - Ninh Bình', 'f': 'Tuyến Cầu Giẽ - Ninh Bình'}, name, '']
        ]);
    } else if (name == 'Dự án Mai Sơn - QL.45') {
        data.addRows([
            [{ 'v': 'Đội vận hành ' + name, 'f': 'Đội vận hành ' + name }, name, '']
        ]);
    } else {
        // Default case for other nodes
        data.addRows([
            [{ 'v': 'Ban Giám đốc ' + name, 'f': 'Ban Giám đốc ' + name }, name, ''],
            [{ 'v': 'VP ' + name, 'f': 'VP ' + name }, 'Ban Giám đốc ' + name, ''],
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
                historyStack.push(name); // Push current sub-chart name to the history stack before showing next sub-chart
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
        'Dự án NBLC': false,
        'Trung tâm TN&KT': false,
        'Trung tâm CGNB': false,
        'Trung tâm BMT': false,
        'Trung tâm ĐNQN': false,
        'Dự án CGNB': false,
        'Dự án Mai Sơn - QL.45': false,
        'Dự án NBLC': false,
        'Ban Giám đốc TT NBLC': false,
        'Đội thu phí TT NBLC': false,
        'Đội vận hành TT NBLC': false,
        'Đội thu phí Dự án CGNB':false,
        'Đội vận hành Dự án CGNB':false,
        'Đội thu phí TT ĐNQN': false,
    };
    drawChart();
    document.getElementById('back_button').style.display = 'none'; // Hide back button
    if (historyStack.length > 0) {
        var previousChart = historyStack.pop();
        if (previousChart === 'main') {
            drawChart();
        } else {
            displaySubChart(previousChart);
        }
    }
}

function displayModal(name) {
    document.getElementById('modalTitle').innerText = name;
    $('#myModal').modal('show');
}

document.getElementById('back_button').addEventListener('click', goBack);

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}

window.onclick = function (event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function displayModal(name) {
    var info = {
        'Hội Đồng Quản Trị': {
            'nhân viên': ['Mai Đức Quỳnh - Chủ tịch Hội đồng quản trị',
                'Hà Bắc Sơn - Thành viên HĐQT',
                'Nguyễn Thanh Sơn - Thành viên HĐQT']
        },
        'Ban Giám Đốc': {
            'nhân viên': ['Nguyễn Thanh Sơn - Giám đốc Công ty',
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
        'Phòng KHKD': {
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
        // 'Ban Giám đốc TT NBLC': {
        //     'nhân viên': ['Ngô Văn Lợi - Giám Đốc TT',
        //                 'Nguyễn Văn Khương - Phó Giám đốc TT'
        //     ]
        // },
        'Ban điều hành gói thầu': {
            'nhân viên': ['Ngô Văn O - Giám đốc điều hành',
                'PHạm Văn A - Phó giám đốc điều hành'
            ]
        },
        'Ban Giám đốc Trung tâm BMT': {
            'nhân viên': ['Dương Văn Luận - Giám đốc TT', 'Mai Văn Mậu - Phó giám đốc TT']
        },

        'VP Trung tâm NBLC': {
            'nhân viên': ['Ngô Văn Lợi - Giám Đốc TT',
                'Nguyễn Văn Khương - Phó Giám đốc TT',
                'Lê Công Soát - Phó phòng',
                'Nguyễn Xuân Huy - Đội phó Đội điện',
                'Trần Thị Tuyết Nhung - Nhân viên TT',
                'Nguyễn Thị Đào - Nhân viên TT',
                'Nguyễn Thị Thanh - Nhân viên TT',
                'Dương Đức Minh - Nhân viên TT',
            ]
        },
        'VP Trung tâm TN&KT': {
            'nhân viên': ['Mai Đức Thành - Giám đốc TT',
                'Thái Công Danh - Phó phòng TT',
                'Nguyễn Thị Lộc - Kế toán'
            ]
        },
        'Cầu Giẽ - Ninh Bình TN&KT': {
            'chức vụ': 'Đội trưởng đội XD&BT số 1',
            'tên': 'Nguyễn Văn Ninh',
            'sđt': '0982636129',
            'nơi làm việc': 'Phụ trách tuyến đường cao tốc CGNB',
        },
        'Nội Bài - Lào Cai TN&KT': {
            'chức vụ': 'Đội phó đội XD&BT số 2',
            'tên': 'Uông Việt Anh',
            'sđt': '0985111914',
            'nơi làm việc': 'Phụ trách cả 2 dự án gói thầu O&M1-NBLC và O&M2-NBLC  tuyến đường cao tốc NBLC (Km0 - Km149+705)',
        },
        'VP Trung tâm CGNB': {
            'nhân viên': ['Ngô Huy Thuần - Giám đốc TT',
                'Trần Hồng Ngọc - Trưởng văn phòng TT',
                'Đinh Thị Thu Hương - Nhân viên TT',
                'Đỗ Thị Hương Lan - Nhân viên TT',
                'Nguyễn Thị Thảo - Nhân viên TT',
                'Đinh Văn Việt - Nhân viên TT'
            ]
        },
        'VP Trung tâm BMT': {
            'nhân viên': ['Dương Văn Luận - Giám đốc TT',
                        'Mai Văn Mậu - Phó Giám đốc TT',
                        'Mai Văn Giang - Phó phòng'
            ]
        },
        'VP Trung tâm ĐNQN': {
            'nhân viên': ['Nguyễn Văn Lượng - Phó Giám đốc TT',
                'Ngô Thị Thanh Nguyên - Phó phòng TT',
                'Đoàn Thị Ngọc Tuyết - Văn thư'
            ]
        },
        
        'Trạm Km6':{
           'nhân viên': ['Nguyễn Văn Chương - Đội trưởng Đội thu phí',
                        'Hoàng Thanh Ngọc - Đội phó đội ĐSHK',
                        'Phạm Hữu Long - Đội phó'
           ]
        },
        
        'Trạm IC3':{
            'tên': 'Lê Anh Tuấn',
            'chức vụ': 'Đội phó',
            'sđt': '0967126677',
            'nơi làm việc': 'Phụ trách Trạm IC3'
        },
        'Trạm IC4':{
            'tên': 'Nguyễn Văn Tý',
            'chức vụ': 'Đội phó',
            'sđt': '0975847000',
            'nơi làm việc': 'Phụ trách Trạm IC4'
        },
        'Trạm IC6':{
            'tên': 'Ngô Văn Hùng',
            'chức vụ':'Trưởng ca',
            'sđt':'0989058199',
            'nơi làm việc':'Phụ trách Trạm IC6'
        },
        'Trạm IC7':{
            'tên': 'Nguyễn Hồng Hạnh',
            'chức vụ': 'Trạm trưởng',
            'sđt': '0364625012',
            'nơi làm việc': 'Phụ trách Trạm IC7'
        },
        'Trạm IC8':{
            'tên': 'Hồ Thị Xuân Hương',
            'chức vụ': 'Trạm trưởng',
            'sđt': '0987344863',
            'nơi làm việc': 'Phụ trách Trạm IC8' 
        },
        'Trạm IC9':{
            'tên': 'Tạ Văn Thắng',
            'chức vụ': 'Đội phó',
            'sđt': '0978162555',
            'nơi làm việc': 'Phụ trách Trạm IC9'
        },
        'Trạm IC10':{
            'tên': 'Bùi Đăng Thắng',
            'chức vụ': 'Đội phó',
            'sđt': '0964062500',
            'nơi làm việc': 'Phụ trách Trạm IC10'
        },
        'Trạm IC11':{
            'tên': 'Nguyễn Tiến Cường',
            'chức vụ': 'Trạm trưởng',
            'sđt': '0865666505',
            'nơi làm việc': 'Phụ trách Trạm IC11'
        },
        'Trạm IC12':{
            'tên': 'Nguyễn Ngọc Huy',
            'chức vụ': 'Đội phó',
            'sđt': '0973985212',
            'nơi làm việc': 'Phụ trách Trạm IC12'
        },
        'Trạm Phố Lu':{
            'tên': 'Trương Quý Hậu',
            'chức vụ': 'Đội phó',
            'sđt': '0983022336',
            'nơi làm việc': 'Phụ trách cân Trạm Phố Lu'
        },
        'Trạm IC3 Đội vận hành TT NBLC':{
            'nhân viên':['Đinh Xuân Thắng - Đội trưởng Đội VH1',
                        'Hoàng Cao Khanh - Đội phó Đội VH1'
            ]
        },
        'Trạm IC9 Đội vận hành TT NBLC':{
            'tên': 'Bùi Văn Nam',
            'chức vụ': 'Đội phó đội VH2',
            'sđt': '0963995234',
            'nơi làm việc': 'Trụ sở trạm IC9 (Km48+088-Km98+400)'
        },
        'Trạm IC12 Đội vận hành TT NBLC':{
            'tên': 'Lê Đức Bình',
            'chức vụ': 'Đội trưởng đội VH2',
            'sđt': '0989429429',
            'nơi làm việc': 'Trụ sở trạm IC12 (Km98+400-Km149+705)'
        },
        'Đội thu phí Trung tâm CGNB': {
            'nhân viên': ['Phạm Lê Hòa - Đội trưởng',
                        'Nguyễn Hoài Nam - Đội phó',
                        'Thạch Hải Phong - Đội phó phụ trách bộ phận ĐSHK',
            ]
        },
        'Trạm Vực Vòng':{
          'nhân viên': ['Phạm Lê Hòa - Đội trưởng',
                        'Nguyễn Hoài Nam - Đội phó',
                        'Thạch Hải Phong - Đội phó phụ trách bộ phận ĐSHK',
                        'Phạm Quốc Bảo - Đội phó'
            ]
        },
        'Trạm Liêm Tuyền':{
            'tên': 'Phạm Bá Hòa',
            'chức vụ': 'Đội phó Đội thu phí',
            'sđt': '0943303509',
            'nơi làm việc': 'Phụ trách Trạm Liêm Tuyền'
        },
        'Trạm Cao Bồ':{
            'tên': 'Nguyễn Việt Cường',
            'chức vụ': 'Đội phó Đội thu phí',
            'sđt': '0915818286',
            'nơi làm việc': 'Phụ trách Trạm Cao Bồ'
        },

        'Đội vận hành Trung tâm NBLC': {
            'nhân viên': ['Đinh Xuân Thắng - Đội trưởng',
                'Nguyễn Văn Tý - Đội phó',
                'Lê Đức Bình - Đội trưởng',
                'Bùi Đăng Thắng - Đội phó'
            ]
        },
        'Tuyến Cầu Giẽ - Ninh Bình': {
            'nhân viên': ['Nguyễn Quốc Huy - Đội trưởng đội VH1',
                'Trần Quốc An - Đội phó đội VH1',
            ]
        },
        'Đội vận hành Dự án Mai Sơn - QL.45':{
            'nhân viên':['Bùi Đức Thành - Đội trưởng ĐVH số 2',
                'Đoàn Tiến Bắc - Đội phó']
        },
        'Dự án QL.45 - Nghi Sơn - Diễn Châu':{
            'tên': 'Ngô Anh Văn',
            'chức vụ': 'Đội phó',
            'sđt': '0979234333',
            'nơi làm việc': 'QL45-NS-DC'
        },
        'Dự án Diễn Châu - Bãi Vọt':{
            'tên': 'Đoàn Tiến Bắc',
            'chức vụ': 'Đội phó Đội vận hành',
            'sđt': '0985932086',
            'nơi làm việc': 'Tuyến Mai Sơn - QL46 (Điều chuyển từ TT CGNB)'
        },
        'Đội trưởng Đội thu phí TT ĐNQN':{
            'tên': 'Nguyễn Tấn Long',
            'chức vụ': 'Đội trưởng',
            'sđt': '0905705995',
            'nơi làm việc': 'Văn Phòng Trung tâm'
        },
        'Trạm Túy Loan ':{
            'tên': 'Trần Ngọc Long',
            'chức vụ': 'Đội phó',
            'sđt': '0912531088',
            'nơi làm việc': 'Trạm Túy Loan'
        },
        'Trạm Bắc Quảng Ngãi ':{
                'tên': 'Hoàng Hồng Phong',
                'chức vụ': 'Đội phó',
                'sđt': '0905639456',
                'nơi làm việc': 'Trạm Bắc Quảng Ngãi'
        }
    };

    var modal = document.getElementById("myModal");
    var modalInfo = document.getElementById("modal-info");


    previousState = modalInfo.innerHTML;
    modalInfo.innerHTML = '';

    if (info[name]) {
        if (info[name]['nhân viên']) {
            modalInfo.innerHTML = '<h3>Nhân Sự</h3>';
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
                <p><strong>Họ và Tên:</strong> ${info[name]['tên']}</p>
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
        'Mai Đức Quỳnh - Chủ tịch Hội đồng quản trị': {
            'tên': 'Mai Đức Quỳnh',
            'chức vụ': 'Chủ tịch Hội Đồng quản trị',
            'sđt': '0948345358',
        },
        'Hà Bắc Sơn - Thành viên HĐQT': {
            'tên': 'Hà Bắc Sơn',
            'chức vụ': 'Thành viên HĐQT',
            'sđt': '0913505054',
        },
        'Nguyễn Thanh Sơn - Thành viên HĐQT': {
            'tên': 'Nguyễn Thanh Sơn',
            'chức vụ': 'Thành viên HĐQT',
            'sđt': '0904223056'
        },
        'Nguyễn Thanh Sơn - Giám đốc Công ty': {
            'tên': 'Nguyễn Thanh Sơn',
            'chức vụ': 'Giám đốc Công ty',
            'sđt': '0904223056',
            'nơi làm việc': 'Văn phòng Công ty'
        },
        'Trần Ngọc Hải - Phó Giám đốc Công ty': {
            'tên': 'Trần Ngọc Hải',
            'chức vụ': 'Phó Giám đốc Công ty',
            'sđt': '0902356866',
            'nơi làm việc': 'Văn phòng Công ty'
        },
        'Nguyễn Văn Dương - Phó Giám đốc Công ty': {
            'tên': 'Nguyễn Văn Dương',
            'chức vụ': ' Phó Giám đốc Công ty',
            'sđt': '0983819689',
            'nơi làm việc': 'Văn phòng Công ty'
        },
        'Đỗ Thị Lan Hương - Kế toán trưởng': {
            'tên': 'Đỗ Thị Lan Hương',
            'chức vụ': 'Kế toán trưởng',
            'sđt': '0904875332',
            'nơi làm việc': 'Văn phòng Công ty'
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
        'Ngô Văn Lợi - Giám Đốc TT': {
            'tên': 'Ngô Văn Lợi',
            'chức vụ': 'Giám đốc Trung tâm NBLC',
            'sđt': '0912881892',
            'nơi làm việc': 'Trung tâm ĐH ĐCT NBLC'
        },
        'Nguyễn Văn Khương - Phó Giám đốc TT': {
            'tên': 'Nguyễn Văn Khương',
            'chức vụ': 'Phó giám đốc TT NBLC',
            'sđt': '0914898798',
            'nơi làm việc': 'Trung tâm ĐH ĐCT NBLC'
        },
        'Nguyễn Xuân Huy - Đội phó Đội điện': {
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
        'Nguyễn Văn Chương - Đội trưởng Đội thu phí':{
            'tên': 'Nguyễn Văn Chương',
            'chức vụ': 'Đội trưởng Đội thu phí',
            'sđt': '0979625656',
            'nơi làm việc': 'Trạm Km6'
        },
        'Hoàng Thanh Ngọc - Đội phó đội ĐSHK':{
            'tên': 'Hoàng Thanh Ngọc',
            'chức vụ': 'Đội phó - Phụ trách tổ ĐSHK',
            'sđt': '0975904672',
            'nơi làm việc': 'Trạm Km6'
        },
        'Phạm Hữu Long - Đội phó':{
            'tên': 'Phạm Hữu Long',
            'chức vụ': 'Đội phó',
            'sđt': '0911171086',
            'nơi làm việc': 'Phụ trách Trạm Km6'
        },
        'Đinh Xuân Thắng - Đội trưởng Đội VH1':{
            'tên': 'Đinh Xuân Thắng',
            'chức vụ': 'Đội trưởng Đội VH1',
            'sđt': '0916982268',
            'nơi làm việc': 'Trụ sở Trạm IC3 (Km0+000-Km48+088)'
        },
        'Hoàng Cao Khanh - Đội phó Đội VH1':{
            'tên': 'Hoàng Cao Khanh',
            'chức vụ': 'Đội phó Đội VH1',
            'sđt': '0963304611',
            'nơi làm việc': 'Trụ sở Trạm IC3 (Km98+400-Km149+705)'
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
        'Ngô Huy Thuần - Giám đốc TT': {
            'tên': 'Ngô Huy Thuần',
            'chức vụ': 'Giám đóc TT',
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
        'Nguyễn Quốc Huy - Đội trưởng đội VH1': {
            'tên': 'Nguyễn Quốc Huy',
            'chức vụ': 'Đội trưởng Đội Vận hành số 1',
            'sđt': '0948484366',
            'nơi làm việc': 'Tuyến Cầu Giẽ - Ninh Bình'
        },
        'Trần Quốc An - Đội phó đội VH1': {
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
        'Dương Văn Luận - Giám đốc TT': {
            'tên': 'Dương Văn Luận',
            'chức vụ': 'Giám đốc TT',
            'sđt': '0986010176',
            'nơi làm việc': 'Văn phòng TT BMT'
        },
        'Mai Văn Mậu - Phó Giám đốc TT': {
            'tên': 'Mai Văn Mậu',
            'chức vụ': 'Phó giám đốc TT',
            'sđt': '0919110819',
            'nơi làm việc': 'Văn Phòng TT BMT'
        },

        'Mai Văn Giang - Phó phòng': {
            'tên': 'Mai Văn Giang',
            'chức vụ': 'Phó phòng',
            'sđt': '0374824300',
            'nơi làm việc': 'Văn phòng TT BMT'
        },
       
    };

    var modalInfo = document.getElementById("modal-info");
    previousState = modalInfo.innerHTML;

    modalInfo.innerHTML = `
        <p><strong>Họ và Tên:</strong> ${employeeInfo[employee]['tên']}</p>
        <p><strong>Chức vụ:</strong> ${employeeInfo[employee]['chức vụ']}</p>
        <p><strong>SĐT:</strong> <a href="tel:${employeeInfo[employee]['sđt']}">${employeeInfo[employee]['sđt']}</a></p>
        <p><strong>Nơi làm việc:</strong> ${employeeInfo[employee]['nơi làm việc']}</p>
    `;
}
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}