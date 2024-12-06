import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Header from "../components/Header";
import { jsPDF } from "jspdf";
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
    doc.setFontSize(16);
    doc.text("MoveMate - Payment Receipt", 20, 20);
    doc.setFontSize(12);
    doc.text(`Pickup Location: ${paymentData.pickup}`, 20, 40);
    doc.text(`Dropoff Location: ${paymentData.dropoff}`, 20, 50);
    doc.text(`Distance: ${paymentData.distance.toFixed(2)} km`, 20, 60);
    doc.text(`Base Price: $${calculatedPrice.basePrice}`, 20, 70);
    doc.text(`Tax (13%): $${calculatedPrice.tax}`, 20, 80);
    doc.text(`Total Price: $${calculatedPrice.total}`, 20, 90);
    doc.text(`Billing Address:`, 20, 110);
    doc.text(
      `${billingAddress.firstName} ${billingAddress.lastName}, ${billingAddress.address}, ${billingAddress.city}, ${billingAddress.province}, ${billingAddress.postalCode}`,
      20,
      120
    );
    doc.text(`Shipping Address:`, 20, 140);
    doc.text(
      `${shippingAddress.firstName} ${shippingAddress.lastName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.postalCode}`,
      20,
      150
    );
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
        <h2>Complete Payment</h2>
        <div className="payment-container">
          <div className="address-container">
            <div className="billing-address">
              <h3>Billing Address</h3>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={billingAddress.firstName}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={billingAddress.lastName}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={billingAddress.email}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={billingAddress.phone}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={billingAddress.address}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <select
                name="province"
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
                placeholder="Postal Code"
                value={billingAddress.postalCode}
                onChange={(e) => handleAddressChange(e, "billing")}
              />
              <div className="same-address-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={handleSameAsBillingToggle}
                  />
                  Shipping address is the same as billing address
                </label>
              </div>
            </div>
            <div className="shipping-address">
              <h3>Shipping Address</h3>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={shippingAddress.firstName}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={shippingAddress.lastName}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={shippingAddress.email}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={shippingAddress.phone}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingAddress.address}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
              <select
                name="province"
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
                placeholder="Postal Code"
                value={shippingAddress.postalCode}
                onChange={(e) => handleAddressChange(e, "shipping")}
                disabled={sameAsBilling}
              />
            </div>
          </div>
          <div className="order-details">
            <h3>Order Details</h3>
            <p>
              <strong>Pickup Location:</strong> {paymentData.pickup}
            </p>
            <p>
              <strong>Dropoff Location:</strong> {paymentData.dropoff}
            </p>
            <p>
              <strong>Distance:</strong> {paymentData.distance.toFixed(2)} km
            </p>
            <p>
              <strong>Base Price:</strong> ${calculatedPrice.basePrice}
            </p>
            <p>
              <strong>Tax (13%):</strong> ${calculatedPrice.tax}
            </p>
            <p>
              <strong>Total:</strong> ${calculatedPrice.total}
            </p>
          </div>
        </div>
        {isPaymentCompleted && (
          <>
            <button onClick={downloadPDF} className="download-pdf-btn">
              Download Receipt
            </button>
            <button
              className="continue-moving-btn"
              onClick={() => navigate("/user")}
            >
              Continue Moving
            </button>
          </>
        )}
        <PayPalScriptProvider
          options={{
            "client-id":
              "AbgaAkmgJQttnf7-i6aJmEna8fELa8LuI9ieySIr1T5H8G61812V_mdC8MS5nM4NTYgALkqlS5_C7Gdo",
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
          className="cancel-payment-btn"
          onClick={() => navigate("/user")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
