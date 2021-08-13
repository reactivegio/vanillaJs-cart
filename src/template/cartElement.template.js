export const CartElementTemplate = (props) => `<tr id="cart-item_${
  props.id
}" class="cart-item">
    <td>
      <span class="title">${props.nameTranslate}</span>
    </td>
    <td>
      <div class="price">${props.currency}${props.price}</div>
    </td>
    <td>
      <div class="quantity">
        <div class="qty-handler" data-id=${props.id}>
          <div class="addBtn">+</div>
          <div class="quantity-value">${props.count}</div>
          <div class="removeBtn">-</div>
        </div>
      </div>
    </td>
    <td>
      <div class="total">${props.currency}${
  Math.round(props.price * props.count * 100) / 100
}</div>
    </td>
  </tr>`;
