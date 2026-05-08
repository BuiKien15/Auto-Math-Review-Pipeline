function taoDocsTuDong(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  
  if (range.getColumn() == 1 && range.getRow() > 1) {
    var rawText = range.getValue();
    if (!rawText || rawText.toString().trim() === "") return;
    
    // Đổi màu để nhận diện bản code chuẩn xác nhất
    range.setBackground("#d9ead3"); 
    
    try {
      var chunks = rawText.toString().split("===CUT_HERE===");
      var outputNames = []; 
      var outputLinks = []; 
      
      for (var i = 0; i < chunks.length; i++) {
        var chunk = chunks[i].trim();
        if (!chunk) continue;
        
        // --- 1. DIỆT CITE TRƯỚC KHI XỬ LÝ ---
        chunk = chunk.replace(/\[cite[^\]]*\]/gi, ""); 

        var startIndex = chunk.indexOf('{');
        var endIndex = chunk.lastIndexOf('}');
        if (startIndex === -1 || endIndex === -1) continue;
        
        var jsonStr = chunk.substring(startIndex, endIndex + 1);
        jsonStr = jsonStr.replace(/\u00A0/g, " ").replace(/[\u201C\u201D]/g, '"').replace(/,\s*([\}\]])/g, "$1");

        var data;
        try { 
          data = JSON.parse(jsonStr); 
        } catch(err) { 
          try {
            var fixed = jsonStr.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
            data = JSON.parse(fixed);
          } catch(err2) {
            continue; 
          }
        } 
        
        var tenFile = data.ten_file || "File_Khong_Ten";
        var originalName = String(tenFile).replace(/\.pdf$/i, "").trim();
        var fileName = "Review_" + originalName;
        
        var doc = DocumentApp.create(fileName);
        var body = doc.getBody();
        body.setMarginLeft(50).setMarginRight(50);
        
        // Hàm dọn dẹp và định dạng văn bản
        var clean = function(txt) { return String(txt || "").replace(/\[cite[^\]]*\]/gi, "").trim(); };

        // HEADER
        body.appendParagraph("BÁO CÁO THẨM ĐỊNH TÀI LIỆU TOÁN HỌC").setHeading(DocumentApp.ParagraphHeading.HEADING1).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
        body.appendParagraph("PHẦN A: CHI TIẾT LỖI & ĐỀ XUẤT SỬA ĐỔI").setHeading(DocumentApp.ParagraphHeading.HEADING2).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
        
        var table = body.appendTable();
        var header = table.appendTableRow();
        header.appendTableCell("Vị trí").setBackgroundColor("#f3f3f3");
        header.appendTableCell("Vấn đề phát hiện").setBackgroundColor("#f3f3f3");
        header.appendTableCell("Lý do & Căn cứ").setBackgroundColor("#f3f3f3");
        header.appendTableCell("Đề xuất sửa đổi").setBackgroundColor("#f3f3f3");
        
        for(var c=0; c<4; c++) {
          var hp = header.getCell(c).getChild(0).asParagraph();
          hp.editAsText().setBold(true);
          hp.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
        }
        
        // --- ĐỔ DATA PHẦN A (ÉP KHÔNG IN ĐẬM) ---
        if (data.phan_A && Array.isArray(data.phan_A)) {
          data.phan_A.forEach(function(row) {
            var tr = table.appendTableRow();
            tr.appendTableCell(clean(row.vi_tri)).editAsText().setBold(false);
            tr.appendTableCell(clean(row.van_de)).editAsText().setBold(false);
            tr.appendTableCell(clean(row.ly_do)).editAsText().setBold(false);
            tr.appendTableCell(clean(row.de_xuat)).editAsText().setBold(false);
          });
        }
        
        table.setColumnWidth(0, 70); table.setColumnWidth(1, 110); table.setColumnWidth(2, 135); table.setColumnWidth(3, 135); 
        
        body.appendParagraph("").setSpacingBefore(15);
        body.appendParagraph("PHẦN B: GÓC NHÌN CHUYÊN GIA & GỢI Ý NÂNG CẤP").setHeading(DocumentApp.ParagraphHeading.HEADING2).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
        
        // --- ĐỔ DATA PHẦN B (CHỈ IN ĐẬM NHÃN) ---
        if (data.phan_B && Array.isArray(data.phan_B)) {
          data.phan_B.forEach(function(item) {
             var label = clean(item.nhan);
             var content = clean(item.noi_dung);
             var fullText = (label ? label + " " : "") + content;
             
             var li = body.appendListItem(fullText);
             li.setGlyphType(DocumentApp.GlyphType.BULLET).setSpacingAfter(10);
             
             // Reset về không in đậm trước
             li.editAsText().setBold(false);
             // Chỉ in đậm phần Nhãn (ví dụ: "Nâng cấp Toán thực tế:")
             if (label.length > 0) {
                li.editAsText().setBold(0, label.length - 1, true);
             }
          });
        }
        
        DriveApp.getFileById(doc.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        outputNames.push([originalName]);
        outputLinks.push([SpreadsheetApp.newRichTextValue().setText(fileName).setLinkUrl(doc.getUrl()).build()]); 
      }
      
      if (outputNames.length > 0) {
         sheet.getRange(range.getRow(), 1, outputNames.length, 1).setValues(outputNames).setBackground("#ffffff");
         sheet.getRange(range.getRow(), 2, outputLinks.length, 1).setRichTextValues(outputLinks);
         SpreadsheetApp.getActiveSpreadsheet().toast("✅ Đã xử lý xong xuôi, sạch đẹp rồi bác ơi!");
      }
    } catch (error) {
      range.setValue("❌ Lỗi hệ thống: " + error.toString()).setBackground("#ea9999");
    }
  }
}
