$(function () {
  let cleanData = []
  let currentPage = 1;
  let totalPage = 0;
  let pageSize = Number($("#pageSize").val());

  let uid = "";

  let flag_pName = true;
  let flag_pNumber = true;
  let flag_pSize = true;
  let flag_pType = true;
  let flag_pSite = true;
  let zooData = {};
  //取得資料
  // axios
  //   .get('http://localhost:3000/zoo')
  //   .then(function (response) {
  //     // console.log(response.data);
  //     //清洗資料
  //     cleanData = response.data.map(function (item, index) {
  //       return {
  //         pName: (item.pName ?? "資料損毀，請連絡相關單位").trim() == "" ? "資料損毀，請連絡相關單位" : (item.pName ?? "資料損毀，請連絡相關單位").trim(),
  //         pNumber: Number(item.pNumber ?? 0) == 0 ? "資料損毀，請連絡相關單位" : Number(item.pNumber),
  //         pSize: (item.pSize ?? "資料損毀，請連絡相關單位").trim() == "" ? "資料損毀，請連絡相關單位" : (item.pSize ?? "資料損毀，請連絡相關單位").trim(),
  //         pType: (item.pType ?? "資料損毀，請連絡相關單位").trim() == "" ? "資料損毀，請連絡相關單位" : (item.pType ?? "資料損毀，請連絡相關單位").trim(),
  //         pIntro: (item.pIntro ?? "資料損毀，請連絡相關單位").trim() == "" ? "資料損毀，請連絡相關單位" : (item.pIntro ?? "資料損毀，請連絡相關單位").trim(),
  //         pSite: (item.pSite ?? "資料損毀，請連絡相關單位").trim() == "" ? "資料損毀，請連絡相關單位" : (item.pSite ?? "資料損毀，請連絡相關單位").trim(),
  //         pAccArr: (item.pAccArr ?? "資料損毀，請連絡相關單位").trim() == "" ? "資料損毀，請連絡相關單位" : (item.pAccArr ?? "資料損毀，請連絡相關單位").trim(),
  //         pStatus: (item.pStatus ?? "資料損毀，請連絡相關單位").trim() == "" ? "資料損毀，請連絡相關單位" : (item.pStatus ?? "資料損毀，請連絡相關單位").trim(),
  //         created_at: item.created_at.trim(),
  //         id: item.id
  //       }
  //     });
  //     // console.log(cleanData);
  //     //輸出
  //     totalPage = Math.ceil(cleanData.length / pageSize);
  //     renderTable();
  //     renderPagination();
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  //   .finally(function () {
  //     // always executed
  //   });

  $.ajax({
    url: "js/zoo_db.json",
    type: "GET",
    dataType: "json",
    success: function (response) {

      // 清洗資料
      cleanData = response.map(function (item, index) {
        return {
          pName: (item.pName ?? "資料損毀，請連絡相關單位").trim() === ""
            ? "資料損毀，請連絡相關單位"
            : (item.pName ?? "資料損毀，請連絡相關單位").trim(),

          pNumber: Number(item.pNumber ?? 0) === 0
            ? "資料損毀，請連絡相關單位"
            : Number(item.pNumber),

          pSize: (item.pSize ?? "資料損毀，請連絡相關單位").trim() === ""
            ? "資料損毀，請連絡相關單位"
            : (item.pSize ?? "資料損毀，請連絡相關單位").trim(),

          pType: (item.pType ?? "資料損毀，請連絡相關單位").trim() === ""
            ? "資料損毀，請連絡相關單位"
            : (item.pType ?? "資料損毀，請連絡相關單位").trim(),

          pIntro: (item.pIntro ?? "資料損毀，請連絡相關單位").trim() === ""
            ? "資料損毀，請連絡相關單位"
            : (item.pIntro ?? "資料損毀，請連絡相關單位").trim(),

          pSite: (item.pSite ?? "資料損毀，請連絡相關單位").trim() === ""
            ? "資料損毀，請連絡相關單位"
            : (item.pSite ?? "資料損毀，請連絡相關單位").trim(),

          pAccArr: (item.pAccArr ?? "資料損毀，請連絡相關單位").trim() === ""
            ? "資料損毀，請連絡相關單位"
            : (item.pAccArr ?? "資料損毀，請連絡相關單位").trim(),

          pStatus: (item.pStatus ?? "資料損毀，請連絡相關單位").trim() === ""
            ? "資料損毀，請連絡相關單位"
            : (item.pStatus ?? "資料損毀，請連絡相關單位").trim(),

          created_at: (item.created_at ?? "").trim(),
          id: item.id
        };
      });

      // 輸出
      totalPage = Math.ceil(cleanData.length / pageSize);

      renderTable();
      renderPagination();
    },

    error: function (xhr, status, error) {
      console.log(error);
    },

    complete: function () {
      // always executed
    }
  });

  //監聽頁碼
  $("#pagi").on("click", ".page-item", function () {
    // console.log($(this).data("page"));
    let page = Number($(this).data("page"));
    if (page < 1 || page > totalPage) return;
    currentPage = page;
    renderTable();
    renderPagination();
  });

  $("#pageSize").on("change", function () {
    // console.log($(this).val());
    currentPage = 1;
    pageSize = Number($(this).val());
    totalPage = Math.ceil(cleanData.length / pageSize);
    renderTable();
    renderPagination();
  });

  //監聽更新按鈕
  $("#tbodyContent").on("click", ".updateBtn", function () {
    uid = $(this).data("id");
    let thisData = cleanData.find(function (item) {
      return item.id == uid;
    });
    // console.log(thisData);
    $("#pName").val(thisData.pName);
    $("#pNumber").val(thisData.pNumber);
    $("#pSize").val(thisData.pSize);
    $("#pType").val(thisData.pType);
    $("#pIntro").html(thisData.pIntro);
    pSiteArr = ["室外", "室內", "水族箱", "恆溫箱"];
    $(".pSite").each(function (index) {
      if ($(this).val() == thisData.pSite) {
        $(this).prop('checked', true);
      } else if ($(this).val() == "其他" && $.inArray(thisData.pSite, pSiteArr) == -1 && thisData.pSite != "") {
        $(this).prop('checked', true);
        $("#pSiteOther").val(thisData.pSite);
      } else {
        $(this).prop('checked', false);
      }
    });
    pAccArr = thisData.pAccArr.split("、");
    $(".pAcc").each(function (index) {
      if (($.inArray($(this).val(), pAccArr) != -1)) {
        $(this).prop('checked', true);
      } else {
        $(this).prop('checked', false);
      }
    });
    if (thisData.pStatus == "展覽中") {
      $("#pStatus").prop('checked', true);
      $("#pStatusText").text("目前狀態：展覽中");
    }
    else {
      $("#pStatus").prop('checked', false);
      $("#pStatusText").text("目前狀態：休養中");
    }
  })

  //監聽更新視窗
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

  //確認更新
  $("#updateConfirmBtn").on("click", function () {
    // console.log(uid);
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

      //收集傳遞給後端的資料
      zooData = {
        pName: $("#pName").val().trim(),
        pNumber: Number($("#pNumber").val()),
        pSize: $("#pSize").val().trim(),
        pType: $("#pType").val().trim(),
        pIntro: pIntro,
        pSite: pSite,
        pAccArr: pAccArr.join("、"),
        pStatus: pStatusText
      }
      // console.log(zooData);
      // 由於目前沒有連結的後端伺服器，更新及刪除功能不會實際生效，僅由畫面展示預覽效果
      // axios
      //   .patch(`http://localhost:3000/zoo/${uid}`, zooData)
      //   .then(function (response) {
      //     console.log(response);
      //     Swal.fire({
      //       title: "資料更新成功",
      //       confirmButtonText: "確認",
      //       icon: "success"
      //     }).then((result) => {
      //       if (result.isConfirmed && response.status == 200) {
      //         //更新完成後直接更改cleanData內的資料後重新渲染，並未重整網頁
      //         let updateItem = cleanData.find(function (item) {
      //           return item.id == uid;
      //         });
      //         if (updateItem) {
      //           updateItem.pName = zooData.pName
      //           updateItem.pNumber = zooData.pNumber
      //           updateItem.pSize = zooData.pSize
      //           updateItem.pIntro = zooData.pIntro
      //           updateItem.pSite = zooData.pSite
      //           updateItem.pAccArr = zooData.pAccArr
      //           updateItem.pStatus = zooData.pStatus
      //         }
      //         renderTable();
      //         //關閉 modal
      //         let modal = bootstrap.Modal.getInstance($("#updateModal"));
      //         modal.hide();
      //       }
      //     });
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   })
      //   .finally(function () {
      //     // always executed
      //   });
      Swal.fire({
        title: "資料更新成功",
        html: "<p>由於目前沒有連結的後端伺服器</p><p>更新及刪除功能不會實際生效</p><p>僅由畫面展示預估效果</p>",
        confirmButtonText: "確認",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          //更新完成後直接更改cleanData內的資料後重新渲染，並未重整網頁
          let updateItem = cleanData.find(function (item) {
            return item.id == uid;
          });
          if (updateItem) {
            updateItem.pName = zooData.pName
            updateItem.pNumber = zooData.pNumber
            updateItem.pSize = zooData.pSize
            updateItem.pIntro = zooData.pIntro
            updateItem.pSite = zooData.pSite
            updateItem.pAccArr = zooData.pAccArr
            updateItem.pStatus = zooData.pStatus
          }
          renderTable();
          //關閉 modal
          let modal = bootstrap.Modal.getInstance($("#updateModal"));
          modal.hide();
        }
      });
    }
    else {
      if (!flag_pSite) {
        if ($(".pSite:checked").val() == "其他") {
          $("#pSiteInv").text("請輸入其他場地名稱");
        }
        $("#pSiteGroup").removeClass("is-valid").addClass("is-invalid");
      }
      if (!flag_pType) {
        $("#pType").removeClass("is-valid").addClass("is-invalid");
      }
      if (!flag_pSize) {
        $("#pSize").removeClass("is-valid").addClass("is-invalid");
      }
      if (!flag_pNumber) {
        $("#pNumber").removeClass("is-valid").addClass("is-invalid");
      }
      if (!flag_pName) {
        $("#pName").removeClass("is-valid").addClass("is-invalid");
      }
      Swal.fire({
        title: "警告",
        text: "有欄位錯誤，請修正",
        icon: "warning"
      });
    }
  });

  //監聽刪除按鈕
  $("#tbodyContent").on("click", ".deleteBtn", function () {
    // console.log($(this).data("id"));
    let did = $(this).data("id");
    let pName = $(this).data("pname");
    Swal.fire({
      title: "確認刪除？",
      text: `即將刪除 ${pName} 的資料`,
      showConfirmButton: false,
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: "刪除",
      cancelButtonText: "取消",
      icon: "warning"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        // axios
        //   .delete(`http://localhost:3000/zoo/${did}`)
        //   .then(function (response) {
        //     console.log(response);
        //     if (response.status == 200) {
        //       cleanData = cleanData.filter(function (item) {
        //         return item.id != did;
        //       });
        //       totalPage = Math.ceil(cleanData.length / pageSize);
        //       if (currentPage > totalPage) currentPage = totalPage;
        //       if (currentPage < 1) currentPage = 1;
        //       renderTable();
        //       renderPagination();
        //       Swal.fire("資料已刪除", "", "success");
        //     }
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   })
        //   .finally(function () {
        //     // always executed
        //   });
        cleanData = cleanData.filter(function (item) {
          return item.id != did;
        });
        totalPage = Math.ceil(cleanData.length / pageSize);
        if (currentPage > totalPage) currentPage = totalPage;
        if (currentPage < 1) currentPage = 1;
        renderTable();
        renderPagination();
        Swal.fire({
          title: "資料已刪除",
          html: "<p>由於目前沒有連結的後端伺服器</p><p>更新及刪除功能不會實際生效</p><p>僅由畫面展示預估效果</p>",
          confirmButtonText: "確認",
          icon: "success"
        })
      }
    });
  });

  function renderTable() {
    //過濾
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    let pageData = cleanData.slice(start, end);
    //渲染
    $('#tbodyContent').empty();
    pageData.forEach(function (item) {
      let strHTML = `<tr>
              <td>${item.pName}</td>
              <td>${item.pNumber}</td>
              <td>${item.pSize}</td>
              <td>${item.pType}</td>
              <td>${item.pIntro}</td>
              <td>${item.pSite}</td>
              <td>${item.pAccArr}</td>
              <td>${item.pStatus}</td>
              <td>${item.created_at}</td>
              <td>
                <button type="button" class="updateBtn btn btn-sm btn-warning mt-0 me-1 me-lg-0 col-2 col-lg-12" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="${item.id}">更新</button>
                <button  type="button" class="deleteBtn btn btn-sm btn-danger mt-0 mt-lg-1 me-1 me-lg-0 col-2 col-lg-12" data-id="${item.id}" data-pname="${item.pName}">刪除</button>
              </td>
            </tr>`;
      $('#tbodyContent').append(strHTML);
    });
  }
  function renderPagination() {
    $('#pagi').empty();
    let strHTML = `<li class="page-item ${currentPage == 1 ? "disabled" : ""}" data-page="${"1"}"><a class="page-link" href="#"><i class="fa-solid fa-angles-left"></i></a></li>
            <li class="page-item ${currentPage == 1 ? "disabled" : ""}" data-page="${currentPage - 1}"><a class="page-link" href="#"}><i class="fa-solid fa-angle-left"></i></a></li>`;
    for (let i = 1; i <= totalPage; i++) {
      strHTML += `<li class="page-item ${i == currentPage ? "active" : ""}" data-page="${i}"><a class="page-link" href="#">${i}</a></li>`;
    }
    strHTML += `<li class="page-item ${currentPage == totalPage ? "disabled" : ""}" data-page="${currentPage + 1}"><a class="page-link" href="#"><i class="fa-solid fa-angle-right"></i></a></li>
            <li class="page-item ${currentPage == totalPage ? "disabled" : ""}" data-page="${totalPage}"><a class="page-link" href="#"><i class="fa-solid fa-angles-right"></i></a></li>`;
    $("#pagi").append(strHTML);
  }
});