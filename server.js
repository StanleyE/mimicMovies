//  Movie App!!
const express = require('express'),
        app = express();
const request = require ('request');
const cheerio = require ('cheerio');


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index', {movies: getMovies()});
});// end '/'

app.get('/movies/:movieID', (req, res)=>{
    let movieChoice = Number(req.params.movieID);
    let movies = getMovies();
    res.render('movies', {movies: movies[movieChoice]});
});//end of /movies/:movieID

app.get('/search', (req, res)=>{
    let waldo = req.query.MovieSearch;
    let movies = getMovies();
    // catches empty search
        if (waldo === undefined || waldo === '') {
            res.render('error');            
            // catches number searches
        } else if (Number(waldo) === 0 || Number(waldo)){
            res.render('movies', {movies: movies[waldo]});
                if (Number(waldo) > movies.length){
                    res.render('error');
                }
            // catches name search
        } else { //loop through data to get all movie title
            searchResults = [];
           for (let i = 0; i < movies.length; i++) {
               let compare = [movies[i].title];

               // if search is exact or movie is one word
               if (compare == waldo) {
                    res.render('movies', {movies: movies[i]});
               }else {
                  //if movie or search has long title
                compare = movies[i].title.split(' ');
                search = waldo.split(' ');
               // console.log(compare + search);
                    for (let m = 0; m < compare.length; m++) {
                        if (compare[m] == search) {
                            searchResults.push(movies[i]);
                        }
                    }//end of second for loop
            }    
           } //end of first for loop
           if (searchResults == 0) {
               res.render('error');
           } else {
                res.render('index', {movies: searchResults});  
           }      
        }
 });// end of '/search'

