import "../scss/Cart.scss";

export const CartTemplate = (
  productString,
  priceString,
  quantityString,
  totalString
) => `<table class="cart-list">
<thead>
  <tr>
    <th class="head-title">${productString}</th> <th class="head-price">${priceString}</th>
    <th class="head-quantity">${quantityString}</th> <th class="head-total">${totalString}</th>
  </tr>
</thead>
<tbody>

</tbody>
<tfoot>
  <tr>
    <th colspan="3">
      <div class="total-title">${totalString}</div>
    </th>
    <th id="big-total">€0</th>
  </tr>
  </tfoot>
</table>`;
