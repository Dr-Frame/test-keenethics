import Form from './components/Form';
import List from './components/List';
import Statistics from './components/Statistics';
import Header from './components/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <div className="container container_flex">
        <List />
        <div className="inner">
          <Form />
          <Statistics />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
