
let Event = [
    {
        name: "tiệc ngủ",
        date: "25/12/2000",
        address: "123_street",
        lord: "gia_lac"

    },
    {
        name: "chén thánh",
        date: "26/10/-100000",
        address: "Utopia",
        lord: "LAC_THAN"

    }
]

let temp = JSON.parse(localStorage.getItem("Event")) || [];



let editIndex = null;
let tbody = document.getElementById("tbody");
let checkName = document.getElementById("check_botrong");
let checkDate = document.getElementById("check_date");
let checkAddress = document.getElementById("check_address");
let checkLord = document.getElementById("check_lord");


function show(data = Event) {
    let html = "";

    data.forEach((value, index) => {
        html += `
        <tr>
          <td>${value.name}</td>
          <td>${value.date}</td>
          <td>${value.address}</td>
          <td>${value.lord}</td>
          <td>
            <button onclick="edit_Event(${index})" class="btn btn-primary">Sửa</button>
            <button onclick="remove_Event(${index})" class="btn btn-danger">Xoá</button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
}






function add_Event() {
    let nameEvent = document.getElementById("name_Event").value.trim();
    let nameDate = document.getElementById("name_date").value.trim();
    let nameAddress = document.getElementById("name_address").value.trim();
    let nameLord = document.getElementById("name_lord").value.trim();

    let isValid = true;

    if (!nameEvent) {
        checkName.classList.remove("d-none");
        isValid = false;
    } else {
        checkName.classList.add("d-none");
    }

    if (!nameDate) {
        checkDate.classList.remove("d-none");
        isValid = false;
    } else {
        checkDate.classList.add("d-none");
    }

    if (!nameAddress) {
        checkAddress.classList.remove("d-none");
        isValid = false;
    } else {
        checkAddress.classList.add("d-none");
    }

    if (!nameLord) {
        checkLord.classList.remove("d-none");
        isValid = false;
    } else {
        checkLord.classList.add("d-none");
    }

    if (!isValid) return;


    let isDuplicate = Event.some((event, idx) => {
        return event.name === nameEvent && idx !== editIndex;
    });

    if (isDuplicate) {
        alert("Tên sự kiện đã tồn tại.");
        return;
    }

    let new_Event = {
        name: nameEvent, date: nameDate, address: nameAddress, lord: nameLord
    };

    if (editIndex !== null) {
        Event[editIndex] = new_Event;
        editIndex = null;
    } else {
        Event.push(new_Event);
    }

    saveToLocalStore();
    show();
    document.getElementById("name_Event").value = "";
    document.getElementById("name_date").value = "";
    document.getElementById("name_address").value = "";
    document.getElementById("name_lord").value = "";
}




function remove_Event(index) {
    if (confirm("Xác nhận muốn xóa!")) {
        Event.splice(index, 1);
        saveToLocalStore();
        show();
    }
}




function edit_Event(index) {
    let event = Event[index];
    document.getElementById("name_Event").value = event.name;
    document.getElementById("name_date").value = event.date;
    document.getElementById("name_address").value = event.address;
    document.getElementById("name_lord").value = event.lord;

    editIndex = index;
}





function search_NameEvent() {
    let keyword = document.getElementById("search_Name").value.toLowerCase();
    let filtered = Event.filter(ev => ev.name.toLowerCase().includes(keyword));
    show(filtered);
}




function saveToLocalStore() {
    localStorage.setItem("Event", JSON.stringify(Event));
}








show();