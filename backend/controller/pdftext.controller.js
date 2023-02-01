const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const db = require("../model");

const PdfText = db.pdf;

//posting data
const storage = multer.diskStorage({
  destination: "../testing",
  filename: function(req, file, cb) {
    cb(
      null,
      new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds() +
        " " +
        file.originalname
    );
  },
});

const upload = multer({ storage: storage }).single("file");
console.log("Upload info", upload);

exports.create = (req, res) => {
  upload(req, res, (err) => {
    console.log("REQUESTS", req.file);
    if (err) {
      res.send(err);
    } 
    else {
    //   res.send({
    //     data: req.file,
    //     message: "save successfully",
    //   });
      //pdf
    //   const pdfRead = "./testing/16:35:42 Echo-CR-12-Form.pdf";
      const pdfRead = req.file.path;


      getPDF(pdfRead);

      // const folder = './testing/'

      // fs.readdir(folder, (err, files) => {
      //     if (err) throw console.log(err);

      //     for (const file of files) {
      //         console.log(file + ': File Deleted Successfully');
      //         fs.unlinkSync(folder+file);
      //     }
      // });
    }
  });

  const getPDF = async (file) => {
    let readFileSync = fs.readFileSync(file);
    try {
      let pdfExtract = await pdfParse(readFileSync);
    //   console.log("File content Uploaded: ", pdfExtract.text);
    //   console.log(pdfExtract.text.slice(6, 18));
    //   console.log(pdfExtract.text.slice(107, 146));
    //   console.log(pdfExtract.text.slice(809, 820));
    //   console.log(pdfExtract.text.slice(485, 505));
    //   console.log(pdfExtract.text.slice(526, 540));
    //   console.log(pdfExtract.text.slice(540, 545));
    //   console.log(pdfExtract.text.slice(556, 563));
    //   console.log(pdfExtract.text.slice(563, 586));
    //   console.log(pdfExtract.text.slice(606, 619));
    //   console.log(pdfExtract.text.slice(619, 625));
    //   console.log(pdfExtract.text.slice(634, 642));
    //   console.log(pdfExtract.text.slice(670, 780));

      const pdfData = {
        serial_number: pdfExtract.text.slice(6, 18),
        company_name: pdfExtract.text.slice(107, 146),
        company_registration_date: pdfExtract.text.slice(809, 820),
        names: pdfExtract.text.slice(485, 505),
        address: pdfExtract.text.slice(526, 540),
        nationality: pdfExtract.text.slice(540, 545),
        shares: pdfExtract.text.slice(556, 563),
        names2: pdfExtract.text.slice(563, 586),
        address2: pdfExtract.text.slice(606, 619),
        nationality2: pdfExtract.text.slice(619, 625),
        shares2: pdfExtract.text.slice(634, 642),
        description: pdfExtract.text.slice(670, 780),
      };

      //   console.log('Total pages: ', pdfExtract.numpages)
      //   console.log('All content: ', pdfExtract.info)

      console.log("DATA TO SAVE", pdfData);

      PdfText.findOne({
        where: { serial_number: pdfData.serial_number },
      })
        .then((serial_numberExists) => {
          if (!serial_numberExists) {
            PdfText.create(pdfData)
              .then((data) => {
                res.status(200).send({
                  data: pdfData,
                  message: 'Data Submitted successfully'
                });
              })
              .catch((err) => {
                res.send({
                  message: err.message,
                });
              });
          } else {
            res.send({
              message: "Serial Number Exists",
            });
          }
        })
        .catch((err) => {
          res.send({ message: err.message });
        });
    } catch (error) {
      throw new Error(error);
    }
  };
};
