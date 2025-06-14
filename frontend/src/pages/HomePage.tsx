import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import type { AxiosError } from 'axios';
import NotesNotFound from '../components/NotesNotFound';
import { LoaderIcon } from 'lucide-react';

interface myNote {
  title: string;
  content: string;
  _id: string;
  createdAt: string;
}

const HomePage = () => {
  const [notes, setNotes] = useState<myNote[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetching data from backend using axios library
  // using 'GET' method
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
      } catch (error) {
        console.log('Error - ', (error as AxiosError).message);
        toast.error('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  function deleteNote(id: string) {
    setNotes(prev => prev.filter(note => note._id !== id));
  }
  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && (
          <div className='min-h-screen bg-base-200 flex items-center justify-center'>
            <LoaderIcon className='animate-spin size-10' />
          </div>
        )}

        {notes.length === 0 && <NotesNotFound />}

        {notes.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={id => deleteNote(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
