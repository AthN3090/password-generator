/* A password is considered strong if it meets certain criteria, such as being a combination of uppercase and 
lowercase letters, numbers, and special characters, and being at least 12 characters long. 
A password is considered weak if it is a common word or phrase, or if it is a short combination of letters and numbers. 
A password is considered moderate if it meets some but not all of the criteria for a strong password. 
In general, the longer and more complex a password is, the stronger it will be considered. 
It's also important to avoid using easily guessable information, such as your name or address, in a password.
 */
import { useState, useRef} from "react";

function App() {
  const [password, setPassword] = useState("Password");
  const [range, setRange] = useState(8);
  const [incldUpper, setIncldUpper] = useState(false)
  const [incldLower, setIncldLower] = useState(false)
  const [incldNum, setIncldNum] = useState(false)
  const [incldSymbols, setIncldSymbols] = useState(false)
  const [checkboxWarning, setCheckboxWarning] = useState(false)
  const passStrength = useRef(0)

  function setIncldUpperHandler(){
    setIncldUpper(!incldUpper)
    if(checkboxWarning) setCheckboxWarning(false)
  }
  function setIncldLowerHandler(){
    setIncldLower(!incldLower)
    if(checkboxWarning) setCheckboxWarning(false)
  }
  function setIncldNumHandler(){
    setIncldNum(!incldNum)
    if(checkboxWarning) setCheckboxWarning(false)
  }
  function setIncldSymbolsHandler(){
    setIncldSymbols(!incldSymbols)
    if(checkboxWarning) setCheckboxWarning(false)
  }


  function genPass(){
    if( incldUpper || incldLower || incldNum || incldSymbols){
      let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let lower = 'abcdefghijklmnopqrstuvwxyz';
      let num = '1234567890';
      let sym = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
      let set = ''
      passStrength.current = 0
      if (incldUpper) {
        set += upper;
        passStrength.current++;
        // setPassStrength(prev => prev + 1)
      }

      if (incldLower) {
        set += lower;
        passStrength.current++;
        // setPassStrength(prev => prev + 1)
      }
      if (incldNum) {
        set += num;
        passStrength.current++;
        // setPassStrength(prev => prev + 1)
      }
      if (incldSymbols) {
        set += sym;
        passStrength.current++;
        // setPassStrength(prev => prev + 1)
      } 

      if(range > 10){
        passStrength.current++;
        // setPassStrength(prev => prev + 1)
      }

      let generatedPass = ''
      for(let i = 0; i < range ; i++){
        let random = Math.floor(Math.random() * set.length)
        generatedPass+=set.charAt(random)
      
      }
      console.log(passStrength.current)
      setPassword(generatedPass)

    }else{
      setCheckboxWarning(true)
    }

    
  }

  function copyToClipboard(text){

    navigator.clipboard.writeText(text)
    .then(() => {
      console.log("copied!")
    })
  }
  
  return (
    <>
      <div className="p-4 mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  text-white min-w-[350px] bg-[#24232B] flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">{password}</span>
          <button
            className="w-fit p-2 bg-slate-700 hover:bg-slate-600"
            title="Copy to clipboard"
            onClick={() => copyToClipboard(password)}
          >
            📋
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label>Character length</label>
            <span>{range}</span>
          </div>
          <input
            className="w-full range-custom-style accent-[#2a8b8b]"
            name="range"
            min="8"
            max="16"
            type="range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
        </div>
        <div>
          {checkboxWarning ? (
            <div className="text-red-700 py-2 font-bold">
              Select atleast one option.
            </div>
          ) : (
            ""
          )}

          <div className="flex gap-4">
            <input
              type="checkbox"
              className="accent-[#2a8b8b]"
              checked={incldUpper}
              onChange={setIncldUpperHandler}
            ></input>
            <span>Include Uppercase Letters </span>
          </div>
          <div className="flex gap-4">
            <input
              type="checkbox"
              className="accent-[#2a8b8b]"
              checked={incldLower}
              onChange={setIncldLowerHandler}
            ></input>
            <span>Include Lowerrcase Letters </span>
          </div>
          <div className="flex gap-4">
            <input
              type="checkbox"
              className="accent-[#2a8b8b]"
              checked={incldNum}
              onChange={setIncldNumHandler}
            ></input>
            <span>Include Numbers</span>
          </div>
          <div className="flex gap-4">
            <input
              type="checkbox"
              className="accent-[#2a8b8b]"
              checked={incldSymbols}
              onChange={setIncldSymbolsHandler}
            ></input>
            <span>Include Symbols</span>
          </div>
        </div>
        <div className=" bg-gray-900 p-3 rounded-md text-gray-400 font-semibold">
          <div className="flex justify-between items-center">
            <span>STRENGTH</span>
            <div className="flex flex-col gap-1">
              <span className="text-sm">{passStrength.current === 0 ? "" : passStrength.current < 3 ? "Poor" : passStrength.current === 3 ? "Okay" : "Strong"}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((index) => {
                  if (index < 3) {
                    if (passStrength.current < 3) {
                      if (index > passStrength.current) {
                        return (
                          <div
                            key={index}
                            className="border border-gray-600 w-[10px] h-[3px]"
                          ></div>
                        );
                      } else {
                        return (
                          <div
                            key={index}
                            className="border border-red-600 w-[10px] h-[3px]"
                          ></div>
                        );
                      }
                    } else if (passStrength.current === 3) {
                      return (
                        <div
                          key={index}
                          className="border border-yellow-600 w-[10px] h-[3px]"
                        ></div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className="border border-green-600 w-[10px] h-[3px]"
                        ></div>
                      );
                    }
                  } else if (index === 3) {
                    if (passStrength.current > 3) {
                      return (
                        <div
                          key={index}
                          className="border border-green-600 w-[10px] h-[3px]"
                        ></div>
                      );
                    } else if (passStrength.current === 3) {
                      return (
                        <div
                          key={index}
                          className="border border-yellow-600 w-[10px] h-[3px]"
                        ></div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className="border border-gray-600 w-[10px] h-[3px]"
                        ></div>
                      );
                    }
                  } else if (index > 3) {
                    if (passStrength.current > 3) {
                      if (index > passStrength.current) {
                        return (
                          <div
                            key={index}
                            className="border border-gray-600 w-[10px] h-[3px]"
                          ></div>
                        );
                      } else {
                        return (
                          <div
                            key={index}
                            className="border border-green-600 w-[10px] h-[3px]"
                          ></div>
                        );
                      }
                    } else {
                      return (
                        <div
                          key={index}
                          className="border border-gray-600 w-[10px] h-[3px]"
                        ></div>
                      );
                    }
                  } else {
                    return (
                      <div
                        key={index}
                        className="border border-gray-600 w-[10px] h-[3px]"
                      ></div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        <button className="bg-[#2a8b8b] p-2 rounded-md font-semibold" onClick={genPass}>
          Generate
        </button>
      </div>
    </>
  );
}

export default App;
