function showInfo(person) {
    let infoContent = document.getElementById("infoContent");

    const personInfo = {
        'ceo': {
            'title': 'Giám đốc',
            'phone': '0123456789',
            'status': 'Đang hoạt động',
            'location': 'Trụ sở chính'
        },
        'vp1': {
            'title': 'Phó giám đốc 1',
            'phone': '0123456790',
            'status': 'Đang hoạt động',
            'location': 'Văn phòng chi nhánh 1'
        },
        'vp2': {
            'title': 'Phó giám đốc 2',
            'phone': '0123456791',
            'status': 'Đang hoạt động',
            'location': 'Văn phòng chi nhánh 2'
        },
        'dept1': {
            'title': 'Phòng ban 1',
            'phone': '0123456792',
            'status': 'Đang hoạt động',
            'location': 'Trụ sở chính'
        },
        'dept2': {
            'title': 'Phòng ban 2',
            'phone': '0123456793',
            'status': 'Đang hoạt động',
            'location': 'Văn phòng chi nhánh 1'
        },
        'center1': {
            'title': 'Trung tâm 1',
            'phone': '0123456794',
            'status': 'Đang hoạt động',
            'location': 'Trung tâm vận hành 1'
        },
        'center2': {
            'title': 'Trung tâm 2',
            'phone': '0123456795',
            'status': 'Đang hoạt động',
            'location': 'Trung tâm vận hành 2'
        },
        'employee1': {
            'title': 'Nhân viên 1',
            'phone': '0123456796',
            'status': 'Đang hoạt động',
            'location': 'Phòng ban 1'
        },
        'employee2': {
            'title': 'Nhân viên 2',
            'phone': '0123456797',
            'status': 'Đang hoạt động',
            'location': 'Phòng ban 1'
        },
        'employee3': {
            'title': 'Nhân viên 3',
            'phone': '0123456798',
            'status': 'Đang hoạt động',
            'location': 'Phòng ban 2'
        },
        'employee4': {
            'title': 'Nhân viên 4',
            'phone': '0123456799',
            'status': 'Đang hoạt động',
            'location': 'Phòng ban 2'
        },
        'employee5': {
            'title': 'Nhân viên 5',
            'phone': '0123456800',
            'status': 'Đang hoạt động',
            'location': 'Trung tâm 1'
        },
        'employee6': {
            'title': 'Nhân viên 6',
            'phone': '0123456801',
            'status': 'Đang hoạt động',
            'location': 'Trung tâm 1'
        },
        'employee7': {
            'title': 'Nhân viên 7',
            'phone': '0123456802',
            'status': 'Đang hoạt động',
            'location': 'Trung tâm 2'
        },
        'employee8': {
            'title': 'Nhân viên 8',
            'phone': '0123456803',
            'status': 'Đang hoạt động',
            'location': 'Trung tâm 2'
        }
    };

    let info = personInfo[person];
    if (info) {
        infoContent.innerHTML = `
            <h2>${info.title}</h2>
            <p><strong>Số điện thoại:</strong> ${info.phone}</p>
            <p><strong>Trạng thái:</strong> ${info.status}</p>
            <p><strong>Nơi làm việc:</strong> ${info.location}</p>
        `;
    } else {
        infoContent.innerHTML = "<p>Thông tin không có sẵn.</p>";
    }

    document.getElementById("infoModal").style.display = "block";
}

function closeInfo() {
    document.getElementById("infoModal").style.display = "none";
}
function toggleDepartment(department) {
    let deptElement = document.getElementById(department);
    if (deptElement.classList.contains('hidden')) {
        deptElement.classList.remove('hidden');
    } else {
        deptElement.classList.add('hidden');
    }
}
