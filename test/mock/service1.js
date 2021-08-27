import http from "http";

export default (handleResponse) => {
  const url = "http://localhost:8060/api/service1";
  let body;
  http.get(url, (res) => {
    res.setEncoding("utf8");
    body = "";
    res.on("data", (data) => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      //console.log(body);
      handleResponse(body);
    });
  });
};
