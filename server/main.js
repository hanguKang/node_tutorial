let http = require("http");
let fs = require("fs");
let url = require("url");

let templateHTML = (title, list, description) => {
  let template = `<!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <h2>${title}</h2>
    ${description}
    </body>
    </html>
    `;
  return template;
};

let app = http.createServer(function (request, response) {
  let _url = request.url;
  // if(_url ==='/'){
  //   _url = './index.html';
  // }
  // if(_url === '/favicon.ico'){
  //   return response.writeHead(404);
  // }
  // response.writeHead(200);
  // respones.end(fs.readFileSync(__dirname + _url));

  //console.log(`request.url ===> ${_url}`);
  console.log(url.parse(_url, true)); //url객체로 {protocal, salshes,auth,host,port등.. }출력

  /* -------------------------------------------------------------------  */
  let queryData = url.parse(_url, true).query; //url.parse(urlStr[, parseQueryString][,slashesDenoteHost]) url객체를 만든다. url.format()의 반대, url.format(queryData)은 문자열을 만든다.
  //  url.resolve() ==> 상대 URL경로를 절대 URL경로로 변경한다.

  //console.log("query string : ", queryData);
  //console.log("query의 id :", queryData.id); //임의로 주소에 127.0.0.1:3000?id=HTML이라고 입력할 때 ?이후 id=HTML중 HTML을 출력한다.

  let title = queryData.id; //임의로 주소에 127.0.0.1:3000?id=HTML이라고 입력할 때 id 값
  let pathname = url.parse(_url, true).pathname; //url객체의 path는 '/쿼리스트링'을 의미하고 pathname은 쿼리스트링을 제외한 나머지 string을 의미한다.
  let datas = [];
  let list = "<ul>";

  let fileNames = fs.readdirSync("../data/", "utf-8"); // 동기 방식이다.
  console.log("fileNames : ", fileNames);

  fileNames.forEach((fileName) => {
    datas.push(fileName);
    list += `<li><a href="?id=${fileName}">${fileName}</a></li>`;
    //console.log(`목록 출력하기 ${datas}`);
  });
  list += "</ul>";
  console.log("datas : ", datas);
  console.log("list : ", list);

  if (pathname === "/") {
    //console.log(` 출력 index :  ${datas}`);

    //패쓰가 없는 경우 root로 접속했다면
    if (_url == "/") {
      // _url = "/index.html";
      // return;
      title = "Welcome";
    }
    if (_url == "/favicon.ico") {
      return response.writeHead(404);
    }
    if (queryData.id === undefined) {
      let title = "Welcome";
      let description = "Hello, Node.js";

      let template = templateHTML(title, list, description);
      //fs.readFile(`../data/${title}`, "utf8", function (err, data) {

      response.writeHead(200);
      response.end(template); //response.end : 서버에서 브라우저 사이의 connection을 끊는 시점을 명시, express에는 response.send, response.json이 있다고 한다. - response.end([data[, encoding]][, callback])
      //response.write : 서버가 브라우저에 response를 보내주는 역할만 하고, connection에는 영향을 미치지 않는다.
      //response.write()을 이용하면 response를 여러 번에 걸쳐 계속 보내줄 수 있으며, 모든 response를 다 보낸 후에는 response.end()를 써서 종료시점을 명시해 줘야 한다.
      //}); //fs.readFile End
    } else {
      fs.readFile(`../data/${title}`, "utf8", function (err, data) {
        //reaFileSync는 전달인자로 callback함수를 전달할 수 없다.
        //reaFileSync는 동기적으로 readFile은 비동기적으로 작동 readFile은 readdir과 달리 callback함수에 인자로 하나의 파일만 전달한다.
        console.log(` 출력 목록 :  ${datas}`);
        if (err) throw err;
        console.log(title);
        console.log(data);
        let template = templateHTML(title, list, data);
        response.writeHead(200);
        response.end(template);
      }); //fs.readFile End
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }

  /*
    let template = `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
      <img src="coding.jpg" width="100%">
      </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
      </p>
    </body>
    </html>
    
    `;
    //response.end(fs.readFileSync(__dirname + _url));
    response.end( template );
    */
});
app.listen(3000);

//sudo pm2 start main.js --watch  프로세스 메니저로
//프로그램을 실행하고 중간에 멈추면 다시 실행시키거나 할 수 있다.
//main.js를 pm2로 실행시킨 후에 활성상태 창에서 main.js를 중단시켜도 pm2가 다시 실행시킨다. / 소스코드를 변경시키면 main.js를 다시 시작시킨다. - 브라우저를 새로고침하면 다시 시작된 결과를 볼 수 있게 된다.
//1. pm2 start 파일명
//2. pm2 stop 파일명
//3. pm2 restart 파일명
//4. pm2 delete 파일명
//5. pm2 list  ==> pm2에 의해서 실행중인 목록 보여주기
//   pm2 status
//6. pm2 log --> start이후에 코드 수정 중에 error가 있으면 그 내용을 보여준다.
//   pm2 logs
//7. pm2 log [프로세스 아이디]
//   pm2 log 0
//   pm2 log 1
//   pm2 log 2
//8. pm2 monit
