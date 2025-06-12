import React, { useState, useEffect } from "react";
import { createItem, updateItem } from "../api";

const ItemForm = ({ itemToEdit, onItemSaved }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize form when itemToEdit changes
  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name || "",
        description: itemToEdit.description || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (itemToEdit) {
        await updateItem(itemToEdit._id, formData);
      } else {
        await createItem(formData);
      }
      onItemSaved();
      if (!itemToEdit) {
        setFormData({ name: "", description: "" });
      }
    } catch (error) {
      console.error("Error saving item:", error);
      setError(
        error.response?.data?.message ||
          "Failed to save item. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 className="mb-2">{itemToEdit ? "Edit Item" : "Add New Item"}</h2>

      {error && <div className="error-message mb-2">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Enter item name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
            placeholder="Enter description (optional)"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Saving...
              </>
            ) : (
              "Save Item"
            )}
          </button>

          {itemToEdit && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setFormData({
                  name: itemToEdit.name || "",
                  description: itemToEdit.description || "",
                });
                setError(null);
              }}
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
