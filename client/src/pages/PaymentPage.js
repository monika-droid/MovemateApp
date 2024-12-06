import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Header from "../components/Header";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/PaymentPage.css";
import { State, City } from "country-state-city";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState({
    basePrice: 0,
    tax: 0,
    total: 0,
  });
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    province: "",
    city: "",
    postalCode: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    province: "",
    city: "",
    postalCode: "",
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("paymentData");
    if (data) {
      const parsedData = JSON.parse(data);
      setPaymentData(parsedData);
      const basePrice = parseFloat(parsedData.price);
      const tax = parseFloat((basePrice * 0.13).toFixed(2));
      const total = parseFloat((basePrice + tax).toFixed(2));
      setCalculatedPrice({ basePrice, tax, total });
    } else {
      alert("Payment details are missing.");
      navigate("/approved-rides");
    }
  }, [navigate]);

  const handleAddressChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "billing") {
      setBillingAddress((prev) => ({ ...prev, [name]: value }));
      if (sameAsBilling) {
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setShippingAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSameAsBillingToggle = () => {
    setSameAsBilling((prev) => !prev);
    if (!sameAsBilling) {
      setShippingAddress({ ...billingAddress });
    }
  };

  const handlePaymentSuccess = () => {
    alert("Payment was successful!");
    setIsPaymentCompleted(true);
  };

  const handlePaymentError = () => {
    alert("Payment failed. Please try again.");
  };

  const downloadPDF = () => {
    if (!paymentData) return;
    const doc = new jsPDF();
    doc.setFont("times");
    doc.setFontSize(20);
    doc.text("MoveMate", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("299 Doon Valley Dr, Kitchener, ON N2G 4M4", 105, 30, { align: "center" });

    doc.setFontSize(14);
    doc.text(`Order ID: ${paymentData.ride._id}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 50);

    doc.setFontSize(12);
    doc.text("Billing Address | Shipping Address", 20, 70);
    doc.text(
      `${billingAddress.firstName} ${billingAddress.lastName} | ${shippingAddress.firstName} ${shippingAddress.lastName}`,
      20,
      80
    );
    doc.text(
      `${billingAddress.address}, ${billingAddress.city}, ${billingAddress.province}, ${billingAddress.postalCode} | ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.postalCode}`,
      20,
      90
    );

    autoTable(doc, {
      startY: 100,
      head: [["Pickup Location", "Dropoff Location", "Distance (km)", "Price"]],
      body: [
        [
          paymentData.pickup,
          paymentData.dropoff,
          paymentData.distance.toFixed(2),
          `$${calculatedPrice.basePrice}`,
        ],
      ],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      body: [
        ["Tax (13%)", `$${calculatedPrice.tax}`],
        ["Total Price", `$${calculatedPrice.total}`],
      ],
    });

    doc.save(`Receipt_${paymentData.ride._id}.pdf`);
  };

  const provinces = State.getStatesOfCountry("CA");
  const cities = billingAddress.province
    ? City.getCitiesOfState("CA", billingAddress.province)
    : [];

  if (!paymentData) {
    return <div>Loading payment details...</div>;
  }

  return (
    <div>
      <Header userType="user" />
      <div className="payment-page-section">
        <h2 className="text-center mb-4" style={{ color: "#00274d", fontWeight: "700", fontSize: "1.8rem" }}>Complete Payment</h2>
        <div className="payment-container d-flex flex-column gap-4">
          <div className="address-container d-flex justify-content-between">
            <div className="billing-address" style={{ flex: "1", marginRight: "20px" }}>
              <h3 style={{ color: "#00274d" }}>Billing Address</h3>
              <input
                type="text"
                name="firstName"
                className="form-control mb-3"
                placeholder="First Name"
                value={billingAddress.firstName}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <input
                type="text"
                name="lastName"
                className="form-control mb-3"
                placeholder="Last Name"
                value={billingAddress.lastName}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <input
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Email"
                value={billingAddress.email}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <input
                type="text"
                name="phone"
                className="form-control mb-3"
                placeholder="Phone"
                value={billingAddress.phone}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <input
                type="text"
                name="address"
                className="form-control mb-3"
                placeholder="Address"
                value={billingAddress.address}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <select
                name="province"
                className="form-select mb-3"
                value={billingAddress.province}
                onChange={(e) => handleAddressChange(e, "billing")}
              >
                <option value="">Select a Province</option>
                {provinces.map((province) => (
                  <option key={province.isoCode} value={province.isoCode}>
                    {province.name}
                  </option>
                ))}
              </select>
              <select
                name="city"
                className="form-select mb-3"
                value={billingAddress.city}
                onChange={(e) => handleAddressChange(e, "billing")}
              >
                <option value="">Select a City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="postalCode"
                className="form-control mb-3"
                placeholder="Postal Code"
                value={billingAddress.postalCode}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={sameAsBilling}
                  onChange={handleSameAsBillingToggle}
                />
                <label className="form-check-label">Shipping address is the same as billing address</label>
              </div>
            </div>
            <div className="shipping-address" style={{ flex: "1", marginLeft: "20px" }}>
              <h3 style={{ color: "#00274d" }}>Shipping Address</h3>
              <input
                type="text"
                name="firstName"
                className="form-control mb-3"
                placeholder="First Name"
                value={shippingAddress.firstName}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
              <input
                type="text"
                name="lastName"
                className="form-control mb-3"
                placeholder="Last Name"
                value={shippingAddress.lastName}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
              <input
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Email"
                value={shippingAddress.email}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
              <input
                type="text"
                name="phone"
                className="form-control mb-3"
                placeholder="Phone"
                value={shippingAddress.phone}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
              <input
                type="text"
                name="address"
                className="form-control mb-3"
                placeholder="Address"
                value={shippingAddress.address}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
              <select
                name="province"
                className="form-select mb-3"
                value={shippingAddress.province}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              >
                <option value="">Select a Province</option>
                {provinces.map((province) => (
                  <option key={province.isoCode} value={province.isoCode}>
                    {province.name}
                  </option>
                ))}
              </select>
              <select
                name="city"
                className="form-select mb-3"
                value={shippingAddress.city}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              >
                <option value="">Select a City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="postalCode"
                className="form-control mb-3"
                placeholder="Postal Code"
                value={shippingAddress.postalCode}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
            </div>
          </div>
          <div className="order-details" style={{ backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "10px" }}>
            <h3 style={{ color: "#00274d" }}>Order Details</h3>
            <p><strong>Pickup Location:</strong> {paymentData.pickup}</p>
            <p><strong>Dropoff Location:</strong> {paymentData.dropoff}</p>
            <p><strong>Distance:</strong> {paymentData.distance.toFixed(2)} km</p>
            <p><strong>Base Price:</strong> ${calculatedPrice.basePrice}</p>
            <p><strong>Tax (13%):</strong> ${calculatedPrice.tax}</p>
            <p><strong>Total:</strong> ${calculatedPrice.total}</p>
          </div>
          {isPaymentCompleted && (
            <div className="mt-4 d-flex justify-content-between">
              <button onClick={downloadPDF} className="btn" style={{ backgroundColor: "#00274d", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Download Receipt</button>
              <button className="btn" onClick={() => navigate("/user")} style={{ backgroundColor: "#00274d", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Continue Moving</button>
            </div>
          )}
          <PayPalScriptProvider
            options={{
              "client-id": "AbgaAkmgJQttnf7-i6aJmEna8fELa8LuI9ieySIr1T5H8G61812V_mdC8MS5nM4NTYgALkqlS5_C7Gdo",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) =>
                actions.order.create({
                  purchase_units: [{ amount: { value: calculatedPrice.total } }],
                })
              }
              onApprove={(data, actions) =>
                actions.order.capture().then(handlePaymentSuccess)
              }
              onError={handlePaymentError}
            />
          </PayPalScriptProvider>
          <button
            className="btn mt-3"
            onClick={() => navigate("/user")}
            style={{ backgroundColor: "#e63946", color: "white", padding: "10px 10px", border: "none", borderRadius: "5px", width: "100%" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;