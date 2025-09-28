import React, { useState, useEffect } from "react";
import { getItems, deleteItem } from "../api";

const ItemList = ({ onEdit, refresh }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [refresh]);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to load items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
        setError("Failed to delete item.");
      }
    }
  };

  return (
    <div>
      <h2 className="mb-2">Items List</h2>

      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message mb-2">{error}</div>}

      {items.length === 0 && !loading ? (
        <p className="text-center p-2">
          No items found. Add some to get started!
        </p>
      ) : (
        <div className="list-container">
          {items.map((item) => (
            <div key={item._id} className="list-item">
              <div className="item-content">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => onEdit(item)} className="btn-edit">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
