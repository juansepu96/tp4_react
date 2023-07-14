import { React } from "react";
import ReactDOM from 'react-dom/client';
import { Container, Row, Col, Form } from "react-bootstrap";
import MovieDetail from "./MovieDetail";
import getData from "../../api/home/get_data";

const MoviesList = () => {
    const peliculas = [
        { id: 1, titulo: 'Back to the Future', genero: "scifi" ,img:'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg' },
        { id: 2, titulo: 'Top Gun', genero: "accion" ,img:'https://m.media-amazon.com/images/M/MV5BZjQxYTA3ODItNzgxMy00N2Y2LWJlZGMtMTRlM2JkZjI1ZDhhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg'},
        { id: 3, titulo: 'Star Wars', genero: "scifi",img:'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg' },
        { id: 4, titulo: 'Revenge of the Nerds', genero: "comedia",img:'https://m.media-amazon.com/images/M/MV5BODU1NzM4NTA4Nl5BMl5BanBnXkFtZTgwMTkxMzcxMTE@._V1_SX300.jpg' },
        { id: 5, titulo: 'Police Academy', genero: "comedia",img:'https://m.media-amazon.com/images/M/MV5BMjNiMWVhNjAtMzgyYS00NzRhLWJmNGUtNzdiOGFhMmY5NDUwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg' },
        { id: 6, titulo: 'Avatar', genero: "scifi",img:'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg'}
    ];
    let randMovie = Math.floor(Math.random() * peliculas.length);
    let movieData = peliculas[randMovie];
    const fetchData = async (titulo='') => {
        try {
            titulo === '' ? movieData = await getData(peliculas[randMovie].titulo) : movieData = await getData(titulo);
            movieData = {
                id : movieData.imdbID,
                titulo : movieData.Title,
                genero : movieData.Genre,
                img : movieData.Poster
            }
            const movieDetail = ReactDOM.createRoot(document.getElementById('detail'));
            movieDetail.render(
                <MovieDetail props={movieData}/>
            );
            document.getElementById('selectedOption').val(movieData.titulo);
        } catch (err) {
            console.log(err);
        }
    };

    const onChangeHandler = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const selected =  el.getAttribute('value');  
        fetchData(selected);
    }      
    fetchData();
    return (
        <div>
            <Container>
                <Row>
                    <Col className="p-5">
                        <Form.Label>Seleccione una película del listado.</Form.Label>
                        <Form.Select aria-label="Movies Selector" id="selectedOption" defaultValue={randMovie} onChange={onChangeHandler}>
                            {peliculas.map((element, index) => (
                                <option key={index} value={element.titulo}>
                                    {element.titulo.toUpperCase()}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <div id="detail"></div>
                </Row>
            </Container>
        </div>
    );
};

export default MoviesList;