function getMovies() {
    return [{
        title: 'Blade Runner',
        year: '1982',
        rated: 'R',
        released: 'June 25, 1982',
        runtime: '1h 57min',  
        genre: 'Sci-Fi, Thriller',
        director: 'Ridley Scott',
        writer: 'Hampton Fancher, David Peoples',
        actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
        plot: 'A blade runner must pursue and try to terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
        language: 'English',
        country: 'USA, Hong Kong',
        img: 'https://image.tmdb.org/t/p/w154/fWy8FTiRs3QEW9OpZjiPnFWKHTB.jpg',
        movieID: 0
    },
    {
        title: 'Rogue One: A Star Wars Story',
        year: '2016',
        rated: 'G',
        released: 'December 16, 2016',
        runtime: '2h 13min',  
        genre: 'Sci-Fi, Action',
        director: 'Gareth Edwards',
        writer: 'Gary Whitta, John Knoll',
        actors: 'Felicity Jones, Diego Luna, Mads Mikkelson, Alan Tudyk',
        plot: 'A rogue band of resistance fighters unite for a mission to steal the Death Star plans and bring a new hope to the galaxy.',
        language: 'English',
        country: 'Maldives, Jordan',
        img: 'https://image.tmdb.org/t/p/w154/cgJ3ipVFZbPRiT9NCKiLlOCzOe2.jpg',
        movieID: 1
    },
    {
        title: 'The Silence of the Lambs',
        year: '1991',
        rated: 'R',
        released: 'January 30, 1991',
        runtime: '1h 59min',  
        genre: 'Crime, Thriller',
        director: 'Johnathan Demme',
        writer: 'Thomas Harris',
        actors: 'Jodie Foster, Anthony Hopkins, Scott Glenn, Ted Levine',
        plot: 'FBI trainee, Clarice Starling ventures into a maximum-security asylum to pick the diseased brain of Hannibal Lecter, a psychiatrist turned homicidal cannibal. Starling needs clues to help her capture a serial killer. But her Faustian relationship with Lecter soon leads to his escape, and now two deranged killers are on the loose.',
        language: 'English',
        country: 'USA',
        img: 'https://image.tmdb.org/t/p/w154/bOc2n4bMtFzjrgpPOOKXAM0AhAu.jpg',
        movieID: 2

    },
    {
        title: 'Jurassic Park',
        year: '1993',
        rated: 'R',
        released: 'June 9, 1993',
        runtime: '2h 7min',  
        genre: 'Sci-Fi, Adventure',
        director: 'Steven Speilberg',
        writer: 'Micheal Chrichton',
        actors: 'Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough',
        plot: 'A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs drawn from prehistoric DNA. Before opening day, he invites a team of experts and his two eager grandchildren to experience the park and help calm anxious investors. However, the park is anything but amusing as the security systems go off-line and the dinosaurs escape.',
        language: 'English',
        country: 'USA',
        img: 'https://image.tmdb.org/t/p/w154/nm6iEppZ7h3NvgqS2geUn198TDH.jpg',
        movieID: 3
    },
    {
        title: 'The Rocky Horror Picture Show',
        year: '1975',
        rated: 'R',
        released: 'September 29, 1975',
        runtime: '1h 40min',  
        genre: 'Sci-Fi, Comedy, Horror, Music',
        director: 'Jim Sharman',
        writer: 'Richard O\'Brian',
        actors: 'Tim Curry, Susan Sarandon, Barry Bostwick, Patricia Quinn',
        plot: 'Sweethearts Brad and Janet, stuck with a flat tire during a storm, discover the eerie mansion of Dr. Frank-N-Furter, a transvestite scientist. As their innocence is lost, Brad and Janet meet a houseful of wild characters, including a rocking biker and a creepy butler. Through elaborate dances and rock songs, Frank-N-Furter unveils his latest creation: a muscular man named "Rocky".',
        country: 'England',
        img: 'https://image.tmdb.org/t/p/w154/tynZCZFHE8jNUnCpTnUMUESVgcV.jpg',
        movieID: 4
    } ,
    {
        title: 'Jaws',
        year: '1975',
        rated: 'PG',
        released: 'June 20, 1975',
        runtime: '2h 4min',  
        genre: 'Adventure, Horror, Thriller',
        director: 'Steven Spielberg',
        writer: 'Peter Benchley, Carl Gottlieb',
        actors: 'Roy Schieder, Robert Shaw, Richard Dreyfuss',
        plot: 'An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.',
        country: 'USA',
        img: 'https://image.tmdb.org/t/p/w154/9xmPekteK5ryf9QOZvuSfqa7WKB.jpg',
        movieID: 5
    },
    {
        title: 'Arrival',
        year: '2016',
        rated: 'PG',
        released: 'September 2, 2016',
        runtime: '1h 56min',  
        genre: 'Sci-fi, Drama, Thriller',
        director: 'Denis Villeneuve',
        writer: 'Eric Heisserer',
        actors: 'Amy Adams, Jeremy Renner, Forest Whitaker, Michael Stuhlbarg',
        plot: 'Taking place after alien crafts land around the world, an expert linguist is recruited by the military to determine whether they come in peace or are a threat.',
        country: 'USA',
        img: 'https://image.tmdb.org/t/p/w154/fzA3eT3wFmmB0I4HxTWFTW0rSrZ.jpg',
        movieID: 6
    },
    {
        title: 'Black Panther',
        year: '2018',
        rated: 'PG',
        released: 'January 29, 2018',
        runtime: '2h 14min',  
        genre: 'Sci-fi, Action, Adventure',
        director: 'Ryan coogler',
        writer: 'Joe Robert Cole',
        actors: 'Chadwick Boseman, Michael B. Jordan, Lupita Nyong\'o, Danai Gurira, Martin Freeman',
        plot: 'King T\'Challa returns home from America to the reclusive, technologically advanced African nation of Wakanda to serve as his country\'s new leader. However, T\'Challa soon finds that he is challenged for the throne by factions within his own country as well as without. Using powers reserved to Wakandan kings, T\'Challa assumes the Black Panther mantel to join with girlfriend Nakia, the queen-mother, his princess-kid sister, members of the Dora Milaje (the Wakandan "special forces"), and an American secret agent, to prevent Wakanda from being dragged into a world war.',
        country: 'USA',
        img: 'https://image.tmdb.org/t/p/w154/oVPh8jas8hcJd2LhiZ5zrr8gBs0.jpg',        
        movieID: 7
    },
    {
        title: 'Star Wars: The Last Jedi',
        year: '2017',
        rated: 'PG',
        released: 'December 9, 2017',
        runtime: '2h 32min',  
        genre: 'Sci-fi, Fantasy, Adventure',
        director: 'Rian Johnson',
        writer: 'George Lucas',
        actors: 'Daisy Ridley, John Boyega, Adam Driver, Carrie Fisher, Mark Hamill',
        plot: 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
        country: 'USA',
        img: 'https://image.tmdb.org/t/p/w154/pqQr6zPRoE6bm4e5dZQ0yLrZFVb.jpg',
        movieID: 8
    },
    {
        title: 'The Shape of Water',
        year: '2017',
        rated: 'R',
        released: 'September 2, 2017',
        runtime: '2h 3min',  
        genre: 'Drama, Fantasy, Romance',
        director: 'Guillermo del Toro',
        writer: 'Vanessa Taylor',
        actors: 'Sally Hawkins, Michael Shannon, Richard Jenkins, Octavia Spencer, Michael Stuhlbarg',
        plot: 'An other-worldly story, set against the backdrop of Cold War era America circa 1962, where a mute janitor working at a lab falls in love with an amphibious man being held captive there and devises a plan to help him escape.',
        country: 'USA',
        img: 'https://image.tmdb.org/t/p/w154/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg',
        movieID: 9
    },
    ]} 




app.listen(8080, ()=>{
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});