const {Router} = require('express');
const router = Router()
const { renderNoteForm,
        createNewNote,
        renderNotes,
        renderEditForm,
        updateNote,
        deleteNote
} = require('../controllers/notes.controller');
const {isAuthenticated}= require('../helpers/auth');
//new note
router.get('/notes/add',isAuthenticated,renderNoteForm);//mostraremos un formulario y verifica la session

router.post('/notes/new-note',isAuthenticated,createNewNote);//cuando se encie datos ni existira comflictos por que tienen diferente verbo(get,post)

//get all note
router.get('/notes',isAuthenticated,renderNotes);
//edit notes
router.get('/notes/edit/:id',isAuthenticated,renderEditForm);   //para mostrar el form
router.put('/notes/edit/:id',isAuthenticated,updateNote); //para actualizar el form

//delete notes
router.delete('/notes/delete/:id',isAuthenticated,deleteNote);

module.exports= router;