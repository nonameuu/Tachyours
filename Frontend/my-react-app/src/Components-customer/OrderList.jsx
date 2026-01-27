import React, { useEffect, useRef, useState } from "react";

import AllOrders from "./orders/AllOrders";
import ToConfirmOrders from "./orders/ToConfirmOrders";
import ToPayOrders from "./orders/ToPayOrders";
import CompletedOrders from "./orders/CompletedOrders";
import ReleasedOrders from "./orders/ReleasedOrders";
import InProgressOrders from "./orders/InProgressOrders";
import CancelOrders from "./orders/CancelOrders";

const TAB_INDEX = {
  All: 0,
  "To Confirm": 1,
  "To Pay": 2,
  "In Progress": 3,
  Released: 4,
  Completed: 5,
  Cancel: 6,
};

export default function OrderList({ activeTab }) {
  const [direction, setDirection] = useState("right");
  const prevTab = useRef(activeTab);

  useEffect(() => {
    if (TAB_INDEX[activeTab] > TAB_INDEX[prevTab.current]) {
      setDirection("right");
    } else {
      setDirection("left");
    }
    prevTab.current = activeTab;
  }, [activeTab]);

  const renderOrders = () => {
    switch (activeTab) {
      case "All":
        return <AllOrders />;
      case "To Confirm":
        return <ToConfirmOrders />;
      case "To Pay":
        return <ToPayOrders />;
      case "In Progress":
        return <InProgressOrders />;
      case "Released":
        return <ReleasedOrders />;
      case "Completed":
        return <CompletedOrders />;
      case "Cancel":
        return <CancelOrders />;
      default:
        return null;
    }
  };

  return (
    <div className="order-content-wrapper">
      <div key={activeTab} className={`slide ${direction}`}>
        {renderOrders()}
      </div>

      {/* ================= CSS ================= */}
      <style>{`
        .order-content-wrapper {
          position: relative;
          overflow: hidden;
          min-height: 300px;
        }

        .slide {
          animation: slideIn 0.35s ease-out both;
        }

        .slide.right {
          animation-name: slideFromRight;
        }

        .slide.left {
          animation-name: slideFromLeft;
        }

        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
