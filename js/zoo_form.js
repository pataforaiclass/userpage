let flag_pName = false;
let flag_pNumber = true;
let flag_pSize = false;
let flag_pType = false;
let flag_pSite = false;
let zooData = {};
$(function () {
  //網頁重整時消除 hash
  if (window.location.hash) {
    // 先回到最上方
    $("html, body").scrollTop(0);
    // 移除網址 hash
    history.replaceState(
      null,
      null,
      window.location.pathname + window.location.search
    );
  }

  //監聽
  $("#pName").on("input", function () {
    // console.log($(this).val());
    let pName = $(this).val().trim();
    if (pName.length >= 1 && pName.length <= 10) {
      //符合規定
      $(this).removeClass("is-invalid").addClass("is-valid");
      flag_pName = true;
    } else {
      //不符合規定
      $(this).removeClass("is-valid").addClass("is-invalid");
      flag_pName = false;
    }
  });
  $("#pNumber").on("input", function () {
    let pNumber = Number($(this).val());
    if (pNumber >= 1 && pNumber <= 1000) {
      $(this).removeClass("is-invalid").addClass("is-valid");
      flag_pNumber = true;
    } else {
      $(this).removeClass("is-valid").addClass("is-invalid");
      flag_pNumber = false;
    }
  });
  $("#pSize").on("input", function () {
    // console.log($(this).val());
    let pSize = $(this).val().trim();
    if (pSize.length >= 1 && pSize.length <= 3) {
      //符合規定
      $(this).removeClass("is-invalid").addClass("is-valid");
      flag_pSize = true;
    } else {
      //不符合規定
      $(this).removeClass("is-valid").addClass("is-invalid");
      flag_pSize = false;
    }
  });
  $("#pType").on("change", function () {
    if ($(this).val() != null) {
      $(this).removeClass("is-invalid").addClass("is-valid");
      flag_pType = true;
    } else {
      $(this).removeClass("is-valid").addClass("is-invalid");
      flag_pType = false;
    }
  });
  $("#pStatus").on("change", function () {
    let pStatus = $(this).prop("checked");
    if (pStatus) {
      $("#pStatusText").text("目前狀態：展覽中");
    } else {
      $("#pStatusText").text("目前狀態：休養中");
    }
  });
  $(".pSite").on("change", function () {
    if ($(".pSite:checked").val() != undefined && $(".pSite:checked").val() != "其他") {
      // console.log($(".pSite:checked").val());
      $("#pSiteGroup").removeClass("is-invalid").addClass("is-valid");
      flag_pSite = true;
    } else if ($(".pSite:checked").val() == "其他") {
      if ($("#pSiteOther").val() == null || $("#pSiteOther").val().trim() == "") {
        $("#pSiteInv").text("請輸入其他場地名稱");
        $("#pSiteGroup").removeClass("is-valid").addClass("is-invalid");
        flag_pSite = false;
      }
      $("#pSiteOther").on("change", function () {
        if ($("#pSiteOther").val() != null && $("#pSiteOther").val().trim() != "") {
          $("#pSiteGroup").removeClass("is-invalid").addClass("is-valid");
          flag_pSite = true;
        } else {
          $("#pSiteInv").text("請輸入其他場地名稱");
          $("#pSiteGroup").removeClass("is-valid").addClass("is-invalid");
          flag_pSite = false;
        }
      });
    } else {
      $("#pSiteGroup").removeClass("is-valid").addClass("is-invalid");
      flag_pSite = false;
    }
  });

  //按鈕監聽btnSubmit
  $("#btnSubmit").on("click", function () {
    let pIntro = ($("#pIntro").val() == "" || $("#pIntro").val() == null) ? "暫無簡介" : $("#pIntro").val().trim();
    if (flag_pName && flag_pNumber && flag_pSize && flag_pType && flag_pSite) {
      let pSite = $(".pSite:checked").val() == "其他" ? $("#pSiteOther").val().trim() : $(".pSite:checked").val();

      let pAccArr = [];
      $(".pAcc:checked").each(function () {
        pAccArr.push($(this).val());
      });
      if (pAccArr.length == 0) {
        pAccArr.push("無需配件");
      }

      let pStatusText = $("#pStatus").prop("checked") ? "展覽中" : "休養中";

      let strHTML = `<table class="table border mt-3">
          <tr>
            <th class="col-2 text-end">名稱<th>
            <td class="col-10">${$("#pName").val().trim()}</td>
          </tr>
          <tr>
            <th class="col-2 text-end">數量<th>
            <td class="col-10">${Number($("#pNumber").val())}</td>
          </tr>
          <tr>
            <th class="col-2 text-end">體型<th>
            <td class="col-10">${$("#pSize").val().trim()}</td>
          </tr>
          <tr>
            <th class="col-2 text-end">類型<th>
            <td class="col-10">${$("#pType").val().trim()}</td>
          </tr>
          <tr>
            <th class="col-2 text-end">簡介<th>
            <td class="col-10">${pIntro}</td>
          </tr>
          <tr>
            <th class="col-2 text-end">使用場地<th>
            <td class="col-10">${pSite}</td>
          </tr>
          <tr>
            <th class="col-2 text-end">園區配件<th>
            <td class="col-10">${pAccArr.join("、")}</td>
          </tr>
          <tr>
            <th class="col-2 text-end">目前狀態<th>
            <td class="col-10">${pStatusText}</td>
          </tr>
          </table>`;

      $("#showMessageRow").removeClass("d-none");
      $("#showMessage").html(strHTML);

      //收集傳遞給後端的資料
      zooData = {
        pName: $("#pName").val().trim(),
        pNumber: Number($("#pNumber").val()),
        pSize: $("#pSize").val().trim(),
        pType: $("#pType").val().trim(),
        pIntro: pIntro,
        pSite: pSite,
        pAccArr: pAccArr.join("、"),
        pStatus: pStatusText,
        //時間戳記
        created_at: new Date().toLocaleString("zh-TW")
      }
      console.log(zooData);

      window.location.hash = "#showMessageRow";
    } else {
      let jump = "";
      if (!flag_pSite) {
        if ($(".pSite:checked").val() == "其他") {
          $("#pSiteInv").text("請輸入其他場地名稱");
        }
        $("#pSiteGroup").removeClass("is-valid").addClass("is-invalid");
        jump = "#pSiteGroup";
      }
      if (!flag_pType) {
        $("#pType").removeClass("is-valid").addClass("is-invalid");
        jump = "#pType";
      }
      if (!flag_pSize) {
        $("#pSize").removeClass("is-valid").addClass("is-invalid");
        jump = "#pSize";
      }
      if (!flag_pNumber) {
        $("#pNumber").removeClass("is-valid").addClass("is-invalid");
        jump = "#pNumber";
      }
      if (!flag_pName) {
        $("#pName").removeClass("is-valid").addClass("is-invalid");
        jump = "#pName";
      }
      window.location.hash = jump;
      Swal.fire({
        title: "警告",
        text: "有欄位錯誤，請修正",
        icon: "warning"
      });
    }
  });

  $("#btnSend").on("click", function () {
    // console.log("IAMIN");
    // axios
    //   .post('http://localhost:3000/zoo', zooData)
    //   .then(function (response) {
    //     console.log(response);
    //     Swal.fire({
    //       title: "資料新增成功",
    //       confirmButtonText: "確認",
    //       icon: "success"
    //     }).then((result) => {
    //       if (result.isConfirmed) location.reload();
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //     // always executed
    //   });
    Swal.fire({
      title: "資料新增成功",
      html: "<p>由於目前沒有連結的後端伺服器</p><p>更新及刪除功能不會實際生效</p><p>僅由畫面展示預估效果</p>",
      confirmButtonText: "確認",
      icon: "success"
    })
  });

  $("#btnCancel").on("click", function () {
    Swal.fire({
      title: "這動作會刪除現有的已輸入資料，確認刪除？",
      icon: "warning",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: "刪除",
      cancelButtonText: "返回"
    }).then((result) => {
      if (result.isDenied) location.reload();
    });
  });
  $("#btnCancel2").on("click", function () {
    Swal.fire({
      title: "這動作會刪除現有的已輸入資料，確認刪除？",
      icon: "warning",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: "刪除",
      cancelButtonText: "返回"
    }).then((result) => {
      if (result.isDenied) location.reload();
    });
  });
});