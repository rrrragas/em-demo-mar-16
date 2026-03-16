export default function decorate(block) {
  const form = document.createElement('form');

  [...block.children].forEach((row) => {
    const text = row.textContent.trim();

    // Submit button row
    if (/^submit$/i.test(text)) {
      const wrapper = document.createElement('div');
      wrapper.className = 'form-submit';
      const button = document.createElement('button');
      button.type = 'submit';
      button.className = 'button primary';
      button.textContent = text;
      wrapper.append(button);
      form.append(wrapper);
      return;
    }

    // Parse field definition: "Label (type: name)"
    const match = text.match(/^(.+?)\s*\((\w+):\s*(\w+)\)$/);
    if (!match) return;

    const [, label, type, name] = match;
    const fieldGroup = document.createElement('div');
    fieldGroup.className = `form-field form-field-${type}`;

    if (type === 'checkbox') {
      const checkLabel = document.createElement('label');
      checkLabel.className = 'form-checkbox';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.name = name;
      input.id = name;
      checkLabel.append(input);
      const span = document.createElement('span');
      span.textContent = label;
      checkLabel.append(span);
      fieldGroup.append(checkLabel);
    } else if (type === 'textarea') {
      const labelEl = document.createElement('label');
      labelEl.htmlFor = name;
      labelEl.textContent = label;
      fieldGroup.append(labelEl);
      const textarea = document.createElement('textarea');
      textarea.name = name;
      textarea.id = name;
      textarea.placeholder = label;
      textarea.rows = 3;
      fieldGroup.append(textarea);
    } else {
      const labelEl = document.createElement('label');
      labelEl.htmlFor = name;
      labelEl.textContent = label;
      fieldGroup.append(labelEl);
      const input = document.createElement('input');
      input.type = type;
      input.name = name;
      input.id = name;
      input.placeholder = label;
      fieldGroup.append(input);
    }

    form.append(fieldGroup);
  });

  block.replaceChildren(form);
}
