import OrderCard from "../OrderCard";

export default function AllOrders() {
  return (
    <div style={styles.wrapper}>
      <OrderCard
        productName="Basketball Jersey"
        status="Completed"
        statusMessage="Order delivered"
      />
      <OrderCard
        productName="Shoes"
        status="To Confirm"
        statusMessage="Waiting for confirmation"
      />
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "30px",
    background: "#fff",
    borderRadius: "16px",
    margin: "20px",
  },
};
