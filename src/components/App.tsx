import Form from "./Form/page";
import Header from "./Header/page";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="main-content">
        <Form />
        <div className="gallery-grid"></div>
      </div>
    </div>
  );
}

export default App;
