window.onload = function () {
  var siteNameInput = document.getElementById("siteName");
  var siteUrlInput = document.getElementById("siteUrl");
  var tableBody = document.getElementsByTagName("tbody")[0];
  var bookmarks = [];
  var urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;


siteNameInput.oninput = function () {
  var value = siteNameInput.value;
  if (/^.{3,}$/.test(value)) {
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
  } else {
    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.add("is-invalid");
  }
};

siteUrlInput.oninput = function () {
  var value = siteUrlInput.value;
  if (urlPattern.test(value)) {
    siteUrlInput.classList.remove("is-invalid");
    siteUrlInput.classList.add("is-valid");
  } else {
    siteUrlInput.classList.remove("is-valid");
    siteUrlInput.classList.add("is-invalid");
  }
};


 window.submitBtn = function () {
    var siteName = siteNameInput.value.replace(/^\s+|\s+$/g, "");
    var siteUrl = siteUrlInput.value.replace(/^\s+|\s+$/g, "");

    if (!/^.{3,}$/.test(siteName)) {
      siteNameInput.classList.remove("is-valid");
      siteNameInput.classList.add("is-invalid");
      return;
    }
    if (!urlPattern.test(siteUrl)) {
      siteUrlInput.classList.remove("is-valid");
      siteUrlInput.classList.add("is-invalid");
      return;
    }

    if (!/^https?:\/\//i.test(siteUrl)) {
      siteUrl = "https://" + siteUrl;
    }


    bookmarks.push({ name: siteName, url: siteUrl });
    displayTable();


    siteNameInput.value = "";
    siteUrlInput.value = "";
    siteNameInput.classList.remove("is-valid", "is-invalid");
    siteUrlInput.classList.remove("is-valid", "is-invalid");
  };


  function displayTable() {
    tableBody.innerHTML = "";

    for (var i = 0; i < bookmarks.length; i++) {
      tableBody.innerHTML +=
        "<tr>" +
        "<td>" + (i + 1) + "</td>" +
        "<td>" + bookmarks[i].name + "</td>" +
        "<td><a href='" + bookmarks[i].url + "' target='_blank' class='btn btn-success btn-sm'>Visit</a></td>" +
        "<td><button class='btn btn-danger btn-sm delete-btn' data-index='" + i + "'>Delete</button></td>" +
        "</tr>";
    }
  }

tableBody.onclick = function (e) {
    var target = e.target; 
    if (target.className.indexOf("delete-btn") !== -1) {
        var index = target.getAttribute("data-index");
        bookmarks.splice(index, 1); 
        displayTable(); 
    }
};
};

