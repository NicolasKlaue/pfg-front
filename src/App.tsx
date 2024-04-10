import React from "react";
import "./App.css";
import { Button } from "@mui/material";
import axios from 'axios';

function App() {
     const colors: { [key: number]: string } = {
          0: 'bg-green-900',
          1: 'bg-lime-900',
          2: 'bg-yellow-900',
          3: 'bg-orange-900',
          4: 'bg-red-900',
          };

        function SendRequest() {
          const topicsField = document.getElementById('TopicsField');
          const urgencyField = document.getElementById('UrgencyField');
          const Subject = document.getElementById('SubjectField') as HTMLTextAreaElement;
          const Body = document.getElementById('BodyField') as HTMLTextAreaElement;
          const Spinner = document.getElementById('Spinner');
          Spinner?.classList.add('block');
          Spinner?.classList.remove('hidden');
          if (!topicsField || !urgencyField || !Subject || !Body) {
            console.error('One or more required fields not found.');
            return;
          }
        
          const params = {
            Subject: Subject.value,
            Body: Body.value,
          };
          
          axios.post('http://localhost:8000/', params)
               .then(response => {
                    const responseData = response.data;
        
                    if (responseData.hasOwnProperty('urgencyRating') && responseData.hasOwnProperty('emailTopics')) {
                              const topics = responseData.emailTopics;
                              const urgency = responseData.urgencyRating;
                    
                              topicsField.innerHTML = "TOPICS: <br> <li>" + topics + "</li>";
                              topicsField.classList.add("font-bold");
                              topicsField.classList.add("text-2xl");
                              topicsField.classList.add("text-left");
                              topicsField.classList.add("text-black");
                         console.log('responseData:', responseData);
                         const urgencyChildren = urgencyField.children;
                         for (let i = 0; i < urgencyChildren.length; i++) {
                              if (i <urgency){
                              urgencyChildren[i].classList.add(colors[i]);
                              urgencyChildren[i].classList.remove("bg-slate-900");
                              urgencyChildren[i].classList.add("opacity-70");
                              } else{
                              urgencyChildren[i].classList.remove(colors[i]);
                              urgencyChildren[i].classList.add("bg-slate-900");
                              urgencyChildren[i].classList.remove("opacity-70");
                              }
                         }
                         Spinner?.classList.remove('block');
                         Spinner?.classList.add('hidden');
                    } else {
                         console.error('Invalid response format:', responseData);
                    }
               })
               .catch(error => {
               console.error('Error sending request:', error);
               });
          
               console.log('JSON.stringify(params):', JSON.stringify(params));
               console.log("I have been pressed");
          }
        

  return (
    <body className="
    App
    h-screen
    w-screen
    p-14">
      <div className="
      w-full
      h-full
      flex
      flex-row
      justify-evenly
      gap-10">
        <div className="
        flex-col
        w-2/3
        h-full
        gap-28
        flex">
          <div className="
          bg-slate-200
          opacity-30
          h-16
          border-black
          border-4">
            <textarea
              id="SubjectField"
              placeholder="Subject..."
              className="
              w-full
              h-14
              min-h-14
              max-h-14
              text-2xl
              font-semibold
              align-middle"
            />
          </div>
          <div className="
          h-2/3
          bg-slate-200
          opacity-30
          border-black
          border-4">
            <textarea
              id="BodyField"
              placeholder="Email body..."
              className="
              w-full
              h-full
              max-h-full
              min-h-full
              text-lg
              font-semibold"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-slate-50 border-black border-solid border-4 opacity-30 w-full h-min text-2xl">
               <p className="p-2">Rating de urgencia</p>
          </div>
          <div id="UrgencyField" className="flex flex-row">
            <div className="transition
            w-16
            h-16
            border-solid
            border-4
            border-gray-400
            bg-slate-900
            text-white
            opacity-60
            text-center
            flex
            justify-center
            align-middle
            flex-col">
              <p>1</p>
            </div>
            <div className="transition
            w-16
            h-16
            border-solid
            border-4
            border-gray-400
            bg-slate-900
            text-white
            opacity-60
            text-center
            flex
            justify-center
            align-middle
            flex-col">
              <p>2</p>
            </div>
            <div className="transition
            w-16
            h-16
            border-solid
            border-4
            border-gray-400
            bg-slate-900
            text-white
            opacity-60
            text-center
            flex
            justify-center
            align-middle
            flex-col">
              <p>3</p>
            </div>
            <div className="transition
            w-16
            h-16
            border-solid
            border-4
            border-gray-400
            bg-slate-900
            text-white
            opacity-60
            text-center
            flex
            justify-center
            align-middle
            flex-col">
              <p>4</p>
            </div>
            <div className="transition
            w-16
            h-16
            border-solid
            border-4
            border-gray-400
            bg-slate-900
            text-white
            opacity-60
            text-center
            flex
            justify-center
            align-middle
            flex-col">
              <p>5</p>
            </div>
          </div>
          <div className="bg-slate-50 border-black border-solid border-4 opacity-30 w-full h-min text-2xl">
               <p className="p-2">Temas</p>
          </div>
          <div className="h-1/3 mb-28">
               
            <p
              id="TopicsField"
              className="
               h-full
               w-[20rem]
               text-gray-500
               bg-slate-200
               opacity-30
               border-4
               border-black
               p-1
               font-semibold
               transition-all"
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
               <img className="hidden animate-spin" id="Spinner" src="spinner-svgrepo-com.svg" alt="Spinner" width={25}/>
              Send email
            </Button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
