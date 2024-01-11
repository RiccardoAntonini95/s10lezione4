import App from "../App"
import Booklist from "../components/BookList";
import fantasy from "../data/fantasy.json"
import { render, screen, fireEvent } from "@testing-library/react";

//Il componente Jumbotron viene correttamente montato
describe("Il componente Jumbotron", () => {
    it("viene correttamente montato", () => {
        render(<App />)

        const jumbotronText = screen.getByText(/Welcome to Epibooks!/i) 
        expect(jumbotronText).toBeInTheDocument()
    })
})

//Vengono renderizzate tante card quanti sono i libri nel Json

describe("Le card renderizzate", () => {
    it("sono lo stesso numero dei libri presenti nel file json", () => {
        render(<App />)
        const allBooks = screen.getAllByTestId("libro")
        const jsonBooks = fantasy

        expect(allBooks.length).toEqual(jsonBooks.length)
    })
})

//Verifica che il componente CommentArea venga renderizzato correttamente

describe("Il componente CommentArea", () => {
    it("viene correttamente renderizzato", () => {
        render(<App />)

        const commentText = screen.getByText("Comment text") 
        expect(commentText).toBeInTheDocument()
    })
})

//verifica che il filtraggio dei libri funzioni come previsto

describe("Comportamento del filtro", () => {
    it("restituire due elementi in base a una ricerca", () => {
        render(<App />);
        const campoInput = screen.getByPlaceholderText(/Search here/i)
        fireEvent.change(campoInput, {target: {value: 'morden'}})
        const elencoFiltrato = screen.getAllByTestId("libro")
        expect(elencoFiltrato).toHaveLength(1);
    })
})

//verifica se al click di un libro cambia il colore del bordo

describe("Il singolo libro", () => {
    it("cambia colore al click", () => {
        render(<App />)
        const imgCard = screen.getAllByTestId("img-card")
        const firstImg = imgCard[0]
        fireEvent.click(firstImg)
        expect(firstImg).toHaveStyle("border: 3px solid red")
    })
})
