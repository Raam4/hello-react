import Header from './components/Header';
import Notes from './components/Notes';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Header />
      <main className="grid grid-cols-1 gap-1 justify-items-center my-4 md:grid-cols-2 sm:mx-8">
        <Notes />
      </main>
      <Footer />
    </>
  )
}

export default App;