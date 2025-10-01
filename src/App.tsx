// Interfacce TypeScript per definire la struttura dei dati
interface Recipe {
  id: number;
  userId: number;
  name: string;
  // altre proprietà della ricetta...
}

interface Chef {
  id: number;
  birthDate: string;
  firstName: string;
  lastName: string;
  // altre proprietà dello chef...
}

function App() {
  /*
   * In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
   * Questa funzione accetta un id di una ricetta e deve:
   * - Recuperare la ricetta da https://dummyjson.com/recipes/{id}
   * - Estrarre la proprietà userId dalla ricetta
   * - Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
   * - Restituire la data di nascita dello chef
   */

  async function getChefBirthday(id: number): Promise<string> {
    try {
      const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);            // Recupera la ricetta
      if (!recipeResponse.ok) {                                                             // Controlla se la risposta è ok
        throw new Error('Errore nel recupero della ricetta');                               // Lancia un errore se la risposta non è ok
      }
      
      const recipe: Recipe = await recipeResponse.json();                                   // Converte la risposta in JSON
      
      const userId = recipe.userId;                                                         // Estrai userId dalla ricetta

      const chefResponse = await fetch(`https://dummyjson.com/users/${userId}`);            // Recupera le informazioni dello chef
      
      if (!chefResponse.ok) {                                                              // Controlla se la risposta è ok
        throw new Error('Errore nel recupero delle informazioni dello chef');              // Lancia un errore se la risposta non è ok
      }
      
      const chef: Chef = await chefResponse.json();                                        // Converte la risposta in JSON
    
      return chef.birthDate;                                                        // Restituisce la data di nascita dello chef
    } catch (error) {
      console.error('Errore durante il recupero della data di nascita:', error);
      throw error; 
    }    
  };

  const handleGetChefBirthday = async () => {                                             // Funzione per gestire il click del bottone
    try {
      const birthday = await getChefBirthday(1);                                          // Chiama la funzione con un id di esempio
      console.log(`La data di nascita dello chef è: ${birthday}`);                        // Stampa la data di nascita
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  return (
    <>
      <h1>Esercizio in TypeScript</h1>
      <button onClick={handleGetChefBirthday}>
        Ottieni data di nascita dello chef
      </button>
    </>
  );
}

export default App;
