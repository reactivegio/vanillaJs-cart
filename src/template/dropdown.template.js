import "../scss/dropdown.scss";

export const DropdownTemplate = (id, masterContent) => `
    <div class="dropDown-wrapper">
        <input type="checkbox" id="dropDown-toggle"/>
        <label for="dropDown-toggle" class="dropDown-toggle-label">${masterContent} </label>
        <div id="${id}" class="dropDown">
        </div>
    </div>
`;
