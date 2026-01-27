import OrderCard from "../OrderCard";

export default function ToConfirmOrders() {
  return (
    <div style={{ padding: "30px", background: "#fff" }}>
      <OrderCard
        productName="Shoes"
        status="To Confirm"
        statusMessage="Waiting for confirmation"
      />
    </div>
  );
}
