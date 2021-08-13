export const DropdownElementTemplate = (id, text, content) => `
    <div class="langChanger" data-lang="${id}">
        <input type="radio" id="option-${id}" name="options" />
        <label for="option-${id}">
            ${content}
            <span>${text}</span>
        </label>
    </div>
`;
