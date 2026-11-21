import './App.css'
import FormularioPlanta from './components/FormularioPlanta.jsx'
import ListaPlantas from './components/ListaPlantas.jsx'

export default function App() {
    return (
        <>
            <header>
                <h1>Brote</h1>
                <p>Tu registro de plantas</p>
            </header>
            <main>
                <FormularioPlanta />
                <ListaPlantas />
            </main>
        </>
    )
}
