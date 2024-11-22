import React from "react";
import PropTypes from "prop-types";
import "../styles/styles.css";

const AvailableMoversList = ({ movers, handleRequestRide }) => {
  return (
    <section className="available-movers-section">
      <h3>Available Movers</h3>
      {movers.length > 0 ? (
        <div className="horizontal-movers-container">
          {movers.map((mover) => (
            <div key={mover._id} className="horizontal-mover-card">
              <img
                src={mover.vehicle_image || "/images/3.jpg" }
                alt={mover.name}
                className="mover-image"
              />
              <div className="mover-details">
                <h4 className="mover-name">{mover.name}</h4>
                <p className="mover-description">
                  {mover.description || "Reliable moving services"}
                </p>
              </div>
              <div className="mover-price-actions">
                <p className="mover-price">${mover.price.toFixed(2)}</p>
                <button
                  onClick={() => handleRequestRide(mover)}
                  className="buy-now-btn"
                >
                  Request Ride
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-movers-message">No movers available for the selected date and location.</p>
      )}
    </section>
  );
};

AvailableMoversList.propTypes = {
  movers: PropTypes.array.isRequired,
  handleRequestRide: PropTypes.func.isRequired,
};

export default AvailableMoversList;
