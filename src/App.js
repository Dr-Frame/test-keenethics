import Form from './components/Form';
import List from './components/List';
import Statistics from './components/Statistics';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <div className="container container--flex">
        <List />
        <div className="wrapper">
          <Form />
          <Statistics />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
