const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");
const { tryCatch } = require("../Utils/tryCatchController");

exports.htmltopdf = tryCatch(async (req, res, next) => {
  try {
    const timestamps = Date.now();
    const date = new Date(timestamps);

    const template = path.join(__dirname, "../views/invoice.ejs");
    const html = await ejs.renderFile(template, {
      data: await req.body.data,
      res: await req.body.res,
      cashier: await req.body.cashier,
      address: await req.body.address,
      time: `( ${
        date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
      }:${date.getMinutes().toString().padStart(2, "0")} ${
        date.getHours() >= 12 ? "PM" : "AM"
      } )`,
    });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A6" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="invoice.pdf"');

    res.send(pdfBuffer);

    await browser.close();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }
});
