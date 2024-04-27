import React, { useState } from "react";
import "./App.css";
import { Button } from "@mui/material";
import axios from "axios";

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [subjectArea, setSubjectArea] = useState('');
  const [bodyArea, setBodyArea] = useState('');
  const colors: { [key: number]: string } = {
    0: "bg-green-900",
    1: "bg-lime-900",
    2: "bg-yellow-900",
    3: "bg-orange-900",
    4: "bg-red-900",
  };

  function SendRequest() {
    const topicsField = document.getElementById("TopicsField");
    const urgencyField = document.getElementById("UrgencyField");
    const Subject = document.getElementById(
      "SubjectField"
    ) as HTMLTextAreaElement;
    const Body = document.getElementById("BodyField") as HTMLTextAreaElement;
    const Spinner = document.getElementById("Spinner");
    Spinner?.classList.add("block");
    Spinner?.classList.remove("hidden");
    setIsClicked(true);
    if (!topicsField || !urgencyField || !Subject || !Body) {
      console.error("One or more required fields not found.");
      return;
    }

    const params = {
      Subject: Subject.value,
      Body: Body.value,
    };

    axios
      .post("http://localhost:8000/", params)
      .then((response) => {
        const responseData = response.data;
          console.log(response)
        if (
          responseData.hasOwnProperty("urgencyRating") &&
          responseData.hasOwnProperty("emailTopics")
        ) {
          const topics = responseData.emailTopics;
          const urgency = responseData.urgencyRating;

          topicsField.innerHTML = "TOPICS: <br>" + topics.map((topic: string) => "<li>" + topic + "</li>").join("");
          topicsField.classList.add("font-bold");
          topicsField.classList.add("text-2xl");
          topicsField.classList.add("text-left");
          topicsField.classList.add("text-black");
          const urgencyChildren = urgencyField.children;
          for (let i = 0; i < urgencyChildren.length; i++) {
            if (i < urgency) {
              urgencyChildren[i].classList.add(colors[i]);
              urgencyChildren[i].classList.remove("bg-slate-900");
              urgencyChildren[i].classList.add("opacity-70");
            } else {
              urgencyChildren[i].classList.remove(colors[i]);
              urgencyChildren[i].classList.add("bg-slate-900");
              urgencyChildren[i].classList.remove("opacity-70");
            }
          }
          Spinner?.classList.remove("block");
          Spinner?.classList.add("hidden");
          setIsClicked(false);
        } else {
          console.error("Invalid response format:", responseData);
          Spinner?.classList.remove("block");
          Spinner?.classList.add("hidden");
          setIsClicked(false);
        }
      })
      .catch((error) => {
        console.error("Error sending request:", error);
        Spinner?.classList.remove("block");
        Spinner?.classList.add("hidden");
        setIsClicked(false);
      });

    console.log("JSON.stringify(params):", JSON.stringify(params));
    console.log("I have been pressed");
  }

  function FillExample(SampleSubject: string, SampleBody: string): void {
     setSubjectArea(SampleSubject);
     setBodyArea(SampleBody);
  }

  return (
    <body
      className="
    App
    h-screen
    w-screen
    p-14"
    >
      <div
        className="
      w-full
      h-full
      flex
      flex-row
      justify-evenly
      gap-10"
      >
        <div
          className="
          flex
          flex-col
          w-1/5
          bg-slate-200
          opacity-30
          p-4
          border-black
          border-4
          gap-28"
        >
          <div
            className="
            bg-slate-50
            border-black
            border-solid
            border-4
            text-2xl"
          >
            <p>Config</p>
          </div>
          <div className="
          flex
          flex-col
          h-1/2
          justify-between
          border-4
          border-black
          opacity-100
          p-4">
               <p>Ejemplos de emails</p>
          <Button
            variant="contained"
            className="w-full"
            onClick={() => FillExample("Re: Mtg w/Bob Gee", "I think this is a great initiative but it is critically important that any announcement of the panel makes it crystal clear that the objective of the group is to come up with standards to facilitiate competition. We will do nothing but waste time if it becomes a negotiation over competition. the best and politically easiest time to make that objective clear is in the original announcement not after the group gets underway. Can we get in touch with DOE to make sure they pick this up? Cynthia Sandherr@ENRON 07/18/2000 05:03 PM To: Jeff Brown/HOU/EES@EES cc: Stanley Horton/Corp/Enron@Enron Shelley Corman/ET&S/Enron@ENRON Joe Hartsoe/Corp/Enron@ENRON Steven J Kean/HOU/EES@EES Richard Shapiro/HOU/EES@EES James D Steffes/HOU/EES@EES Janine Migden/DUB/EES@EES Jeff Dasovich/SFO/EES@EES Subject: Re: Mtg w/Bob Gee Jeff: I have followed up with other DOE politicals who advised they will meet this Thursday with Bob Gee to finalize and approve his speech to NARUC on Monday July 24th. It is looking positive that he may be positioned to make the announcement Monday. However DOE will likely need to revisit some folks on the current Blue Ribbon Reliability Panel in order to replace some of the utility transmission-only focused members with others who focus on business practices plus add additional people to represent the internet like APX Altra and HoustonStreet.Com. (these are Steve Kean's suggestions.) Too I have been cautioned about referring to the Blue Ribbon Reliability Panel as a model since their timeline was slow but rather suggest the TVA Blue Ribbon Panel model since they were able to issue a report after only four meetings. I have asked for this issue to be brought to Secretary Richardson's attention and advised this will be done this week. I have also discussed this with John Anderson of ELCON who is supportive. Jeff Brown@EES 07/18/2000 12:45 PM To: Stanley Horton/Corp/Enron@Enron Shelley Corman/ET&S/Enron@ENRON Joe Hartsoe/Corp/Enron@ENRON Steven J Kean/HOU/EES@EES Richard Shapiro/HOU/EES@EES James D Steffes/HOU/EES@EES cc: Cynthia Sandherr/Corp/Enron@ENRON Janine Migden/DUB/EES@EES Jeff Dasovich/SFO/EES@EES Subject: Mtg w/Bob Gee Cynthia and I met with Bob Gee regarding a potential role for DOE in creating a national standards board. Bob appeared comfortable with establishing a Blue Ribbon panel similar to the reliability panel to address this issue. In fact Bob suggested that the reliability panel which includes a balance of key stakeholders could be re-tasked with this issue. We recommended that the focus of any panel should be on the structure (governance segments executive committees) and scope of the organization (retail wholesale gas electric). Bob plans to follow-up with us next week. Jeff")}
          >
            Ejemplo 1
          </Button>
          <Button
            variant="contained"
            className="w-full"
            onClick={() => FillExample("CONFIDENTIAL - Residential in CA", "In the meeting today no decision was made about what to do with Enron's 16000 residential customers. Each of the contracts gives a basic 30 day out right to Enron. That being said I think that we have a short window to push for DA before any public action impacts us in Sacramento. I realize that the ultimate action (which I think is inevitable) makes it harder for our advocacy on DA but real $ are flowing out of the company. EES will give us notice when a decision is reached. Thanks Jim")}
          >
            Ejemplo 2
          </Button>
          <Button
            variant="contained"
            className="w-full"
            onClick={() => FillExample("Minutes from last Thurs CAISO Board Meeting (Sorry for the delay)", "CAISO BOG 10/25/01 Notes taken by G. Alan Comnes Meeting went from about 10:30 to 1 p.m. Written materials discussed at this meeting are available at www.caiso.com/bog. 1. Budget. Board approved budget which contains a significant increase in GMCs and for the first time applies GMC fees on the self provision of A/S. The motion to adopt was modified to say the Board would revisit budget if in response to Gov. Davis requests to par budgets the CAISO budget is cut. 2. Retirement plan Audit 3. Allocation of Above-MCP 487 charges. This mechanism will improve the allocation of OOM costs so that the per-MWh charges match up with actual OOM costs. Stated that penalty revenues used to lower OOM costs could come from imbalance penalties. Action. approved (?) to allow staff to make a tariff amendment on this change. 4. Winter Assessment. Presentation by staff Kahn took issue (i.e. did not even want staff report presented) that CAISO does an assessment without consulting the Power Authority CPUC and the CEC. Worried about conflicting with the other resource assessments out there and giving media ways to take shots at DWR buying practices. In the end the full presentation was not given but questions were asked about whether the assessment spells trouble or provides assurance. The answer: things are tight in some months but are expected to be ok given the level of conservative assumptions used in the analysis. Action: staff was tasked to compare this assessment with CEC's and others and come back in another month. 5. Generator maintenance program. Will use GADS data. This program is mandatory for PGA generator units. CAISO staffer represented that no other ISO has a prescriptive program like the one CAISO is proposing. Current schedule: brief FERC staff next week return to Board in November for approval make FERC filing implement in early '02. Benchmarks are based on each unit's historical performance i.e. dogs will be benchmarked against their past doggy behavior. There is no component to raise the bar on performance but a unit that falls relative to past performance would trigger further review. 6. MSC Selection Committee. MSC provides independent review of the CAISO markets for CAISO the state and FERC. Wolak is the only member left at the moment. Selection committee will be Sheffrin Wolak and Borenstein. Candidates will go to Exec. Director and the final candidates to the Board in February 2002 (!). Kahn questioned how the MSC can survive with only one member and take until February 02 to select a final members. Nonetheless the glacially paced schedule was adopted. 7. FERC RTO Seams Issues. Steve Greenleaf presented. Updated BOG on RTO week and said that the 4 RTO model took a step backward (off the table in the words of Chair Wood) in response to criticism from state PUCs on Thursday. (Is this an accurate recounting of Day 4?). ISO is engaged in interregional coordination. Mentioned CSIC group Mentions SSGWY's (?)sponsorship of a market monitoring workshop on November 16. 8. Update of CERS Settlement BEEP/AS Payment Procedure. Edison and PG&E are making progress but no agreement with CERS have been reached. SDG&E signed and the procedure was implemented at least in part with SDG&E. 9. Monthly reports: financial. 10. Monthly reports: DMA. Sheffrin. Mostly followed the briefing charts. Emphasized the following: CERS OOM purchases are generally down and are reasonably priced once purchases and sales are disaggregated. Said that suppliers are still bidding above costs. DMA files confidential reports that include info on bidding data weekly to FERC. Bids are not coming down. Intrazonal congestion is up due to new generation coming on line. That allows generators to play the dec game.,energy infrastructure")}
          >
            Ejemplo 3
          </Button>
          <Button
            variant="contained"
            className="w-full"
            onClick={() => FillExample("California Update", "Please detach the attachment combine it with the articles Gavin Dillingham sent me and attach to an e-mail to Robert Zoellick and Irwin Stelzer with this message from me: Attached is some background information on the reregulation crisis in California. -----------------")}
          >
            Ejemplo 4
          </Button>
          <Button
            variant="contained"
            className="w-full"
            onClick={() => FillExample("Re: Purported Ken Lay Promise to Haley Barbour", "Ken hasn't mentioned it. I'll ask next time I talk to him. Linda Robertson 07/03/2001 01:58 PM To: Steven J Kean/NA/Enron@Enron Richard Shapiro/NA/Enron@Enron cc: Pat Shortridge/Corp/Enron@Enron John Shelk/NA/Enron@Enron Subject: Purported Ken Lay Promise to Haley Barbour Pat Shortridge heard from the Executive Director of the Republican Senate Campaign Committee that Haley Barbour the new finance chair for the Committee had called Ken to request that he serve as a Finance Co-Chairman. Pat was told that Ken agreed. Have you heard of this call and did Ken agree?Thanks,government & politics")}
          >
            Ejemplo 5
          </Button>
          </div>
        </div>
        <div
          className="
        flex-col
        w-2/3
        h-full
        gap-28
        flex"
        >
          <div
            className="
          bg-slate-200
          opacity-30
          h-16
          border-black
          border-4"
          >
            <textarea
              id="SubjectField"
              placeholder="Asunto..."
              value={subjectArea}
              onChange={(e) => setSubjectArea(e.target.value)}
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
          <div
            className="
          h-2/3
          bg-slate-200
          opacity-30
          border-black
          border-4"
          >
            <textarea
              id="BodyField"
              placeholder="Cuerpo del mail..."
              value={bodyArea}
              onChange={(e) => setBodyArea(e.target.value)}
              className="
              w-full
              h-full
              max-h-full
              min-h-full
              text-lg
              font-semibold"
            />
          </div>
          <Button
            variant="contained"
            className="w-1/3"
            onClick={() => FillExample("","")}
          >
            Limpiar campos
          </Button>
        </div>

        <div className="flex flex-col gap-8">
          <div className="
          bg-slate-50
          border-black
          border-solid
          border-4
          opacity-30
          w-full
          h-min
          text-2xl">
            <p className="p-2">Urgencia</p>
          </div>
          <div id="UrgencyField" className="flex flex-row">
            <div
              className="transition
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
            flex-col"
            >
              <p>1</p>
            </div>
            <div
              className="transition
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
            flex-col"
            >
              <p>2</p>
            </div>
            <div
              className="transition
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
            flex-col"
            >
              <p>3</p>
            </div>
            <div
              className="transition
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
            flex-col"
            >
              <p>4</p>
            </div>
            <div
              className="transition
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
            flex-col"
            >
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
              Temas
            </p>
          </div>
          <div>
            <Button
              disabled={isClicked}
              variant="contained"
              className="w-full"
              onClick={() => SendRequest()}
            >
              <img
                className="hidden animate-spin"
                id="Spinner"
                src="spinner-svgrepo-com.svg"
                alt="Spinner"
                width={25}
              />
              Send email
            </Button>
          </div>
        </div>
      </div>
    </body>
  );
}


export default App;
