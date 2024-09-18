const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const calculateTotals = (sections) => {
  let subTotal = 0, totalMargin = 0, totalAmount = 0;

  sections.forEach((section) => {
    section.items.forEach((item) => {
      let margin = 0;
      let totalPrice = item.quantity && item.price ? item.quantity * item.price : 0;
      if (item.margin && item.quantity && item.price) {
        margin = (totalPrice * item.margin) / 100;
      }
      subTotal += totalPrice;
      totalMargin += margin;
      totalAmount += totalPrice + margin;
    });
  });

  return { subTotal, totalMargin, totalAmount };
};

const validateSections = (sections) => {
  const errors = [];

  sections.forEach((section, sectionIndex) => {
    const sectionErrors = {};
    if (!section.sectionName.trim()) {
      sectionErrors.sectionName = 'Section name is required';
    }

    const itemErrors = section.items.map((item) => {
      const errors = {};
      if (!item.itemName.trim()) errors.itemName = 'Item name is required';
      if (!item.description.trim()) errors.description = 'Description is required';
      if (!item.unit.trim()) errors.unit = 'Unit is required';
      if (item.quantity < 1 || isNaN(item.quantity)) errors.quantity = 'Quantity must be valid';
      if (item.price < 1 || isNaN(item.price)) errors.price = 'Price must be valid';
      return errors;
    });

    if (Object.keys(sectionErrors).length > 0 || itemErrors.some(e => Object.keys(e).length > 0)) {
      errors.push({ sectionIndex, sectionErrors, itemErrors });
    }
  });

  return errors;
};

export {
  validateEmail,
  calculateTotals,
  validateSections
}