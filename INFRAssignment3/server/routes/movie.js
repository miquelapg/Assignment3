var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Movie = require('../models/movie');
const movie = require('../models/movie');

/*Read Operation -- Getting Route for movie list */
router.get('/',async(req,res,next)=>{
    try{
        const MovieList = await Movie.find();
        res.render('Movie/list',{
            title:'Movies',
            MovieList:MovieList
        })}
        catch(err){
            console.error(err);
            res.render('Movie/list',{
                error:'Error on the server'
            })
        }
        });
/*Create Operation -- Get route for display Add Movie Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Movie/add',{
            title: 'Add Movie'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Movie/list',{
            error:'Error on the server'
        })
    }
});
/*Create Operation -- Post route for processing Add Movie Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newMovie = Movie({
            "Name":req.body.Name,
            "Genre":req.body.Genre,
            "Year":req.body.Year,
            "Review" : req.body.Review
        });
        Movie.create(newMovie).then(()=>{
            res.redirect('/movieslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Movie/list',{
            error:'Error on the server'
        })
    }
});
/*Update Operation -- Get route for display Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const movieToEdit= await Movie.findById(id);
        res.render('Movie/edit',
            {
                title:'Edit Movie',
                Movie:movieToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err);
    }
});
/* Update Operation --> Post route for processing Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedMovie = Movie({
            "_id":id,
            "Name":req.body.Name,
            "Genre":req.body.Genre,
            "Year": req.body.Year,
            "Review":req.body.Review
        });
        Movie.findByIdAndUpdate(id,updatedMovie).then(()=>{
            res.redirect('/movieslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Movie/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to do Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Movie.deleteOne({_id:id}).then(()=>{
            res.redirect('/movieslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Movie/list',{
            error:'Error on the server'
        })
    }
});

module.exports = router