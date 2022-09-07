import Header from './components/Header';
import Notes from './components/Notes';

function App() {

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 gap-1 justify-items-center md:grid-cols-2 sm:mx-8">
        <Notes />
      </div>
    </>
  )
}

export default App;