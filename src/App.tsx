import React from "react";
import "./App.css";
import { Button } from "@mui/material";
function App() {
  function SendRequest() {
    var http = new XMLHttpRequest();
    // get a callback when the server responds
    http.addEventListener("load", () => {
     const element = document.getElementById('TopicsField');
     element!.innerHTML=http.responseText;
    });
    // open the request with the verb and the url
    http.open("POST", "https://httpbin.org/anything");
    // send the request
    let params = {
     subject: '',
     body: '',
   };
    const Subject = document.getElementById('SubjectField') as HTMLTextAreaElement;
    if(Subject)
      params['subject'] = Subject.value;
    const Body = document.getElementById('BodyField') as HTMLTextAreaElement;
    if(Body)
      params["body"] = Body.value;
    http.send(JSON.stringify(params));
    console.log("I have been pressed");
    console.log(http.responseText);
  }

  return (
    <body className="App h-screen w-screen p-14">
      <div className="w-full h-full flex flex-row justify-evenly gap-10">
        <div className="flex-col w-2/3 h-full gap-28 flex">
          <div className="bg-slate-200 opacity-30 h-16 border-black border-4">
            <textarea
              id="SubjectField"
              placeholder="Subject..."
              className="w-full h-14 min-h-14 max-h-14 text-2xl font-semibold align-middle"
            />
          </div>
          <div className="h-2/3 bg-slate-200 opacity-30 border-black border-4">
            <textarea
              id="BodyField"
              placeholder="Email body..."
              className="w-full h-full max-h-full min-h-full text-lg font-semibold"
            />
          </div>
        </div>

        <div className="flex flex-col gap-28">
          <div className="flex flex-row">
            <div className=" w-16 h-16 border-solid border-4 border-black bg-slate-200 opacity-30 text-center flex justify-center align-middle flex-col">
              <p>1</p>
            </div>
            <div className=" w-16 h-16 border-solid border-4 border-black bg-slate-200 opacity-30 text-center flex justify-center align-middle flex-col">
              <p>2</p>
            </div>
            <div className=" w-16 h-16 border-solid border-4 border-black bg-slate-200 opacity-30 text-center flex justify-center align-middle flex-col">
              <p>3</p>
            </div>
            <div className=" w-16 h-16 border-solid border-4 border-black bg-slate-200 opacity-30 text-center flex justify-center align-middle flex-col">
              <p>4</p>
            </div>
            <div className=" w-16 h-16 border-solid border-4 border-black bg-slate-200 opacity-30 text-center flex justify-center align-middle flex-col">
              <p>5</p>
            </div>
          </div>
          <div className="h-1/3">
            <p
              id="TopicsField"
              className="
               text-gray-500
               bg-slate-200
               opacity-30
               border-4
               border-black
               h-full
               font-semibold
               w-[20rem]"
            >
              Topics
            </p>
          </div>
          <div>
            <Button
              variant="contained"
              className="w-full"
              onClick={() => SendRequest()}
            >
              Send email
            </Button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
