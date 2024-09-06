import React, { useState } from 'react';
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"

const NoteTakingApp = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const addNote = () => {
        if (currentNote.trim() !== '') {
            const newNote = {
                id: Date.now(),
                content: currentNote,
                tags: currentNote.match(/#\w+/g) || []
            };
            setNotes([...notes, newNote]);
            setCurrentNote('');
        }
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const filteredNotes = notes.filter(note =>
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Note Taking App</h1>

            <div className="mb-4 relative">
                <Input
                    type="text"
                    placeholder="Search notes or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 pl-8 border rounded"
                />
                <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            </div>

            <div className="mb-4 flex">
                <Input
                    type="text"
                    placeholder="Enter your note (use #hashtags)"
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    className="flex-grow mr-2 p-2 border rounded"
                />
                <Button onClick={addNote} className="p-2 bg-blue-500 text-white rounded">
                    ➕
                </Button>
            </div>

            <ul>
                {filteredNotes.map(note => (
                    <li key={note.id} className="mb-2 p-2 bg-gray-100 rounded flex justify-between items-center">
                        <span>
                            {note.content.split(' ').map((word, index) =>
                                word.startsWith('#') ?
                                    <span key={index} className="text-blue-500 font-semibold">{word} </span> :
                                    word + ' '
                            )}
                        </span>
                        <Button onClick={() => deleteNote(note.id)} className="text-red-500">
                            🗑️
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteTakingApp;