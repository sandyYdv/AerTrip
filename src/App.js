import Header from "./components/header/Header";
import FlightSearch from "./components/flight/FlightSearch";
//import FlightSearchResult from "./components/flight/FlightSearchResult";

function App() {
  return (
    <div className="App">
      <Header />
      <FlightSearch />
      {/*
        <FlightSearchResult
          flight={{ at: 0, dt: 0, fr: "BOM", to: "CCU", ft: 0, al: "Vistara" }}
        />
  */}
    </div>
  );
}

export default App;
