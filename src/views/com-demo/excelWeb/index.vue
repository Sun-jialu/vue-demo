<template>
  <div class="m-">
    <div>
      <button type="button" @click="method('stat')">导出Excel</button>
    </div>
    <div>
      <table id="stat" style="width: 100%; table-layout: fixed">
        <tr style="border: 1px solid #000">
          <td colspan="2" align="center">html 表格导出</td>
        </tr>
        <tr>
          <td>列标题1</td>
          <td>列标题2</td>
        </tr>
        <tr>
          <td>a</td>
          <td>b</td>
        </tr>
        <tr>
          <td>A</td>
          <td>B</td>
        </tr>
        <tr>
          <td>C</td>
          <td>D</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
//非IE浏览器导出Excel
var HtmlExportToExcelForEntire = (function () {
  var uri = "data:application/vnd.ms-excel;base64,",
    //两个template慢慢模板
    // template =
    //   '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' +
    //   "<head>" +
    //   '<meta charset="UTF-8">' +
    //   "</head>" +
    //   "<body>" +
    //   '<table border="1">{table}</table>' +
    //   "</body>" +
    //   "</html>",

    template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
      'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>' +
      "<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>" +
      "</x:ExcelWorkbook></xml><![endif]-->" +
      ' <style type="text/css">' +
      ".excelTable  {" +
      "border-collapse:collapse;" +
      " border:thin solid #999; " +
      "}" +
      "   .excelTable  th {" +
      "   border: thin solid #999;" +
      "  padding:20px;" +
      "  text-align: center;" +
      "  border-top: thin solid #999;" +
      " background-color: #E6E6E6;" +
      " }" +
      " .excelTable  td{" +
      " border:thin solid #999;" +
      "  padding:2px 5px;" +
      "  text-align: center;" +
      " }</style>" +
      '</head><body ><table class="excelTable">{table}</table></body></html>',
    base64 = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    },
    format = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      });
    };
  return function (table, name) {
    if (!table.nodeType) {
      table = document.getElementById(table);
    }
    var ctx = {
      worksheet: name || "Worksheet",
      table: table.innerHTML,
    };
    // window.location.href = uri + base64(format(template, ctx));
    // window.location.download = name + ".xls";

    const url =  uri + base64(format(template, ctx));
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute(
          'download',
          "导入学生账号模板"
        )
        document.body.appendChild(link)
        link.click()
    // window.location.click();
  };
})();
export default {
  data() {
    return {};
  },
  methods: {
    //jQuery HTML导出Excel文件(兼容IE及所有浏览器)
    method(tableid) {
      var filename = "导出文件名";
      if (this.getExplorer() == "ie" || this.getExplorer() == undefined) {
        this.HtmlExportToExcelForIE(tableid, filename);
      } else {
        HtmlExportToExcelForEntire(tableid, filename);
      }
    },
    //IE浏览器导出Excel
    HtmlExportToExcelForIE(tableid, filename) {
      try {
        var curTbl = document.getElementById(tableid);
        var oXL;
        try {
          oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel
        } catch (e) {
          alert(
            "无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，" +
              "那么请调整IE的安全级别。\n\n具体操作：\n\n" +
              "工具 → Internet选项 → 安全 → 自定义级别 → 对未标记为可安全执行脚本的ActiveX初始化并脚本运行 → 启用"
          );
          return false;
        }
        var oWB = oXL.Workbooks.Add(); //获取workbook对象
        var oSheet = oWB.ActiveSheet; //激活当前sheet
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl); //把表格中的内容移到TextRange中
        try {
          sel.select(); //全选TextRange中内容
        } catch (e1) {
          e1.description;
        }
        sel.execCommand("Copy"); //复制TextRange中内容
        oSheet.Paste(); //粘贴到活动的EXCEL中
        oXL.Visible = true; //设置excel可见属性
        var fname = oXL.Application.GetSaveAsFilename(
          filename + ".xls",
          "Excel Spreadsheets (*.xls), *.xls"
        );
        oWB.SaveAs(fname);
        oWB.Close();
        oXL.Quit();
      } catch (e) {
        alert(e.description);
      }
    },
    getExplorer() {
      var explorer = window.navigator.userAgent;
      //ie
      if (explorer.indexOf("MSIE") >= 0) {
        return "ie";
      }
      //firefox
      else if (explorer.indexOf("Firefox") >= 0) {
        return "Firefox";
      }
      //Chrome
      else if (explorer.indexOf("Chrome") >= 0) {
        return "Chrome";
      }
      //Opera
      else if (explorer.indexOf("Opera") >= 0) {
        return "Opera";
      }
      //Safari
      else if (explorer.indexOf("Safari") >= 0) {
        return "Safari";
      }
    },
  },
};
</script>
<style lang="scss">
#stat {
  border: 1px solid #000;
  border-collapse: collapse;
}
#stat th,
#stat td {
  border: 1px solid #000;
  border-collapse: collapse;
}
</style>