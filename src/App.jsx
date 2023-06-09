import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://staging.ina17.com/data.json");
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = (role, displayName) => {
    let filtered = data;

    if (role) {
      filtered = filtered.filter((item) => item.role === role);
    }

    if (displayName) {
      filtered = filtered.filter((item) =>
        item.displayName.toLowerCase().includes(displayName.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  console.log(data, "data");
  console.log(filteredData, "data filter");
  return (
    <>
      {" "}
      <div>
        <h1>Website dengan React.js</h1>

        <div>
          <h2>Filter</h2>
          <input
            type="text"
            placeholder="Cari berdasarkan nama"
            onChange={(e) => filterData(null, e.target.value)}
          />

          <select onChange={(e) => filterData(e.target.value, null)}>
            <option value="">Semua Kategori</option>
            <option value="Duelist">Duelist</option>
            <option value="Initiator">Initiator</option>
            <option value="Controller">Controller</option>
            <option value="Sentinel">Sentinel</option>
          </select>
        </div>

        <div>
          <h2>Jumlah Kategori yang Sama: {filteredData.length}</h2>
        </div>

        <div>
          <h2>List Item</h2>
          {filteredData.map((item) => (
            <div key={item.id} onClick={() => handleItemClick(item)}>
              <img src={item.thumbnail} alt={item.displayName} />
              {item.displayName}
            </div>
          ))}
        </div>

        {selectedItem && (
          <div>
            <h2>Modal Detail</h2>
            <div>
              <img
                src={selectedItem.thumbnail}
                alt={selectedItem.displayName}
              />
              <p>Nama: {selectedItem.displayName}</p>
              <p>Role: {selectedItem.role}</p>
              <p>Deskripsi: {selectedItem.description}</p>
              {selectedItem.video && (
                <iframe
                  width="560"
                  height="315"
                  src={selectedItem.video}
                  title="Video Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              )}
            </div>
            <button onClick={closeModal}>Tutup</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
