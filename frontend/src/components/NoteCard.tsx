import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';

interface myNote {
  title: string;
  content: string;
  _id: string;
  createdAt: string;
}

interface Props {
  note: myNote;
  setNotes: (id: string) => void;
}

const NoteCard = ({ note, setNotes }: Props) => {
  const handleDelete = async function (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) {
    e.preventDefault();

    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes(note._id);
      toast.success('Note deleted successfully.');
    } catch (error) {
      console.error('Error deleting note - ', (error as AxiosError).message);
      toast.error('Failed to delete note');
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'
    >
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className='text-sm text-base-content/60'>
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4' />
            <button
              onClick={e => {
                handleDelete(e, note._id);
              }}
              className='btn btn-ghost btn-xs text-error'
            >
              <Trash2Icon className='size-4' />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
