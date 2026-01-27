import OrderCard from "../OrderCard";

export default function CompletedOrders() {
  return (
    <div style={{ padding: "30px", background: "#fff" }}>
      <OrderCard
        productName="Basketball Jersey"
        status="Completed"
        statusMessage="Order delivered"
      />
    </div>
  );
}
