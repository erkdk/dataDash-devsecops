import React, { useState } from 'react';
import './index.css';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleItemSaved = () => {
    setRefresh(!refresh); // Toggle refresh to trigger item reload
    setItemToEdit(null); // Clear edit form
  };

  return (
    <div className="App">
      <header className="p-1 mb-2">
        <h1>DataDash</h1>
      </header>
      
      <main className="container">
        <section className="card">
          <ItemForm 
            itemToEdit={itemToEdit} 
            onItemSaved={handleItemSaved} 
          />
        </section>
        
        <section className="card">
          <ItemList 
            onEdit={setItemToEdit} 
            refresh={refresh}
          />
        </section>
      </main>
      
      <footer className="text-center p-1 mt-auto">
        <p>© {new Date().getFullYear()} DataDash</p>
      </footer>
    </div>
  );
}

export default App;