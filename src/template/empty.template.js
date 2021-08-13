import "../scss/Cart.scss";

export const EmptyTemplate = () => `
    <div class="empty-contents">
        <div class="draw">
            <div class="cactus">
                <div class="arm"></div>
                <div class="arm"></div>
            </div>
            <div class="cactus">
                <div class="arm"></div>
                <div class="arm"></div>
            </div>
            <div class="cactus">
                <div class="arm"></div>
                <div class="arm"></div>
            </div>
            <div class="sky">
                <div class="montain"></div>
                <div class="montain two"></div>
                <div class="sun"></div>
            </div>
        </div>
        <p class="no-items-text">Your cart is actually empty</p>
    </div>
`;
