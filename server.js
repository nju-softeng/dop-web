const http = require("http");
// mock server
const server = new http.Server((req, resp) => {
  console.log(req.url);

  resp.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  });
  if (req.method.toLocaleLowerCase() === "post") {
    let res = {
      success: true,
      data: null,
    };
    if (req.url.includes("defect/get")) {
      res.data = new Array(30).fill(1).map((_, idx) => ({
        name: "Test name" + idx,
        project: "Test project" + idx,
        creattime: "2022-3-10 11：10",
      }));
    }
    if (req.url.includes("defect/add")) {
      res.data = new Array(30).fill(1).map((_, idx) => ({
        name: "Test name" + idx,
        id: "Test id" + idx,
      }));
    }
    if (req.url.includes("defect/run")) {
      res.data = new Array(30).fill(1).map((_, idx) => ({
        id: "XXX" + idx,
        defectCode: "XXX" + idx,
        defectLocation: "XXX" + idx,
      }));
    }
    if (req.url.includes("defect/getTrainData")) {
      res.data = new Array(30).fill(1).map((_, idx) => "XXX" + idx);
    }
    if (req.url.includes("defect/locate")) {
      res.data = new Array(30).fill(1).map((_, idx) => ({
        id: "XXX" + idx,
        defectgrade: "XXX" + idx,
        defectline: "XXX" + idx,
      }));
    }

    if (req.url.includes("defect/getPredictFile")) {
      res.data = new Array(30).fill(1).map((_, idx) => ({
        id: "XXX" + idx,
        name: "XXX" + idx + '.js',
        creatDate: "XXX" + idx,
      }));
    }

    if (req.url.includes("defect/deletePredictFile")) {
      res.data = [];
    }

    if (req.url.includes("defect/getLocateFile")) {
      res.data = new Array(30).fill(1).map((_, idx) => ({
        id: "XXX" + idx,
        name: "XXX" + idx,
        date: "XXX" + idx,
      }));
    }

    if (req.url.includes("defect/deleteLocateFile")) {
      res.data = [];
    }

    if (req.url.includes("fileContent")) {
      res.data = `const http = require("http");
      // mock server
      const server = new http.Server((req, resp) => {
        console.log(req.url);
      
        resp.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        });
        if (req.method.toLocaleLowerCase() === "post") {
          let res = {
            success: true,
            data: null,
          };
          if (req.url.includes("defect/get")) {
            res.data = new Array(30).fill(1).map((_, idx) => ({
              name: "Test name" + idx,
              project: "Test project" + idx,
              creattime: "2022-3-10 11：10",
            }));
          }
          if (req.url.includes("defect/add")) {
            res.data = new Array(30).fill(1).map((_, idx) => ({
              name: "Test name" + idx,
              id: "Test id" + idx,
            }));
          }
          if (req.url.includes("defect/run")) {
            res.data = new Array(30).fill(1).map((_, idx) => ({
              id: "XXX" + idx,
              defectCode: "XXX" + idx,
              defectLocation: "XXX" + idx,
            }));
          }
          if (req.url.includes("defect/locate")) {
            res.data = new Array(30).fill(1).map((_, idx) => ({
              id: "XXX" + idx,
              defectgrade: "XXX" + idx,
              defectline: "XXX" + idx,
            }));
          }
      
          if (req.url.includes("defect/getPredictFile")) {
            res.data = new Array(30).fill(1).map((_, idx) => ({
              id: "XXX" + idx,
              name: "XXX" + idx + '.js',
              creatDate: "XXX" + idx,
            }));
          }
      
          if (req.url.includes("defect/deletePredictFile")) {
            res.data = [];
          }
      
          if (req.url.includes("defect/getLocateFile")) {
            res.data = new Array(30).fill(1).map((_, idx) => ({
              id: "XXX" + idx,
              name: "XXX" + idx,
              date: "XXX" + idx,
            }));
          }
      
          if (req.url.includes("defect/deleteLocateFile")) {
            res.data = [];
          }
      
          if (req.url.includes("fileContent")) {
            res.data = '';
          }
          resp.write(JSON.stringify(res, null, 2));
        }
        resp.end();
      });
      
      server.listen(3002, () => {
        console.log("server is running at: 3002");
      });
      `;
    }
    resp.write(JSON.stringify(res, null, 2));
  }
  resp.end();
});

server.listen(3002, () => {
  console.log("server is running at: 3002");
});
