const { request } = require("express");
const router = require("../routes/notes.routes");


const notesCtrl = {};
const Note =  require('../models/Note');

notesCtrl.renderNoteForm = (req,res) =>{
    res.render('notes/newnote');
}
notesCtrl.createNewNote = async (req,res) =>{
    const {title,description} = req.body;
    const newNote= new Note({title,description});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note added Successfully');    
    res.redirect('/notes');
}

notesCtrl.renderNotes = async (req,res) =>{
    const notes = await  Note.find({user: req.user.id});
    //console.log(notes);
    res.render('notes/allnotes',{notes});//pasamos la info a la vista
}

notesCtrl.renderEditForm = async (req,res) =>{
    const note= await Note.findById(req.params.id);
    if(note.user != req.user.id){
        req.flash('error_msg', 'Not authorized');
        return res.redirect('/notes');
    }
    res.render('notes/editnote', {note});
}

notesCtrl.updateNote = async (req,res) =>{
    const{title,description} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{title, description });
    req.flash('success_msg','Note Update Sucessfully');
    res.redirect('/notes');
}
notesCtrl.deleteNote = async (req,res) =>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Note Delete Sucessfully');
    res.redirect('/notes');

}

module.exports=notesCtrl;