import OrderSummaryStyle from './order-summary.module.css';

export default function OrderSummary({ order }) {
  return (
    <article className={OrderSummaryStyle['order__summary-box']}>
      {order.number}
      {order.name}
    </article>
  );
}
