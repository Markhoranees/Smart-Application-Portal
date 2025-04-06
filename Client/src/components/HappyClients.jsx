import React, { useState } from "react";
import "../assets/styles/HappyClients.css";

// Import images
import profile1 from "../assets/image/profile1.png";
import profile2 from "../assets/image/profile2.png";
import profile3 from "../assets/image/profile3.png";

const clients = [
  { name: "Roger Scott", position: "SYSTEM ANALYST", image: profile1, review: "Lorem ipsum dolor sit amet." },
  { name: "Sarah Smith", position: "MARKETING MANAGER", image: profile3, review: "Consectetur adipiscing elit." },
  { name: "John Doe", position: "INTERFACE DESIGNER", image: profile2, review: "Sed do eiusmod tempor incididunt ut labore." },
  { name: "Michael Brown", position: "PROJECT MANAGER", image: profile3, review: "Ut enim ad minim veniam." },
  { name: "Emily Davis", position: "UI/UX DESIGNER", image: profile1, review: "Quis nostrud exercitation ullamco laboris." },
  { name: "David Wilson", position: "SOFTWARE ENGINEER", image: profile2, review: "Duis aute irure dolor in reprehenderit." },
];

const itemsPerPage = 3; // Show 3 clients at a time

const HappyClients = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const displayedClients = clients.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="happy-clients">
      <h3>Testimonial</h3>
      <h2>
        Happy <strong>Clients</strong>
      </h2>

      <div className="clients-container">
        {displayedClients.map((client, index) => (
          <div key={index} className="client-card">
            <div className="client-image">
              <img src={client.image} alt={client.name} />
            </div>
            <p>“{client.review}”</p>
            <h5>{client.name}</h5>
            <span>{client.position}</span>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <div
            key={index}
            className={`pagination-dot ${index === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(index)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HappyClients;
