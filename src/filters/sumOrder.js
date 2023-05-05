export default function (order, qty, favour) {
  let accessories = 0;
  let sketch = 100;
  if (order.accessories) {
    accessories = 250;
  }
  if (order.sketch) {
    sketch = 250;
  }
  return (favour.price + accessories + sketch) * qty * order.size;
}
