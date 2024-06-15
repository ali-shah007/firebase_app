import { useEffect, useState } from "react";
import AuthSection from "./components/AuthSection";
import { auth, db, storage } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDate, setDate] = useState("");
  const [newOscar, setOscar] = useState(0);
  const [fileUpload, setFileUpload] = useState(null);

  const [updateTitle, setUpdateTitle] = useState('');

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    // REead Data from db
    // Set Movie List
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    
    getMovieList();
  }, []);

  const addMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newTitle,
        releaseDate: newDate,
        recievedAnOscar: newOscar,
        userId: auth?.currentUser?.uid,
            });
      getMovieList();
      setTitle('');
      setDate('');
      setOscar(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (movieId) => {
    try {const movieDocTodDel = doc(db, "movies", movieId);
    await deleteDoc(movieDocTodDel);
    getMovieList();} catch(err) {
      console.error(err);
    }
  }

  const updateTitleMovie = async (movieId) => {
try {
  const movieDoc = doc(db, "movies", movieId)
  await updateDoc(movieDoc, {title: updateTitle});
  getMovieList();
  setUpdateTitle('');
} catch (err) {
  console.error(err);
}
  }

  const uploadFile = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectfiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      
    } catch (err) {console.error(err);

    }
    
  }

  return (
    <div>
      <AuthSection/>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id} className="text-4xl text-yellow-500">
            <h1 style={{ color: movie.recievedAnOscar ? "blue" : "green" }}>
              {movie.title}
            </h1>
            <h1>release date: {movie.releaseDate}</h1>
            <button className="px-4 py-2 bg-blue-500" onClick={() => deleteMovie(movie.id)}>Delete</button>
            <input placeholder="new Title..."  onChange={(e) => setUpdateTitle(e.target.value)}/>
            <button className="px-4 py-2 bg-teal-500" onClick={() => updateTitleMovie(movie.id)}>Update Title</button>
          </div>
        ))}

        <div>
          <input
            type="text"
            placeholder="title..."
            value={newTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="release Date..."
            value={newDate}
            onChange={(e) => setDate(Number(e.target.value))}
          />
          <input
            type="checkbox"
            placeholder="title..."
            checked={newOscar}
            onChange={(e) => setOscar(e.target.checked)}
          />
          <button onClick={addMovie}>Submit</button>

        </div>
        
       
      </div>


      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default App;
