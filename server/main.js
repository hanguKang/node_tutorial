
let http = require('http');
let fs = require('fs');
let url = require('url');
let  app = http.createServer(function(request,response){
    
    let _url = request.url;
    console.log(`request.url ===> ${_url}`);
    let queryData = url.parse(_url, true).query;
    console.log("출력하기");
    console.log(queryData.id);

    let title = queryData.id;

    console.log(url.parse(_url, true));
    let pathname = url.parse(_url, true).pathname;
  
    let datas = [];
    fs.readdir('../data/', (err, files) => {
      files.forEach(file => {
        datas.push(file);
        console.log(`목록 출력하기 ${ datas }`);
      });
    });
 
    console.log(` 출력 최초 :  ${datas}` ) ;

    if(pathname === '/'){
      console.log(` 출력 index :  ${datas}` ) ;
          // if(_url == '/'){
          //     _url = '/index.html';
          //     return;
          // }
          // if(_url == '/favicon.ico'){
          //     return response.writeHead(404);
          // }
          if(queryData.id === undefined){
            let title = 'Welcome';
            let descrption = 'Hello, Node.js';
            
            fs.readFile(`../data/${title}`, 'utf8',function(err, data){
              let template = `<!doctype html>
              <html>
              <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
              </head>
              <body>
                <h1><a href="/">WEB</a></h1>
                <ol>
                  
                </ol>
                <h2>${title}</h2>
                ${descrption}
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end( template );
      
            }); //fs.readFile End
          }else{
            fs.readFile(`../data/${title}`, 'utf8',function(err, data){
              console.log(` 출력 목록 :  ${datas}` ) ;
              if(err) throw err;
              console.log(title);
              console.log(data);
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
                   
                  </ol>
                  <h2>${title}</h2>
                  ${data}
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end( template );
      
            }); //fs.readFile End
          }

          
    }else{
      response.writeHead(404);
      response.end('Not found');
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