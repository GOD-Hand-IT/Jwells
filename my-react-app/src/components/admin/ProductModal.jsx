import React, { useState, useRef, useEffect } from 'react';

const ProductModal = ({ isOpen, onClose, onSave, product, title, categories = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    imageFile: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const categoryInputRef = useRef(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        category: product.category || '',
        description: product.description || '',
        image: product.image || '',
        imageFile: null
      });
      setPreviewImage(product.image || null);
      setNewCategory(product.category || '');
    } else {
      setFormData({
        name: '',
        price: '',
        category: '',
        description: '',
        image: '',
        imageFile: null
      });
      setPreviewImage(null);
      setNewCategory('');
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = URL.createObjectURL(file);
        setPreviewImage(image);
        setFormData({
          ...formData,
          imageFile: file,
          image: image
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryInput = (value) => {
    setNewCategory(value);
    const filtered = categories.filter(cat =>
      cat.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
    setShowSuggestions(true);
  };

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category });
    setNewCategory(category);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: product?.id,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white/80 backdrop-blur-md">
        <div className="mt-3">
          <h3 className="text-xl font-medium text-gray-900 mb-4">{title}</h3>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-gray-800"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-gray-800"
                    required
                  />
                </div>
                <div className="mb-4" ref={categoryInputRef}>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => handleCategoryInput(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Type to search or add new category"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-gray-800"
                    required
                    list="categories"
                  />
                  <datalist id="categories">
                    {categories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                  {showSuggestions && (
                    <div className="absolute z-10 w-64 mt-1 bg-black border border-gray-700 rounded-md shadow-lg">
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                          <div
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                            className="px-4 py-2 text-white hover:bg-gray-800 cursor-pointer"
                          >
                            {category}
                          </div>
                        ))
                      ) : (
                        <div
                          onClick={() => handleCategorySelect(newCategory)}
                          className="px-4 py-2 text-green-400 hover:bg-gray-800 cursor-pointer"
                        >
                          + Add "{newCategory}" as new category
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Product Image
                  </label>
                  <div className="border rounded-md p-2 bg-gray-50">
                    <img
                      src={previewImage || formData.image || 'placeholder-image-url'}
                      alt="Product"
                      className="w-full h-48 object-contain rounded-md mb-2"
                    />
                    <label className="flex items-center justify-center w-full">
                      <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors">
                        {previewImage ? 'Change Image' : 'Choose Image'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </span>
                    </label>
                    {previewImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData({
                            ...formData,
                            imageFile: null,
                            image: null
                          });
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove image
                      </button>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-gray-800"
                    rows="4"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {product ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
