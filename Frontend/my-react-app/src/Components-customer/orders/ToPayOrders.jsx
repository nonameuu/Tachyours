import OrderCard from "../OrderCard";

export default function ToPayOrders() {
  return (
    <div style={{ padding: "30px", background: "#fff" }}>
      <OrderCard
        productName="Cap"
        status="To Pay"
        statusMessage="Waiting for payment"
      />
    </div>
  );
}
