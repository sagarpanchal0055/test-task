import React from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

const EstimateItemRow = ({
  item,
  index,
  itemIndex,
  handleInputChange,
  errors,
  addRow,
  removeRow,
  t
}) => {
  const totalPrice = item.quantity && item.price
    ? parseInt(item.quantity) * parseInt(item.price) 
    : 0 + (item.margin && item.quantity && item.price
      ? (totalPrice * parseInt(item.margin)) / 100 
      : 0
    );

  return (
    <div style={{ display: 'flex', padding: '16px', gap: '8px' }}>
      <div>
        <input
          type="text"
          value={item.itemName}
          placeholder={t('ITEM_NAME')}
          className="input-field"
          onChange={(e) => handleInputChange(index, itemIndex, 'itemName', e.target.value)}
        />
        {errors.find((error) => error.sectionIndex === index)?.itemErrors[itemIndex]?.itemName && (
          <p className="error">{errors.find((error) => error.sectionIndex === index)?.itemErrors[itemIndex]?.itemName}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          value={item.description}
          placeholder={t('ITEM_DESCRIPTION')}
          className="input-field"
          onChange={(e) => handleInputChange(index, itemIndex, 'description', e.target.value)}
        />
        {errors.find((error) => error.sectionIndex === index)?.itemErrors[itemIndex]?.description && (
          <p className="error">{errors.find((error) => error.sectionIndex === index)?.itemErrors[itemIndex]?.description}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          value={item.unit}
          placeholder={t('UNIT')}
          className="input-field"
          onChange={(e) => handleInputChange(index, itemIndex, 'unit', e.target.value)}
        />
        {errors.find((error) => error.sectionIndex === index)?.itemErrors[itemIndex]?.unit && (
          <p className="error">{errors.find((error) => error.sectionIndex === index)?.itemErrors[itemIndex]?.unit}</p>
        )}
      </div>
      <div>
        <input
          type="number"
          value={item.quantity}
          placeholder={t('QUANTITY')}
          className="input-field"
          onChange={(e) => handleInputChange(index, itemIndex, 'quantity', e.target.value)}
        />
        {errors.find((error) => error.sectionIndex === index)?.itemErrors[itemIndex]?.quantity && (
          <p className="error">{errors.find((error) => error.sectionIndex === index)?.itemErrors[itemIndex]?.quantity}</p>
        )}
      </div>
      <div>
        <input
          type="number"
          value={item.price}
          placeholder={t('PRICE')}
          className="input-field"
          onChange={(e) => handleInputChange(index, itemIndex, 'price', e.target.value)}
        />
        {errors.find((error) => error.sectionIndex === index)?.itemErrors[itemIndex]?.price && (
          <p className="error">{errors.find((error) => error.sectionIndex === index)?.itemErrors[itemIndex]?.price}</p>
        )}
      </div>
      <div>
        <input
          type="number"
          value={item.margin}
          placeholder={t('MARGIN')}
          className="input-field"
          onChange={(e) => handleInputChange(index, itemIndex, 'margin', e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          value={totalPrice}
          placeholder={t('TOTAL')}
          className="input-field"
          readOnly
        />
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <AddCircleRoundedIcon sx={{ cursor: "pointer" }} onClick={() => addRow(index)} />
        <RemoveCircleRoundedIcon style={{ color: 'grey', cursor: "pointer", visibility: itemIndex === 0 ? "hidden" : "visible" }} onClick={() => removeRow(index, itemIndex)} />
      </div>
    </div>
  );
};

export default EstimateItemRow;
