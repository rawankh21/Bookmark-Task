window.onload = function () {
  var siteNameInput = document.getElementById("siteName");
  var siteUrlInput = document.getElementById("siteUrl");
  var tableBody = document.getElementsByTagName("tbody")[0];

  var bookmarks = []; 

  var urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

  siteNameInput.oninput = function () {
    if (!/^.{3,}$/.test(siteNameInput.value)) {
      siteNameInput.style.border = "2px solid red";
    } else {
      siteNameInput.style.border = "2px solid lightblue";
    }
  };


  siteUrlInput.oninput = function () {
    if (!urlPattern.test(siteUrlInput.value)) {
      siteUrlInput.style.border = "2px solid red";
    } else {
      siteUrlInput.style.border = "2px solid lightblue";
    }
  };


  window.submitBtn = function () {
    var siteName = siteNameInput.value;
    var siteUrl = siteUrlInput.value;
    if (!/^.{3,}$/.test(siteName)) {
      siteNameInput.style.border = "2px solid red";
      return false;
    }

    if (!urlPattern.test(siteUrl)) {
      siteUrlInput.style.border = "2px solid red";
      return false;
    }
    if (!/^https?:\/\//i.test(siteUrl)) {
      siteUrl = "https://" + siteUrl;
    }
    bookmarks.push({ name: siteName, url: siteUrl });
    displayTable();
    siteNameInput.value = null;
    siteUrlInput.value = null;
    siteNameInput.style.border = "1px solid #ccc";
    siteUrlInput.style.border = "1px solid #ccc";
  };

 
  function displayTable() {
    tableBody.innerHTML = null; 

    for (var i = 0; i < bookmarks.length; i++) {
    tableBody.innerHTML +=
  "<tr>" +
    "<td>" + (i + 1) + "</td>" +
    "<td>" + bookmarks[i].name + "</td>" +
    "<td><a href='" + bookmarks[i].url + "' target='_blank' class='btn btn-success btn-sm '>Visit</a></td>" +
    "<td><button class='btn btn-danger btn-sm delete-btn' data-index='" + i + "'>Delete</button></td>" +
  "</tr>";
    }
  }

tableBody.onclick = function (e) {
  var target = e.target; 
  if (target.className.indexOf("delete-btn") !== -1) {
    var row = target.parentNode.parentNode; 
    tableBody.removeChild(row);
  }
};

};
