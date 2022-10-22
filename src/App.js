import { useEffect, useState } from 'react';
import './Style.css';

function App() {
  const date = new Date();
  const [initialDate, setInitialDate] = useState(date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());
  const [targetDate, setTargetDate] = useState(date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());
  const [resultMonth, setResultMonth] = useState(0);
  const [resultDay, setResultDay] = useState(0);
  const [resultYear, setResultYear] = useState(0);
  const [selectedMode, setSelectedMode] = useState('days');
  const [showMonths, setShowMonths] = useState(false);
  const [showDays, setShowDays] = useState(false);
  const [showYears, setShowYears] = useState(false);

  const modeChange = (e) => {
    setSelectedMode(e.target.value);
    if (e.target.value === 'months') {
      setShowMonths(true);
      setShowDays(true);
      setShowYears(false);
    } else if (e.target.value === 'days') {
      setShowMonths(false);
      setShowDays(true);
      setShowYears(false);
    } else if (e.target.value === 'years') {
      setShowMonths(true);
      setShowDays(true);
      setShowYears(true);
    }
  }

  const calculateDifference = () => {
    // Calculate the difference between two timestamps in years, days and months
    setResultMonth(0);
    setResultDay(0);
    setResultYear(0);
    const difference = new Date(targetDate) - new Date(initialDate);
    const differenceInYears = Math.floor(difference / 1000 / 60 / 60 / 24 / 365);
    const differenceInMonths = Math.floor(difference / 1000 / 60 / 60 / 24 / 30);
    const differenceInDays = Math.floor(difference / 1000 / 60 / 60 / 24);

    // console.log({ differenceInYears });
    // console.log({ differenceInMonths });
    // console.log({ differenceInDays });

    if (Math.floor(differenceInMonths) > 12) {
      setResultYear(Math.floor(differenceInYears));
    } else {
      setResultYear(0);
    }

    if (Math.abs(Math.floor(differenceInDays)) > 30) {
      setResultMonth(Math.floor(differenceInMonths));
      setResultDay(Math.floor(differenceInDays) - (Math.floor(differenceInMonths) * 30));
      console.log(Math.floor(differenceInDays) - (Math.floor(differenceInMonths) * 30))
    } else if (Math.floor(differenceInDays) < 30) {
      setResultMonth(0);
      setResultDay(Math.floor(differenceInDays));
    }
    //  {
    //   setResultMonth(0);
    // }

    // if (Math.floor(differenceInDays) > 0) {
    //   setResultDay(Math.floor(differenceInDays));
    // } else {
    //   setResultDay(0);
    // }
    
    // // setResultYear(Math.floor(differenceInYears));
    // setResultMonth(Math.floor(differenceInMonths));
    // setResultDay(Math.floor(differenceInDays));

    // const date1 = new Date(initialDate);
    // const date2 = new Date(targetDate);
    // const difference = date2.getTime() - date1.getTime();
    // const daysDifference = Math.floor(difference / (1000 * 3600 * 24));
    // const monthsDifference = Math.floor(daysDifference / 31);
    // const yearsDifference = Math.floor(monthsDifference / 12);

    // if (monthsDifference > 12 || monthsDifference < -12) {
    //   setResultYear(Math.abs(yearsDifference));
    //   setResultMonth(Math.abs(monthsDifference) % 12);
    //   setResultDay(Math.abs(daysDifference) % 31);
    // } else if (daysDifference > 31 || daysDifference < -31) {
    //   setResultMonth(Math.abs(monthsDifference));
    //   setResultDay(Math.abs(daysDifference) % 31);
    // } else {
    //   setResultDay(Math.abs(daysDifference));
    // }
  }
  return (
    <div className="App">
      <div className='mainDiv'>
        <div className='datediv one'>
          <p className='initialDate'>Select your Initial Date:</p>
          <input
            value={initialDate}
            onChange={(e) => setInitialDate(e.target.value)}
            name='initialDate'
            type="date"
          />
          {/* </div>
          <div className='datediv'> */}
          <p className='finalDate'>Select your Target Date:</p>
          <input
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            name='targetDate'
            // format="dd/mm/yyyy"
            type="date"
          />
          {/* Button */}
          <button onClick={calculateDifference} className='button'>Calculate</button>
        </div >
        <div className='resultDiv one'>
          <p className='result'>Result:</p>
          {/* Select from years, months and days */}
          <select
            value={selectedMode}
            onChange={modeChange}
            // onChange={(e) => setSelectedMode(e.target.value)}
            name='selectedMode'
            className='select'
          >
            <option value='years'>Years</option>
            <option value='months'>Months</option>
            <option value='days'>Days</option>
          </select>
          <div className='resultNumbers'>
            {showYears ? (
              <div className='indiResult'>
                <p className='resultValueYear number'>{resultYear}</p>
                <p className='resultTextYear'>Years</p>
              </div>) : null
            }
            {showMonths ? (
              <div className='indiResult'>
                <p className='resultValueMonth number'>{resultMonth}</p>
                <p className='resultTextMonth'>Months</p>
              </div>) : null
            }
            {showDays ? (
              <div className='indiResult'>
                <p className='resultValueDay number'>{resultDay}</p>
                <p className='resultTextDay'>Days</p>
              </div>) : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
